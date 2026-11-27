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
      <section className="on-signal">
        <div className="shell pb-16 pt-14 sm:pt-20 lg:pb-20">
          <Reveal className="max-w-[960px]">
            <p className="eyebrow">Contact</p>
            <h1 className="display mt-8">Start a project</h1>
            <p className="lede mt-8 max-w-[36rem]">
              Share a few details and we&apos;ll get back to you with a plan, timeline and estimate.
            </p>
          </Reveal>
        </div>
      </section>
      <ContactSection heading="Tell us about your project" />
      <FaqSection />
    </>
  );
}
