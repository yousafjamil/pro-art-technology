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
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7">
        <Reveal>
          <p className="label text-accent">Contact</p>
          <h1 className="mt-5 font-display text-[clamp(44px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.03em]">Start a project</h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(17px,1.6vw,20px)] text-muted">
            Share a few details and we&apos;ll get back to you with a plan, timeline and estimate.
          </p>
        </Reveal>
      </section>
      <div className="-mt-10">
        <ContactSection heading="Tell us about your project" />
      </div>
      <div className="pb-[120px]">
        <FaqSection />
      </div>
    </>
  );
}
