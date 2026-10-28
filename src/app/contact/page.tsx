import type { Metadata } from "next";
import { ContactSection, FaqSection } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your app, website or software project and get a free consultation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7">
        <h1 className="text-[clamp(44px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.035em]">Start a project</h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(18px,1.6vw,21px)] text-muted">
          Share a few details and we'll get back to you with a plan, timeline and estimate.
        </p>
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
