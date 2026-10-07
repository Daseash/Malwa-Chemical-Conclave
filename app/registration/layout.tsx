import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Closed | Malwa Chemical Conclave 2026",
  description: "Registrations for Malwa Chemical Conclave 2026 at IIT Indore are now closed.",
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
