import Hero from "./components/Hero";
import OperationalNodes from "./components/OperationalNodes";
import EcosystemTimeline from "./components/EcosystemTimeline";
import CompanyJourney from "./components/CompanyJourney";
import ProjectsShowcaseVariant from "./components/ProjectsShowcaseVariant";
import GlobalImpactMap from "./components/GlobalImpactMap";
import GlobalImpactMapV2 from "./components/GlobalImpactMapV2";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import CtaRevealFooterVariant from "./components/CtaRevealFooterVariant";

export default function Home() {
  return (
    <main className="relative bg-[#0c0d0c]">
      <Hero />
      <OperationalNodes />
      <EcosystemTimeline />
      <CompanyJourney  />
      <ProjectsShowcaseVariant />
      <GlobalImpactMap />
      {/* <GlobalImpactMapV2/> */}
      <TestimonialsMarquee />
      <CtaRevealFooterVariant />
    </main>
  );
}
