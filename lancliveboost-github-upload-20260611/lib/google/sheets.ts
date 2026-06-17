import { google } from "googleapis";

export const SURVEY_HEADERS = [
  "Submitted At",
  "Full Name",
  "Phone Number",
  "WhatsApp Number",
  "City",
  "Profession",
  "Monthly Household Budget",
  "Interested Product Categories",
  "Products Interested In",
  "Preferred Payment Method",
  "Purchase Timeline",
  "Notes",
  "Consent",
  "Source Page",
  "User Agent",
  "Follow-up Status",
  "Sales Notes"
] as const;

export type SurveyRow = {
  submittedAt: string;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  city: string;
  profession: string;
  monthlyHouseholdBudget: string;
  interestedProductCategories: string[];
  productsInterestedIn: string;
  preferredPaymentMethod: string;
  purchaseTimeline: string;
  notes: string;
  consent: boolean;
  sourcePage: string;
  userAgent: string;
  followUpStatus?: string;
  salesNotes?: string;
};

function getGoogleSheetsConfig() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID?.trim();
  const sheetName = process.env.GOOGLE_SHEET_TAB_NAME?.trim() || "Customer Survey";

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Google Sheets is not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID."
    );
  }

  return { clientEmail, privateKey, spreadsheetId, sheetName };
}

function toRowValues(data: SurveyRow) {
  return [
    data.submittedAt,
    data.fullName,
    data.phoneNumber,
    data.whatsappNumber,
    data.city,
    data.profession,
    data.monthlyHouseholdBudget,
    data.interestedProductCategories.join(", "),
    data.productsInterestedIn,
    data.preferredPaymentMethod,
    data.purchaseTimeline,
    data.notes,
    data.consent ? "Yes" : "No",
    data.sourcePage,
    data.userAgent,
    data.followUpStatus || "New",
    data.salesNotes || ""
  ];
}

function quoteSheetName(sheetName: string) {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

export async function appendSurveyRow(data: SurveyRow) {
  const { clientEmail, privateKey, spreadsheetId, sheetName } = getGoogleSheetsConfig();
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const hasSheet = spreadsheet.data.sheets?.some((sheet) => sheet.properties?.title === sheetName);

  if (!hasSheet) {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: sheetName } } }]
        }
      });
    } catch (error) {
      throw new Error(`Unable to create Google Sheet tab. Please manually create a "${sheetName}" tab.`);
    }
  }

  const headerRange = `${quoteSheetName(sheetName)}!A1:Q1`;
  const existingHeader = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange
  });

  if (!existingHeader.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: headerRange,
      valueInputOption: "RAW",
      requestBody: { values: [[...SURVEY_HEADERS]] }
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${quoteSheetName(sheetName)}!A:Q`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [toRowValues(data)] }
  });
}
