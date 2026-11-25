import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Mobile App & Software Development`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Mobile App & Software Development`,
    description: site.description,
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#141516",
};

// Sets data-theme before the browser paints, from the visitor's last choice
// (ThemeToggle.tsx writes it), so a returning light-theme visitor never sees
// a flash of the dark default. Dark needs no attribute — it's the base
// palette in globals.css — so a first-ever visit or a blocked localStorage
// just renders dark immediately, with no script dependency either way.
const THEME_BOOTSTRAP = `(function(){try{var t=localStorage.getItem("proart-theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#eeedea");}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[4px] focus:bg-accent focus:px-5 focus:py-3 focus:font-medium focus:text-accent-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
