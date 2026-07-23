import CallToAction from "@/Components/CallToAction";
import EcosystemStats from "@/Components/EcosystemStats";
import FAQSection from "@/Components/FAQSection";
import HeroBanner from "@/Components/HeroBanner";
import InteractiveSlider from "@/Components/InteractiveSlider";
import MonitoredSectors from "@/Components/MonitoredSectors";
import PlatformFeatures from "@/Components/PlatformFeatures";

export default function LandingPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      {/* 1. Hero Section Component */}
      <HeroBanner />

      {/* Main Container for the other 6 Meaningful Sections */}
      <div className="max-w-6xl mx-auto py-16 px-4 space-y-20">
        <InteractiveSlider />
        <PlatformFeatures />
        <EcosystemStats/>
        <MonitoredSectors />
        <FAQSection />
        <CallToAction />
      </div>
    </div>
  );
}