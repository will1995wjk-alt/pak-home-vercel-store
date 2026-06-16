import Link from "next/link";
import { ArrowIcon } from "./Icons";

export default function CustomerSurveyPrompt() {
  return (
    <section id="customer-survey" className="bg-paper py-8">
      <div className="container">
        <div className="flex flex-col gap-5 rounded-xl border border-brand/35 bg-navy p-6 text-white shadow-lift md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="eyebrow text-brand">Customer Survey</p>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">Help us bring better deals for your home.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70 md:text-base">
              Share your profession, budget, shopping needs, and product interests in one quick form.
            </p>
          </div>
          <Link href="/survey" className="button button-primary w-full shrink-0 md:w-auto">
            Open survey
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
