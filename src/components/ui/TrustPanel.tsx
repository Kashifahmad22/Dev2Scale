import {
  ClientLogoGrid,
  type ClientLogo,
} from "@/components/ui/ClientLogoGrid";
import { ResultMetric } from "@/components/ui/ResultMetric";
import { type CaseStudyMetric } from "@/content/agency";
import { cn } from "@/lib/utils";

interface TrustPanelProps {
  clients?: ClientLogo[];
  metrics?: CaseStudyMetric[];
  technologies?: string[];
  className?: string;
}

/** A proof container that only shows evidence which exists; its empty state remains composed. */
export function TrustPanel({
  clients = [],
  metrics = [],
  technologies = [],
  className,
}: TrustPanelProps) {
  const verifiedMetrics = metrics.filter((metric) => metric.verified);
  return (
    <section
      className={cn("surface-elevated overflow-hidden rounded-lg", className)}
    >
      <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="meta-label text-accent">Built. Launched. Measured.</p>
          <h2 className="text-content mt-2 text-xl font-bold tracking-tight">
            Proof grows with the work.
          </h2>
        </div>
        <p className="text-content-secondary max-w-sm text-sm leading-relaxed">
          Only verified client evidence, metrics, and technology relationships
          belong here.
        </p>
      </div>
      {verifiedMetrics.length ? (
        <div className="bg-content/[0.08] grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {verifiedMetrics.map((metric) => (
            <ResultMetric
              key={metric.label}
              value={metric.value}
              label={metric.label}
              unit={metric.unit}
              verified
              source={metric.description ?? "Client-reported"}
              className="rounded-none border-0"
            />
          ))}
        </div>
      ) : null}
      {clients.length ? (
        <ClientLogoGrid clients={clients} />
      ) : (
        <ClientLogoGrid clients={[]} placeholderCount={5} />
      )}
      {technologies.length ? (
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t px-6 py-4">
          {technologies.map((technology) => (
            <span key={technology} className="meta-label text-content-muted">
              {technology}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
