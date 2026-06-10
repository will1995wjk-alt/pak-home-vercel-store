import DealSection from "@/components/DealSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroBanner from "@/components/HeroBanner";
import PolicyLinks from "@/components/PolicyLinks";
import TrustBadges from "@/components/TrustBadges";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FeaturedCategories />
      <TrustBadges />
      <FeaturedProducts />
      <DealSection />
      <section className="bg-ink py-12 text-white">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">Need help choosing a product?</h2>
            <p className="mt-2 text-white/75">Chat with us on WhatsApp.</p>
          </div>
          <WhatsAppButton label="Chat on WhatsApp" className="button bg-white text-ink" />
        </div>
      </section>
      <PolicyLinks />
    </>
  );
}
