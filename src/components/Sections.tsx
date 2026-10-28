import { site } from "@/config/site";
import { ContactForm } from "./ContactForm";

export function SectionHeading({ title, intro, center = true }: { title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-[820px] text-center" : "max-w-[640px]"}>
      <h2 className="text-[clamp(34px,4.4vw,56px)] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h2>
      {intro && <p className={`mt-4 text-[19px] text-muted ${center ? "mx-auto max-w-[640px]" : ""}`}>{intro}</p>}
    </div>
  );
}

const faqs = [
  {
    q: "How much does it cost to build an app or website?",
    a: "It depends on the features, platforms and integrations you need. After a free consultation we send a clear, itemised estimate so you know the cost before we start.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope. Before we start you get a plan with clear milestones, and you see working progress every two weeks.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes. Once the project is paid, all source code, designs and intellectual property belong to you.",
  },
  {
    q: "Will you sign an NDA?",
    a: "Yes. We are happy to sign a non-disclosure agreement before you share any details about your idea.",
  },
  {
    q: "Do you support the product after launch?",
    a: "Yes. We offer ongoing support covering bug fixes, operating-system updates, monitoring and new features.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-[920px] px-5 pt-[120px] sm:px-7">
      <SectionHeading title="Frequently asked questions" />
      <div className="mt-12 border-t border-[#dde3ea]">
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b border-[#dde3ea]" open={i === 0}>
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 text-xl font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="shrink-0 text-2xl font-normal text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-1 pb-6 text-[17px] text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ heading = "Let's build something great together" }: { heading?: string }) {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
      <div className="flex flex-wrap items-start gap-12 rounded-[40px] bg-brand p-7 text-white sm:p-12 lg:p-[88px]">
        <div className="min-w-0 flex-[1_1_380px]">
          <h2 className="text-[clamp(36px,4.6vw,60px)] font-medium leading-[1.08] tracking-[-0.03em]">{heading}</h2>
          <p className="mt-5 text-[19px] text-brand-soft">
            Tell us about your idea. We reply within one business day with next steps.
          </p>
          <div className="mt-9 flex flex-col gap-2.5 text-[17px]">
            {site.email && (
              <a href={`mailto:${site.email}`} className="text-white underline-offset-4 hover:text-white hover:underline">
                {site.email}
              </a>
            )}
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-white hover:text-white hover:underline">
                {site.phone}
              </a>
            )}
            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white hover:underline"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
