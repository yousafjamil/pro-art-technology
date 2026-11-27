import { site } from "@/config/site";
import { Reveal } from "./motion/Reveal";
import { ContactForm } from "./ContactForm";

// Every section opens the same way: the orange dash, a small uppercase name,
// then a large heavy headline. `dark` for black and petrol blocks.
export function SectionHeading({
  title,
  intro,
  kicker,
  action,
  dark = false,
  as: Tag = "h2",
}: {
  title: string;
  intro?: string;
  kicker?: string;
  action?: React.ReactNode;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
      <div className="max-w-[920px]">
        {kicker && (
          <div className="flex items-center gap-4">
            <span className="dash" aria-hidden="true" />
            <p className={`eyebrow ${dark ? "text-on-night-muted" : "text-muted"}`}>{kicker}</p>
          </div>
        )}
        <Tag className={`headline text-balance ${kicker ? "mt-6" : ""}`}>{title}</Tag>
        {intro && <p className={`lede mt-6 max-w-[40rem] ${dark ? "text-on-night-muted" : "text-muted"}`}>{intro}</p>}
      </div>
      {action}
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
    <section id="faq" className="scroll-mt-28 py-24 lg:py-32">
      <div className="shell grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading kicker="Questions" title="Frequently asked questions" />
        <Reveal className="border-t-2 border-ink" delay={0.05}>
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-line-strong" open={i === 0}>
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[20px] font-semibold tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center bg-ink text-[22px] font-normal text-white group-open:bg-signal group-open:text-ink"
                >
                  <span className="block transition-transform duration-150 group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="max-w-[44rem] pb-7 text-[17px] leading-[1.65] text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection({ heading = "Let's build something great together" }: { heading?: string }) {
  const rows = [
    site.email && { k: "Email", v: site.email, href: `mailto:${site.email}` },
    site.phone && { k: "Phone", v: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    site.whatsapp && { k: "WhatsApp", v: "Chat on WhatsApp", href: `https://wa.me/${site.whatsapp}`, external: true },
  ].filter(Boolean) as { k: string; v: string; href: string; external?: boolean }[];

  return (
    <section id="contact" className="on-night scroll-mt-28">
      <div className="shell grid gap-14 py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:py-32">
        <Reveal className="min-w-0">
          <div className="flex items-center gap-4">
            <span className="dash" aria-hidden="true" />
            <p className="eyebrow text-on-night-muted">Start here</p>
          </div>
          <h2 className="headline mt-6 text-balance">{heading}</h2>
          <p className="lede mt-6 max-w-[30rem] text-on-night-muted">
            Tell us about your idea. We reply within one business day with next steps.
          </p>
          <dl className="mt-12 border-t border-night-line">
            {rows.map((r) => (
              <div key={r.k} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-night-line py-4">
                <dt className="eyebrow text-on-night-muted">{r.k}</dt>
                <dd>
                  <a
                    href={r.href}
                    {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[17px] font-medium text-white underline-offset-4 hover:underline"
                  >
                    {r.v}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.06} className="min-w-0 bg-paper p-6 text-ink sm:p-10">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
