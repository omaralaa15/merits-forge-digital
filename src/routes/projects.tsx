import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/components/site/Projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "المشروعات — ميرتس MERTES" },
      {
        name: "description",
        content: "أعمال ومشاريع ميرتس المنفذة: لافتات، طباعة، ليزر، روتر، تصميم، توريد وتركيب.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="pt-8">
      <Projects />
    </div>
  );
}
