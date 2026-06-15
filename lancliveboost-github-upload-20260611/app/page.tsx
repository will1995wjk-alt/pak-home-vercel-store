import DealSection from "@/components/DealSection";
import CustomerSurvey from "@/components/CustomerSurvey";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HomeBuyingGuide from "@/components/HomeBuyingGuide";
import HeroBanner from "@/components/HeroBanner";
import PolicyLinks from "@/components/PolicyLinks";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CustomerSurvey />
      <TrustBadges />
      <FeaturedCategories />
      <HomeBuyingGuide />
      <FeaturedProducts />
      <DealSection />
      <WhatsAppCTA />
      <PolicyLinks />
    </>
  );
}
