import { createFileRoute } from "@tanstack/react-router";
import { BusinessUnits } from "@/components/site/BusinessUnits";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/system")({
  head: () => ({
    meta: [
      { title: "المنظومة — ميرتس MERTES" },
      {
        name: "description",
        content:
          "منظومة ميرتس المتكاملة: 8 وحدات أعمال تغطي كل مراحل الإنتاج الإعلاني من الخامة إلى التركيب.",
      },
    ],
  }),
  component: SystemPage,
});

function SystemPage() {
  return (
    <div>
      <BusinessUnits />
      <Services />
    </div>
  );
}
