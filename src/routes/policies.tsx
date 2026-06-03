import { createFileRoute } from "@tanstack/react-router";
import { Policies } from "@/components/site/Policies";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "السياسات — ميرتس MERTES" },
      {
        name: "description",
        content:
          "سياسات ميرتس: الدفع، الاستبدال، الاسترجاع، وضمان الجودة — شفافية كاملة في كل تعامل.",
      },
    ],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  return (
    <div className="pt-8">
      <Policies />
    </div>
  );
}
