import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ClientLogo {
  name: string;
  logo?: ReactNode;
  href?: string;
  category?: string;
}

interface ClientLogoGridProps {
  clients: ClientLogo[];
  placeholderCount?: number;
  className?: string;
}

/** Logo grid that reads as intentional before real client logos are supplied. */
export function ClientLogoGrid({
  clients,
  placeholderCount = 0,
  className,
}: ClientLogoGridProps) {
  const placeholders = Array.from({
    length: Math.max(0, placeholderCount - clients.length),
  });
  return (
    <div
      className={cn(
        "grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-5",
        className,
      )}
    >
      {clients.map((client) => (
        <LogoCell key={client.name} client={client} />
      ))}
      {placeholders.map((_, index) => (
        <div
          key={index}
          className="flex min-h-28 items-center justify-center border-b border-r bg-background-secondary/40 px-4 text-center"
        >
          <span className="meta-label text-content-muted">Client / Brand</span>
        </div>
      ))}
    </div>
  );
}

function LogoCell({ client }: { client: ClientLogo }) {
  const content = (
    <>
      <span className="text-sm font-semibold text-content">
        {client.logo ?? client.name}
      </span>
      {client.category ? (
        <span className="mt-1 text-xs text-content-muted">
          {client.category}
        </span>
      ) : null}
    </>
  );
  const classes =
    "flex min-h-28 flex-col items-center justify-center border-b border-r px-4 text-center transition-colors hover:bg-accent-soft/45";
  return client.href ? (
    <a
      href={client.href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {content}
    </a>
  ) : (
    <div className={classes}>{content}</div>
  );
}
