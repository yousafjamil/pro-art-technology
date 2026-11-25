import { site } from "@/config/site";
import { Reveal } from "./motion/Reveal";
import { ContactForm } from "./ContactForm";
import { SpecMark } from "./SpecMark";

// Every section opens the same way: a full-width hairline, the sheet index
// on the left column, the title and intro in the wider right column.
export const SECTION_GRID = "grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]";

// Homepage sheet numbering: the hero is 00, these are 01 to 06.
export const SHEETS = 6;

export function SectionHeading({
  title,
  intro,
  kicker,
  index,
  action,
}: {
  title: string;
  intro?: string;
  kicker?: string;
  index?: number;
  action?: React.ReactNode;
}) {
  return (
    <Reveal className={`${SECTION_GRID} border-t border-line pt-6`}>
      <div>
        {index !== undefined ? (
          <SpecMark index={index} total={SHEETS}>
            {kicker}
          </SpecMark>
        ) : (
          kicker && <p className="text-[14px] text-subtle">{kicker}</p>
        )}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div className="max-w-[720px]">
          <h2 className="text-balance text-[clamp(30px,3.4vw,44px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink">
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-[36rem] text-[18px] leading-[1.6] text-muted">{intro}</p>}
        </div>
        {action}
      </div>
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

export function FaqSection({ index }: { index?: number }) {
  return (
    <section id="faq" className="shell scroll-mt-20 pt-32">
      <SectionHeading index={index} kicker="Questions" title="Frequently asked questions" />
      <div className={`${SECTION_GRID} mt-12`}>
        <div aria-hidden="true" className="hidden lg:block" />
        <Reveal className="border-t border-line" delay={0.05}>
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-line" open={i === 0}>
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="meta shrink-0 text-subtle transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[44rem] pb-6 text-[16px] leading-[1.65] text-muted">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function ContactSection({
  heading = "Let's build something great together",
  index,
}: {
  heading?: string;
  index?: number;
}) {
  return (
    <section id="contact" className="shell scroll-mt-20 py-32">
      <Reveal className="rounded-[8px] border border-line bg-bg-raised">
        <div className="grid gap-12 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:p-16">
          <div className="min-w-0">
            {index !== undefined ? (
              <SpecMark index={index} total={SHEETS}>
                Start here
              </SpecMark>
            ) : (
              <p className="text-[14px] text-subtle">Start here</p>
            )}
            <h2 className="mt-6 text-balance text-[clamp(30px,3.4vw,44px)] font-normal leading-[1.12] tracking-[-0.02em]">
              {heading}
            </h2>
            <p className="mt-5 max-w-[30rem] text-[18px] leading-[1.6] text-muted">
              Tell us about your idea. We reply within one business day with next steps.
            </p>
            <dl className="mt-10 border-t border-line text-[16px]">
              {site.email && (
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-subtle">Email</dt>
                  <dd>
                    <a href={`mailto:${site.email}`} className="text-ink underline-offset-4 hover:underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              {site.phone && (
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-subtle">Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tabular-nums text-ink underline-offset-4 hover:underline">
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
              {site.whatsapp && (
                <div className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <dt className="meta text-subtle">WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline-offset-4 hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <ContactForm />
        </div>
      </Reveal>
    </section>
  );
}
