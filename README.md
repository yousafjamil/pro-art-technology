# ProArt Technology — Website

Company website built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.
Every page is pre-built as static HTML, so the site is fast and has no database or login to attack.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Add a new project to the portfolio

All projects live in **`src/data/projects.ts`**. To add one, copy an existing block, paste it at the
top of the list and change the details:

```ts
{
  slug: "my-new-app",                 // page address: /work/my-new-app
  name: "My New App",
  category: "Mobile App",             // "Mobile App" | "Web Platform" | "Website" | "Software"
  industry: "Healthcare",
  summary: "One sentence shown on the project card.",
  description: "Longer text shown on the project page.",
  links: [
    { kind: "play-store", url: "https://play.google.com/store/apps/details?id=..." },
    { kind: "app-store",  url: "https://apps.apple.com/app/..." },
    { kind: "website",    url: "https://example.com" },
  ],
  images: ["/projects/my-new-app/1.png", "/projects/my-new-app/2.png"],
  tech: ["Flutter", "Firebase"],
  featured: true,                     // also show it on the homepage
  tone: "blue",                       // card colour: blue | green | gray | peach
},
```

The project automatically appears on the homepage (if `featured`), on the portfolio page with search
and filters, and gets its own page at `/work/<slug>`.

### Pictures

Put screenshots in `public/projects/<slug>/` and list them in `images`. The first image is the cover.

- **Mobile apps:** use portrait phone screenshots (e.g. 1080×2340). Without images, a clean phone
  preview with the app's initials is shown.
- **Websites:** use a desktop screenshot (e.g. 1440×900). Without images, a live screenshot of the
  website is loaded automatically, with a clean drawn preview as a fallback.

## Company details

Email, phone, WhatsApp, address, social links, headline numbers and client reviews are all in
**`src/config/site.ts`**. Empty values are hidden on the site.

## Deploy

The easiest option is [Vercel](https://vercel.com): import this GitHub repository and click Deploy.
Every push to `main` then updates the live site automatically.
