import DealSection from "@/components/DealSection";
import CustomerSurveyPrompt from "@/components/CustomerSurveyPrompt";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeBuyingGuide from "@/components/HomeBuyingGuide";
import HeroBanner from "@/components/HeroBanner";
import PolicyLinks from "@/components/PolicyLinks";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CustomerSurveyPrompt />
      <FeaturedCategories />
      <FeaturedProducts />
      <DealSection />
      <WhatsAppCTA />
      <HomeBuyingGuide />
      <PolicyLinks />
    </>
  );
}
