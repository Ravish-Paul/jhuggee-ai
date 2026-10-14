import { DeveloperSection } from "@/components/DeveloperSection";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProblemSection } from "@/components/ProblemSection";
import { ResponsibleAI } from "@/components/ResponsibleAI";
import { SolutionSection } from "@/components/SolutionSection";
import { UseCases } from "@/components/UseCases";
import { VoiceDemo } from "@/components/VoiceDemo";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <UseCases />
      <HowItWorks />
      <VoiceDemo />
      <DeveloperSection />
      <ResponsibleAI />
      <WaitlistForm />
      <FAQ />
      <FinalCTA />
    </>
  );
}
