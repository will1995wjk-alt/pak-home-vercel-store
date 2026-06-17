import { NextResponse } from "next/server";
import { appendSurveyRow } from "@/lib/google/sheets";

type SurveyRequestBody = {
  fullName?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  city?: string;
  profession?: string;
  monthlyHouseholdBudget?: string;
  interestedProductCategories?: string[];
  productsInterestedIn?: string;
  preferredPaymentMethod?: string;
  purchaseTimeline?: string;
  notes?: string;
  consent?: boolean;
  sourcePage?: string;
};

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanCategories(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanText(item)).filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SurveyRequestBody;
    const fullName = cleanText(body.fullName);
    const phoneNumber = cleanText(body.phoneNumber);
    const whatsappNumber = cleanText(body.whatsappNumber);
    const city = cleanText(body.city);
    const interestedProductCategories = cleanCategories(body.interestedProductCategories);

    if (!fullName) {
      return NextResponse.json({ success: false, message: "Full Name is required." }, { status: 400 });
    }

    if (!phoneNumber && !whatsappNumber) {
      return NextResponse.json(
        { success: false, message: "Phone Number or WhatsApp Number is required." },
        { status: 400 }
      );
    }

    if (!city) {
      return NextResponse.json({ success: false, message: "City is required." }, { status: 400 });
    }

    if (interestedProductCategories.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one interested product category." },
        { status: 400 }
      );
    }

    await appendSurveyRow({
      submittedAt: new Date().toISOString(),
      fullName,
      phoneNumber,
      whatsappNumber,
      city,
      profession: cleanText(body.profession),
      monthlyHouseholdBudget: cleanText(body.monthlyHouseholdBudget),
      interestedProductCategories,
      productsInterestedIn: cleanText(body.productsInterestedIn),
      preferredPaymentMethod: cleanText(body.preferredPaymentMethod),
      purchaseTimeline: cleanText(body.purchaseTimeline),
      notes: cleanText(body.notes),
      consent: Boolean(body.consent),
      sourcePage: cleanText(body.sourcePage) || "/survey",
      userAgent: request.headers.get("user-agent") || "",
      followUpStatus: "New",
      salesNotes: ""
    });

    return NextResponse.json({
      success: true,
      message: "Survey submitted successfully"
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("Google Sheets is not configured")
        ? error.message
        : "Something went wrong. Please try again or contact us on WhatsApp.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed." }, { status: 405 });
}
