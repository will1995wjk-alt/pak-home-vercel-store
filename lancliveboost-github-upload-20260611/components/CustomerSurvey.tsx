"use client";

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

const incomeRanges = [
  "Under PKR 50,000",
  "PKR 50,000 - 100,000",
  "PKR 100,000 - 200,000",
  "PKR 200,000+"
];

const budgetRanges = [
  "Under PKR 3,000",
  "PKR 3,000 - 7,000",
  "PKR 7,000 - 15,000",
  "PKR 15,000+"
];

const categories = [
  "Kitchen appliances",
  "Home cleaning",
  "Personal care",
  "Daily use products",
  "Storage products"
];

const buyTimelines = ["Today", "This week", "This month", "Just browsing"];

export default function CustomerSurvey() {
  const phone = cleanPhoneNumber(siteConfig.whatsappNumber);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Kitchen appliances"]);
  const [form, setForm] = useState({
    profession: "Homemaker",
    city: "",
    income: "PKR 50,000 - 100,000",
    budget: "PKR 3,000 - 7,000",
    timeline: "This week",
    payment: "Cash on Delivery",
    contact: ""
  });

  const whatsappHref = useMemo(() => {
    if (!phone) return "";

    const message = [
      "Customer survey response",
      `Profession: ${form.profession}`,
      `City: ${form.city || "Not provided"}`,
      `Monthly household income: ${form.income}`,
      `Shopping budget: ${form.budget}`,
      `Interested categories: ${selectedCategories.join(", ")}`,
      `Buying timeline: ${form.timeline}`,
      `Preferred payment: ${form.payment}`,
      `Customer contact: ${form.contact || "Not provided"}`
    ].join("\n");

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, [form, phone, selectedCategories]);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleCategory(category: string) {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  }

  return (
    <section id="customer-survey" className="section-pad bg-white">
      <div className="container">
        <div className="grid gap-8 rounded-2xl border border-brand/20 bg-[#f4fbf7] p-5 shadow-lift md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div className="flex flex-col justify-between gap-8 rounded-xl bg-brand p-6 text-white md:p-8">
            <div>
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-wide text-brand-dark">
                Customer Survey
              </span>
              <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
                Tell us what you need for your home.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/85">
                Help us understand your profession, budget, shopping needs, and favorite product
                categories so we can bring better deals for Pakistan households.
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

          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
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
                City
                <input
                  className="field"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="Karachi, Lahore, Islamabad..."
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Monthly household income
                <select
                  className="field"
                  value={form.income}
                  onChange={(event) => updateField("income", event.target.value)}
                >
                  {incomeRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Usual shopping budget
                <select
                  className="field"
                  value={form.budget}
                  onChange={(event) => updateField("budget", event.target.value)}
                >
                  {budgetRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="grid gap-3 rounded-xl border border-[#d6eee0] bg-white p-4">
              <legend className="px-1 text-sm font-black text-ink">Interested categories</legend>
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

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-ink">
                Buying timeline
                <select
                  className="field"
                  value={form.timeline}
                  onChange={(event) => updateField("timeline", event.target.value)}
                >
                  {buyTimelines.map((timeline) => (
                    <option key={timeline}>{timeline}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-ink">
                Preferred payment
                <select
                  className="field"
                  value={form.payment}
                  onChange={(event) => updateField("payment", event.target.value)}
                >
                  <option>Cash on Delivery</option>
                  <option>JazzCash</option>
                  <option>Easypaisa</option>
                  <option>Bank transfer</option>
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-bold text-ink">
              Phone or WhatsApp
              <input
                className="field"
                value={form.contact}
                onChange={(event) => updateField("contact", event.target.value)}
                placeholder="+92..."
              />
            </label>

            {whatsappHref ? (
              <a className="button button-whatsapp w-full sm:w-fit" href={whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Submit survey on WhatsApp
                <ArrowIcon className="h-4 w-4" />
              </a>
            ) : (
              <button className="button w-full cursor-not-allowed bg-[#d6dee4] text-ink-soft sm:w-fit" disabled>
                Set WhatsApp number to collect responses
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
