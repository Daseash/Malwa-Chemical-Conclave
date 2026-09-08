import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secretariat Portal | Malwa Chemical Conclave 2026",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div id="admin-portal" className="min-h-screen bg-white text-gray-900 w-full">
      {/* 
        Critical zero-flash guarantee:
        Injected directly into SSR HTML so the browser hides the site header & footer 
        instantly before initial render/hydration, preventing any pop or flash.
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .site-header, footer {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
              overflow: hidden !important;
              pointer-events: none !important;
              opacity: 0 !important;
            }
            body {
              background-color: #ffffff !important;
            }
          `,
        }}
      />
      {children}
    </div>
  );
}
