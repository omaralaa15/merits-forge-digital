import { createFileRoute } from "@tanstack/react-router";
import { QuoteCTA } from "@/components/site/QuoteCTA";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — ميرتس MERTES" },
      {
        name: "description",
        content: "تواصل مع ميرتس: اطلب عرض سعر، استفسر عن خامات أو ماكينات، أو استشر فريق التصميم.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <QuoteCTA />
    </div>
  );
}
