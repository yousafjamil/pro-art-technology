"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

// The hero's one interactive moment: the two product mockups tilt gently
// toward the pointer, like a product shot on a turntable. Disabled under
// prefers-reduced-motion by MotionConfig at the layout level, and inert on
// touch (no pointer to follow).
function TiltCard({ children }: { children: React.ReactNode }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });

  return (
    <motion.div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width);
        my.set((e.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

export function HeroVisual({ heroApp, heroWeb }: { heroApp?: Project; heroWeb: Project }) {
  return (
    <div className="grid-field relative mt-[72px] overflow-hidden rounded-[32px] border border-line bg-bg-raised px-4 pt-8 sm:px-12 sm:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-accent-soft),transparent)]"
      />
      <div className="relative flex items-end justify-center gap-8">
        {heroApp && (
          <div className="hidden shrink-0 lg:block">
            <TiltCard>
              <ProjectVisual project={heroApp} large />
            </TiltCard>
          </div>
        )}
        <div className="flex min-w-0 flex-1 justify-center">
          <TiltCard>
            <ProjectVisual project={heroWeb} large />
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
