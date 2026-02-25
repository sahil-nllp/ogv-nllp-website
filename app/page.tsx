import Hero from "./components/Hero";
import OperationalNodes from "./components/OperationalNodes";
import EcosystemTimeline from "./components/EcosystemTimeline";
import CompanyJourney from "./components/CompanyJourney";

export default function Home() {
  return (
    <main className="relative bg-[#0c0d0c]">
      <Hero />
      <OperationalNodes />
      <EcosystemTimeline />
      <CompanyJourney  />
    </main>
  );
}
