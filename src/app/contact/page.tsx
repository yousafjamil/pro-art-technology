import type { Metadata } from "next";
import { ContactSection, FaqSection } from "@/components/Sections";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your app, website or software project and get a free consultation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="shell pt-16 sm:pt-20">
        <Reveal className="max-w-[720px]">
          <p className="text-[14px] text-subtle">Contact</p>
          <h1 className="mt-5 text-[clamp(40px,5vw,64px)] font-normal leading-[1.05] tracking-[-0.03em]">Start a project</h1>
          <p className="mt-5 max-w-[36rem] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-muted">
            Share a few details and we&apos;ll get back to you with a plan, timeline and estimate.
          </p>
        </Reveal>
      </section>
      <div className="-mt-16">
        <ContactSection heading="Tell us about your project" />
      </div>
      <div className="-mt-16 pb-32">
        <FaqSection />
      </div>
    </>
  );
}
