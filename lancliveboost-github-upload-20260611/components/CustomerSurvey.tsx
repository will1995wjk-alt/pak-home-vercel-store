"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { siteConfig } from "@/lib/config";
import { cleanPhoneNumber } from "@/lib/shopify/utils";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

const professions = [
  "Homemaker",
  "Student",
  "Office worker",
  "Business owner",
  "Shopkeeper",
  "Freelancer",
  "Teacher",
  "Healthcare worker",
  "Other"
];

const budgetRanges = [
  "Under PKR 3,000",
  "PKR 3,000 - 7,000",
  "PKR 7,000 - 15,000",
  "PKR 15,000+"
];

const categories = [
  "Kitchen Appliances",
  "Home Cleaning",
  "Personal Care",
  "Daily Use Products",
  "Storage & Organization",
  "Electronics Accessories"
];

const paymentMethods = ["Cash on Delivery", "Bank Transfer", "JazzCash", "Easypaisa"];
const purchaseTimelines = ["Immediately", "This week", "This month", "Just researching"];
const failureMessage = "Something went wrong. Please try again or contact us on WhatsApp.";

type SurveyStatus = "idle" | "success" | "error";

export default function CustomerSurvey() {
  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<SurveyStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    whatsappNumber: "",
    city: "",
    profession: "Homemaker",
    monthlyHouseholdBudget: "PKR 3,000 - 7,000",
    productsInterestedIn: "",
    preferredPaymentMethod: "Cash on Delivery",
    purchaseTimeline: "This week",
    notes: "",
    consent: false
  });

  const whatsappHref = useMemo(() => {
    if (!phone) return "";

    const message = [
      "Customer survey support",
      `Name: ${form.fullName || "Not provided"}`,
      `City: ${form.city || "Not provided"}`,
      `Interested categories: ${selectedCategories.join(", ") || "Not selected"}`,
      `Products interested in: ${form.productsInterestedIn || "Not provided"}`
    ].join("\n");

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [form.city, form.fullName, form.productsInterestedIn, phone, selectedCategories]);

  function updateField(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  async function submitSurvey(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    if (!form.fullName.trim() || (!form.phoneNumber.trim() && !form.whatsappNumber.trim()) || !form.city.trim()) {
      setStatus("error");
      setErrorMessage(failureMessage);
      return;
    }

    if (selectedCategories.length === 0) {
      setStatus("error");
      setErrorMessage(failureMessage);
      return;
    }

    if (!form.consent) {
      setStatus("error");
      setErrorMessage(failureMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          interestedProductCategories: selectedCategories,
          sourcePage: "/survey"
        })
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error("Survey submission failed.");
      }

      setStatus("success");
      setForm({
        fullName: "",
        phoneNumber: "",
        whatsappNumber: "",
        city: "",
        profession: "Homemaker",
        monthlyHouseholdBudget: "PKR 3,000 - 7,000",
        productsInterestedIn: "",
        preferredPaymentMethod: "Cash on Delivery",
        purchaseTimeline: "This week",
        notes: "",
        consent: false
      });
      setSelectedCategories([]);
    } catch (error) {
      setStatus("error");
      setErrorMessage(failureMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="customer-survey" className="section-pad bg-paper">
      <div className="container">
        <div className="grid gap-8 rounded-2xl border border-brand/20 bg-white p-5 shadow-lift md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div className="flex flex-col justify-between gap-8 rounded-xl bg-brand p-6 text-white md:p-8">
            <div>
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-wide text-brand-dark">
                Customer Survey
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
                Tell us what you need for your home.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/85">
                Help us understand your budget, shopping needs, and favorite product categories so
                we can bring better deals for Pakistan households.
              </p>
            </div>

            <div className="grid gap-3 text-sm font-bold text-white/90 sm:grid-cols-2">
              <div className="rounded-xl bg-white/12 p-4">
                <span className="block text-2xl font-black">1 min</span>
                quick response
              </div>
              <div className="rounded-xl bg-white/12 p-4">
                <span className="block text-2xl font-black">Better</span>
                product deals
              </div>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={submitSurvey}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Full Name
                <input
                  className="field"
                  value={form.fullName}
                  onChange={(event) => updateField("fullName", event.target.value)}
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                City
                <input
                  className="field"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="Karachi, Lahore, Islamabad..."
                  required
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Phone Number
                <input
                  className="field"
                  value={form.phoneNumber}
                  onChange={(event) => updateField("phoneNumber", event.target.value)}
                  placeholder="+92..."
                  type="tel"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                WhatsApp Number
                <input
                  className="field"
                  value={form.whatsappNumber}
                  onChange={(event) => updateField("whatsappNumber", event.target.value)}
                  placeholder="+92..."
                  type="tel"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Profession
                <select
                  className="field"
                  value={form.profession}
                  onChange={(event) => updateField("profession", event.target.value)}
                >
                  {professions.map((profession) => (
                    <option key={profession}>{profession}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Monthly Household Budget
                <select
                  className="field"
                  value={form.monthlyHouseholdBudget}
                  onChange={(event) => updateField("monthlyHouseholdBudget", event.target.value)}
                >
                  {budgetRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="grid gap-3 rounded-xl border border-line bg-white p-4">
              <legend className="px-1 text-sm font-black text-ink">Interested Product Categories</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 accent-brand"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="grid gap-2 text-sm font-bold text-ink">
              Products Interested In
              <input
                className="field"
                value={form.productsInterestedIn}
                onChange={(event) => updateField("productsInterestedIn", event.target.value)}
                placeholder="Blender, vacuum cleaner, storage boxes..."
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Preferred Payment Method
                <select
                  className="field"
                  value={form.preferredPaymentMethod}
                  onChange={(event) => updateField("preferredPaymentMethod", event.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <option key={method}>{method}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Purchase Timeline
                <select
                  className="field"
                  value={form.purchaseTimeline}
                  onChange={(event) => updateField("purchaseTimeline", event.target.value)}
                >
                  {purchaseTimelines.map((timeline) => (
                    <option key={timeline}>{timeline}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-bold text-ink">
              Notes / Requirements
              <textarea
                className="field min-h-28 resize-y"
                value={form.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Tell us about your requirements, budget range, or delivery preference."
              />
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-line bg-paper p-4 text-sm font-semibold leading-6 text-ink-soft">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => updateField("consent", event.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
                required
              />
              I agree to be contacted on WhatsApp for product recommendations and offers.
            </label>

            {status === "success" ? (
              <div className="rounded-xl border border-brand/25 bg-brand/10 p-4 text-sm font-bold text-brand-dark">
                Thank you! Our team will contact you on WhatsApp soon.
              </div>
            ) : null}

            {status === "error" ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                {errorMessage || failureMessage}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="button button-primary w-full sm:w-fit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Survey"}
                <ArrowIcon className="h-4 w-4" />
              </button>

              {whatsappHref ? (
                <a
                  className="button button-whatsapp w-full sm:w-fit"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Contact on WhatsApp
                </a>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
