import CustomerSurvey from "@/components/CustomerSurvey";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Customer Survey",
  description: "Share your shopping preferences, profession, budget, and product interests.",
  path: "/survey"
});

export default function SurveyPage() {
  return <CustomerSurvey />;
}
