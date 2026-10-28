"use client";

import { useState } from "react";
import { site } from "@/config/site";

const services = ["Mobile app", "Web platform", "Website", "Custom software", "UI/UX design", "Dedicated team"];

// Opens the visitor's email app with the message filled in.
// To receive messages directly on the site later, connect a form service here.
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const subject = `New project enquiry — ${data.get("service")}`;
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "-"}`,
      `Service: ${data.get("service")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = "rounded-xl border border-outline bg-white px-3.5 py-3.5 text-base text-ink";
  const label = "flex flex-col gap-1.5 text-sm font-medium text-muted";

  return (
    <form onSubmit={onSubmit} className="grid min-w-0 flex-[1_1_440px] gap-4 rounded-[28px] bg-white p-6 text-ink sm:grid-cols-2 sm:p-8">
      <label className={label}>
        Name
        <input name="name" type="text" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Work email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Company
        <input name="company" type="text" autoComplete="organization" className={field} />
      </label>
      <label className={label}>
        I need help with
        <select name="service" className={field} defaultValue={services[0]}>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className={`${label} sm:col-span-2`}>
        About your project
        <textarea name="message" rows={4} required className={field} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" className="rounded-full bg-brand px-8 py-3.5 font-semibold text-white hover:bg-brand-ink">
          Send message
        </button>
        {sent && <span className="text-sm text-muted">Your email app should open with the message ready to send.</span>}
      </div>
    </form>
  );
}
