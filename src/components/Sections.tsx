import { site } from "@/config/site";
import { Reveal } from "./motion/Reveal";
import { ContactForm } from "./ContactForm";

export function SectionHeading({
  title,
  intro,
  kicker,
  center = true,
}: {
  title: string;
  intro?: string;
  kicker?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-[820px] text-center" : "max-w-[640px]"}>
      {kicker && <p className="label mb-4 text-accent">{kicker}</p>}
      <h2 className="text-balance font-display text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.1] tracking-[-0.02em]">{title}</h2>
      {intro && <p className={`mt-4 text-[18px] text-muted ${center ? "mx-auto max-w-[640px]" : ""}`}>{intro}</p>}
    </Reveal>
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
      <SectionHeading kicker="Questions" title="Frequently asked questions" />
      <Reveal className="mt-12 border-t border-line" delay={0.1}>
        {faqs.map((f, i) => (
          <details key={f.q} className="group border-b border-line" open={i === 0}>
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="shrink-0 text-2xl font-normal text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-1 pb-6 text-[16px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  );
}

export function ContactSection({ heading = "Let's build something great together" }: { heading?: string }) {
  return (
    <section id="contact" className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
      <Reveal className="grid-field relative overflow-hidden rounded-[28px] border border-line bg-bg-raised">
        <div className="relative flex flex-wrap items-start gap-12 p-7 sm:p-12 lg:p-[80px]">
          <div className="min-w-0 flex-[1_1_380px]">
            <p className="label mb-4 text-accent">Start here</p>
            <h2 className="text-balance font-display text-[clamp(32px,4.2vw,54px)] font-medium leading-[1.08] tracking-[-0.02em]">
              {heading}
            </h2>
            <p className="mt-5 text-[18px] text-muted">
              Tell us about your idea. We reply within one business day with next steps.
            </p>
            <div className="mt-9 flex flex-col gap-2.5 text-[16px]">
              {site.email && (
                <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:text-accent hover:underline">
                  {site.email}
                </a>
              )}
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-muted hover:text-ink">
                  {site.phone}
                </a>
              )}
              {site.whatsapp && (
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
