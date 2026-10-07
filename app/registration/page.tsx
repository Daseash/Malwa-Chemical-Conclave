import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        title="Registration"
        subtitle="Malwa Chemical Conclave 2026 • IIT Indore"
      />

      <div className="mx-auto max-w-5xl px-4 py-20 sm:py-32 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-navy-950">
              Registration Closed
            </h1>
          </div>
        </Reveal>
      </div>
    </>
  );
}
