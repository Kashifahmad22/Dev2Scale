import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Section } from "@/components/ui/Section";
import { workItems } from "@/content/agency";

export const metadata: Metadata = {
  title: "Work | Dev2Scale",
  description:
    "Selected Dev2Scale work across websites, ecommerce, AI, automation and performance marketing.",
};

export default function WorkPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Selected work",
          title: "Built for real businesses. Built for results.",
          description:
            "We prioritize honest proof over noise — showing the business context, the work done, and the measurable outcome when it is verified.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {workItems.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </Section>
    </main>
  );
}
