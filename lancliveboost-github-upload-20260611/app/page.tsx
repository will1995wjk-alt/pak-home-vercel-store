import DealSection from "@/components/DealSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroBanner from "@/components/HeroBanner";
import PolicyLinks from "@/components/PolicyLinks";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <DealSection />
      <WhatsAppCTA />
      <PolicyLinks />
    </>
  );
}
