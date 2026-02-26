import Hero from "./components/Hero";
import OperationalNodes from "./components/OperationalNodes";
import EcosystemTimeline from "./components/EcosystemTimeline";
import CompanyJourney from "./components/CompanyJourney";
import ProjectsShowcaseVariant from "./components/ProjectsShowcaseVariant";
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
      <TestimonialsMarquee />
      <CtaRevealFooterVariant />
    </main>
  );
}
