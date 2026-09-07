"use client";

import { useState } from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { consultationOptions } from "@/content/agency";
import { siteConfig } from "@/config/site";

/** Frontend-only consultation capture; a later API can replace the submit handler. */
export function ConsultationForm() {
  const [ready, setReady] = useState(false);
  const fields = [
    ["name", "Name", "text"],
    ["business", "Business", "text"],
    ["website", "Website / Instagram", "url"],
    ["email", "Email", "email"],
    ["phone", "Phone / WhatsApp", "tel"],
    ["goal", "Primary goal", "text"],
  ] as const;
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setReady(true);
      }}
      className="surface-elevated rounded-lg p-5 sm:p-7"
    >
      <p className="meta-label text-accent">Start the conversation</p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-content">
        Tell us what you’re trying to build, automate, or grow.
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <label key={name} className={name === "goal" ? "sm:col-span-2" : ""}>
            <span className="mb-2 block text-sm font-medium text-content">
              {label}
            </span>
            <input
              name={name}
              type={type}
              required={name === "name" || name === "email"}
              className="h-11 w-full rounded border bg-white px-3 text-sm text-content placeholder:text-content-muted"
            />
          </label>
        ))}
        <label>
          <span className="mb-2 block text-sm font-medium text-content">
            What do you need help with?
          </span>
          <select
            name="service"
            className="h-11 w-full rounded border bg-white px-3 text-sm text-content"
          >
            {consultationOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-content">
            Approximate budget{" "}
            <span className="text-content-muted">(optional)</span>
          </span>
          <input
            name="budget"
            type="text"
            className="h-11 w-full rounded border bg-white px-3 text-sm text-content"
          />
        </label>
      </div>
      <Button type="submit" className="mt-6 w-full">
        Prepare My Enquiry
      </Button>
      {ready ? (
        <div className="mt-5 rounded-card border border-success/20 bg-success-soft p-4 text-sm text-content-secondary">
          <p className="font-semibold text-content">
            Your enquiry details are ready.
          </p>
          <p className="mt-1">
            Online submission will be connected in a later phase. In the
            meantime, use either direct contact route below.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              href={siteConfig.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              <Calendar size={15} /> Book a call
            </Button>
            <Button
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              <MessageCircle size={15} /> WhatsApp us
            </Button>
          </div>
        </div>
      ) : null}
    </form>
  );
}
