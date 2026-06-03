import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { SearchSection } from "@/components/site/SearchSection";
import { BusinessUnits } from "@/components/site/BusinessUnits";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { Projects } from "@/components/site/Projects";
import { WhyMerits } from "@/components/site/WhyMerits";
import { Testimonials } from "@/components/site/Testimonials";
import { Policies } from "@/components/site/Policies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ميرتس MERTES — منظومة إنتاج إعلاني متكاملة" },
      {
        name: "description",
        content:
          "ميرتس: مورد + مصنع + مصمم + منفذ. خامات جملة وقطاعي، ماكينات طباعة وليزر وروتر، تصميم احترافي، توريد وتركيب.",
      },
      { property: "og:title", content: "ميرتس MERTES — إنتاج إعلاني متكامل" },
      {
        property: "og:description",
        content: "خامات • ماكينات • طباعة • ليزر وروتر • تصميم • توريد وتركيب.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <SearchSection />
      <BusinessUnits />
      <FeaturedProducts />
      <Projects />
      <WhyMerits />
      <Testimonials />
      <Policies />
    </>
  );
}
