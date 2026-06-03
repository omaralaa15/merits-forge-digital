import { createFileRoute } from "@tanstack/react-router";
import { BusinessUnits } from "@/components/site/BusinessUnits";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات — ميرتس MERTES" },
      {
        name: "description",
        content:
          "الخدمات التنفيذية لميرتس: طباعة، ليزر وروتر، تصميم، توريد وتركيب، لافتات، واجهات.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div>
      <div className="bg-navy py-16 text-center text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="mb-3 inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-bold backdrop-blur">
            خدمات تنفيذية
          </div>
          <h1 className="text-4xl font-black md:text-6xl">
            خدمات <span className="text-primary-light">ميرتس التنفيذية</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/70">
            من التصميم والطباعة إلى التركيب النهائي — فريق متكامل يغطي كل مرحلة
          </p>
        </div>
      </div>
      <BusinessUnits />
      <Services />
    </div>
  );
}
