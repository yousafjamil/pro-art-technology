# Content copied from the live proarttechnology.com (2026-11-25)

Scraped with a headless browser (the plain fetch returns almost no text — the site is JS-rendered).
Kept here in full so nothing is lost before the new site's copy is written for real. Already wired into
the new build: the 3 case studies (`src/data/projects.ts`), company stats, testimonials and contact
details (`src/config/site.ts`). Not yet wired: the brand voice/visual tone, the services list with its
exact tech tags, the process section's copy, the blog posts, and the Arabic text (the old site is
bilingual; the new build is English-only so far).

## Brand voice — important difference from the current sample build

The old site is dark, severe and minimal: "BEYOND ORDINARY.", "ELITE TECH HOUSE / ABU DHABI",
"SEVERITY, NOT DECORATION", all-caps headings, a lot of negative space. The sample I built and showed
you is a light, friendly blue SaaS-agency template — a completely different tone. Worth deciding on
purpose which direction the new site takes rather than drifting into the lighter one by default.

## Hero

> ELITE TECH HOUSE / ABU DHABI
>
> BEYOND ORDINARY.
>
> Software architectures that react, breathe, and scale. Built on severe minimalism and raw engineering.
>
> [Explore Work] [Start Project]
>
> BUILT FOR FOUNDERS, OPERATORS, AND AMBITIOUS TEAMS.
> STRATEGY · DESIGN · ENGINEERING · PRODUCTION

## Our process (§02)

**OUR PROCESS.** Total engineering for products that need to last. We combine strategy, design, and
engineering into a single delivery model.

1. **STRATEGY — Diagnose before design.** We start with the business mechanics. Product direction is
   only useful if it sharpens the thing the company is actually trying to do.
2. **DESIGN — Severity, not decoration.** Interfaces that carry their weight. Every surface earns its
   place or gets cut in the next review.
3. **ENGINEERING — Ship to production.** Not prototypes, not handoffs. Code that holds up under real
   users, real incidents, real scale.

Tags shown under this section: WEB · MOBILE · AI · SAAS · FINTECH · HEALTHCARE

## Case studies (§03) — the only 3 real projects shown on the old site

1. **UNO LUXURY** — E-commerce / Luxury, 2025. Direct-to-consumer luxury marketplace — 100,000+ premium
   items at factory-direct pricing, with secure checkout and verified delivery across the United States.
2. **QUICK SWAPPERS** — Mobile App, 2024. Peer-to-peer swap marketplace where users exchange items
   across categories like vehicles, mobiles, furniture, and home goods.
3. **LMS LOGISTICS SOLUTIONS** — Logistics / Web, 2024. Corporate web platform presenting LMS's
   logistics services — multi-client warehousing, dedicated warehousing, e-commerce fulfillment, and
   value-added services.

(Note: the existing `projects.ts` already had a "Quick Swapper" — a file-transfer utility app, Play
Store link `com.noman.quickSwapper` — and an "LMS Solutions" — described as an education LMS. Both
descriptions were wrong for what the real company's case studies actually are; fixed in `projects.ts`
to match the real copy above. If `com.noman.quickSwapper` is actually a *different*, unrelated app that
happens to share a name, flag it and I'll split them back into two separate projects.)

## Services (§04)

**SERVICES.** End-to-end capabilities that take products from concept to production — and keep them
running at scale.

1. **Web development** — High-performance websites built with Next.js, React, and modern frameworks.
   Fast, accessible, production-ready. *Next.js · React · TypeScript · Tailwind*
2. **Mobile apps** — Native and cross-platform mobile apps for iOS and Android with shared state and
   real-time sync. *Flutter · React Native · Swift · Kotlin*
3. **SaaS platforms** — Full-featured SaaS platforms with dashboards, multi-tenant auth, and enterprise
   architecture. *Golang · Postgres · Redis · K8s*
4. **AI solutions** — Custom AI integrations, chatbots, and machine-learning pipelines with production
   observability. *Python · LangChain · OpenAI · Pinecone*
5. **E-commerce systems** — Full-featured online stores with payment gateways, inventory systems, and
   fulfillment integration. *Shopify · Stripe · Sanity · Algolia*
6. **Custom software** — Tailored solutions, ERP systems, and complex business applications built to
   internal spec. *Node · Go · Rust · gRPC*

## The studio (§05)

Built for founders who move fast. One tight team operating across strategy, design, and engineering.
No layers, no delays — focused delivery from people who understand what it takes to ship.

- Founded: 2018 — Abu Dhabi (active)
- Team size: 12 specialists (+4 YoY)
- Projects shipped: 62 production (↑100%)
- Response SLA: 24h active
- Retention: 83% repeat clients
- Specialization: AI / SaaS / Mobile

"Trusted by" logo strip (read as named, not necessarily confirmed clients — worth asking before
reusing as a literal client list): ADNOC, Etihad Airways, Mubadala, TAMM, Aldar Properties, Masdar,
HUB71, G42.

## Testimonials

1. "ProArt transformed our vision into a product that exceeded every benchmark we set. Exceptional
   precision." — Sarah Al-Mansoori, CTO, Fintrack
2. "The level of engineering precision is rare. They ship fast without cutting corners on quality." —
   James Chen, Founder, Yotto
3. "Working with ProArt felt like having a world-class in-house team from day one. Seamless delivery."
   — Maria Rodriguez, VP Product, MedConnect

## Blog / Insights (§ Insights) — not built yet, no blog exists in the new project

1. **Why Your Next SaaS Product Needs an AI-First Architecture** — Perspective, Mar 2026, 8 min read.
   "The companies embedding intelligence at the foundation will outpace those retrofitting it later."
2. **The Real Cost of Technical Debt in Scaling Startups** — Research, Feb 2026, 12 min read. "What
   founders learn too late about shortcuts — and the quiet interest compounds on every quarter."
3. **Building Systems That Survive the First 10,000 Users** — Engineering, Jan 2026, 15 min read.
   "Architecture patterns for products that need to scale without breaking under load."

## Footer

- Elite tech house building production-grade software from Abu Dhabi. Strategy, design, and
  engineering operating as one system from first brief to production launch.
- Navigate: Work · Services · Studio · Contact
- Connect: LinkedIn · GitHub · X/Twitter · Dribbble (none of these are real links on the old site —
  plain unlinked labels; need the real profile URLs)
- Domains: AI/SaaS · Mobile/Web · Fintech/Health · Custom Software
- hello@proart.tech · Abu Dhabi, UAE
- WhatsApp (floating CTA, bottom of every page): +971 56 587 5034, pre-filled message "مرحباً برو آرت،
  أبغى أناقش مشروع." ("Hi ProArt, I'd like to discuss a project.")
- © 2026 PROART TECHNOLOGY. ALL RIGHTS RESERVED. · Privacy Policy · "BUILT IN ABU DHABI"

## Privacy Policy page (full text, English)

Pro Art Technology FZE respects your privacy and is committed to protecting the personal information
you provide when using our website, applications, software platforms, and technology services.

Last updated: July 30, 2026

**1. Information we collect** — Full name, email address, phone number, company name, project and
service requirements, billing and transaction information, messages and inquiries submitted through
our website, technical information such as IP address, browser type, device type, and website usage
data.

**2. How we use your information** — Respond to inquiries and quotation requests; provide software
development, maintenance, hosting, and consultancy services; manage client projects and accounts;
process payments and issue invoices; provide customer and technical support; improve our website,
applications, and services; send service updates and marketing communications, where permitted;
comply with applicable legal and regulatory requirements.

**3. Sharing of information** — We do not sell or rent your personal information. We may share
information with trusted service providers when necessary to operate our business, including: cloud
hosting providers, payment gateway providers, communication and email service providers, analytics and
security service providers, government or regulatory authorities when legally required. These
providers may only use the information for the services they provide to us.

**4. Data security** — We use reasonable technical and organizational measures to protect personal
information from unauthorized access, loss, misuse, alteration, or disclosure. However, no website,
online platform, or electronic transmission method can be guaranteed to be completely secure.

**5. Cookies** — Our website may use cookies and similar technologies to improve functionality,
understand website usage, remember user preferences, and measure performance. Users may disable
cookies through their browser settings, although some website features may not function properly.

**6. Data retention** — We retain personal information only for as long as necessary to provide our
services, meet contractual obligations, resolve disputes, maintain business records, and comply with
legal requirements.

**7. Third-party links** — Our website or applications may contain links to third-party websites or
services. Pro Art Technology FZE is not responsible for the privacy practices, security, or content of
third-party platforms.

**8. Your rights** — Depending on applicable law, you may request to: access your personal
information, correct inaccurate information, request deletion of your information, withdraw consent
for marketing communications, ask how your information is being used. Requests may be subject to
legal, contractual, and regulatory limitations.

**9. Children's privacy** — Our services are not intentionally directed to children unless they are
provided as part of a client project with appropriate authorization and legal safeguards. We do not
knowingly collect personal information from children without the required consent.

**10. Changes to this privacy policy** — We may update this Privacy Policy from time to time. Any
updates will be published on this page with a revised "Last Updated" date.

**11. Contact us** — For privacy-related questions or requests, please contact: Pro Art Technology FZE,
www.proarttechnology.com, Sharjah, United Arab Emirates.

(Note the legal entity's address here says **Sharjah**, while the site's own footer/hero say
**Abu Dhabi** — worth confirming which is the real registered address before reusing either.)

## Arabic text (homepage, as published — for a future bilingual build)

```
برو آرت.
قصتنا · حلولنا · شركاء النجاح · قهوة ومعلومة؟

من قلب أبوظبي.. نصنع المستقبل التقني

نبني لك أكثر من مجرد كود.

هندسة برمجية "تتنفس" وتنمو معك. صممنا كل تفصيلة ببساطة متناهية وحرفية تليق بطموحك الكبير.

شوف وش سوينا · يلا نبدأ؟

مكان المبدعين، المؤسسين، والفرق اللي تبي توصل بعيد.
تفكير صح · تصميم ذكي · هندسة بطلة · نتائج ملموسة

§02 طريقتنا — كيف نحول فكرتك لواقع؟
مانحب التعقيد. ندمج التخطيط بالتصميم بالهندسة في قالب واحد يضمن لمنتجك الاستمرار والنمو.

01 التخطيط — نفهمك قبل ما نبدأ
نجلس معك ونفهم جوهر بزنسك. التقنية ماتفيد إذا ما كانت تخدم هدفك الحقيقي وتزيد أرباحك.

02 التصميم — بساطة تفتح النفس
واجهات مريحة، سهلة، وكل زر فيها له هدف. هدفنا المستخدم يحب منتجك من أول نظرة.

03 الهندسة — كود يشد الظهر
مانبني نماذج للتجربة بس، نبني أنظمة برمجية قوية تتحمل آلاف المستخدمين وتشتغل بلمح البصر.

§03 فخورين فيهم — قصص نجاح
هذي مو مجرد مشاريع، هذي أحلام صارت واقع برقم كود.. وكلها شغالة اليوم بأعلى كفاءة.

01 تجارة إلكترونية / فاخر — يونو لاكشري (UNO LUXURY)
متجر فاخر مباشر للمستهلك — أكثر من 100,000 منتج ممتاز بأسعار من المصنع مباشرة، مع دفع آمن وتوصيل موثّق عبر الولايات المتحدة. (2025)

02 تطبيق جوال — كويك سوابرز (QUICK SWAPPERS)
سوق لتبادل الأغراض بين الأفراد عبر فئات السيارات، الجوالات، الأثاث، ومستلزمات المنزل. (2024)

03 لوجستيات / ويب — LMS لحلول اللوجستيات
منصة ويب مؤسسية تعرض خدمات LMS اللوجستية — مستودعات متعددة العملاء، مستودعات مخصصة، تنفيذ التجارة الإلكترونية، والخدمات المضافة. (2024)

§04 وش نقدم لك؟ — حلولنا
من الفكرة لين الإطلاق.. حنا معك خطوة بخطوة عشان منتجك ينجح ويستمر.

01 مواقع الويب — مواقع سريعة جداً، تفتح من أي جهاز، ومصممة بأحدث تقنيات العالم. (Next.js, React, TypeScript)
02 تطبيقات الجوال — تطبيقات آيفون وأندرويد تجذب المستخدم وتسهل عليه حياته، مع مزامنة لحظية. (Flutter, React Native, Swift)
03 أنظمة SAAS — نبني لك منصتك الخاصة بلوحات تحكم ذكية وإدارة كاملة لعملائك. (Golang, Postgres, K8S)
04 الذكاء الاصطناعي — نخلي منتجك "ذكي" فعلاً.. بأدوات تحلل البيانات وتساعدك تاخذ قرارات أفضل. (Python, OpenAI, Pinecone)
05 التجارة الإلكترونية — متاجر تبيع لك وأنت نايم.. متكاملة مع الدفع والشحن والمخازن. (Shopify, Stripe, Algolia)
06 برمجيات خاصة — عندك فكرة غريبة ومحد سواها؟ حنا نفصلها لك بالمقاس. (Node, Go, Rust)

§05 عالمنا — صُنع للمؤسسين اللي يحبون الإنجاز
فريق واحد، هدف واحد، ونتيجة وحدة: منتج تقني يرفع الراس. ما عندنا بيروقراطية ولا تأخير، عندنا شغل يخلص.

بدايتنا: 2018 — أبوظبي (مستمرين)
الفريق: 12 خبير (نكبر كل يوم)
مشاريع اكتملت: 62 منتج (بأعلى جودة)
سرعة الرد: خلال 24 ساعة (جاهزين)
شركاء دايمين: 83% شركاء دائمين (ثقة متبادلة)
تخصصنا: ذكاء اصطناعي و SaaS

شركاء (شريط الشعارات): أدنوك، الاتحاد للطيران، مبادلة، TAMM، الدار، مصدر، HUB71، G42

قالوا عنا:
"برو آرت مو مجرد مبرمجين، هم شركاء حقيقيين خافوا على مشروعي كأنه حقهم." — سارة المنصوري، المديرة التقنية، FINTRACK
"الدقة في المواعيد والجودة في الكود خلتنا نعتمد عليهم في كل مشاريعنا الجاية." — جيمس تشن، مؤسس YOTTO
"توقعت شغل ممتاز، بس اللي شفته كان إبداع فاق كل التوقعات." — ماريا رودريغيز، نائبة الرئيس، MEDCONNECT

§ مدونتنا — أفكار تفيدك
نكتب عن تجاربنا في التقنية، الهندسة، وكيف تبني منتج ينجح في السوق.

- ليش منتجك الجاي لازم يعتمد على الذكاء الاصطناعي؟ (توقعات، مارس 2026، 8 د قراءة)
- الديون التقنية: الوحش اللي يهدد الشركات الناشئة (خبرة، فبراير 2026، 12 د قراءة)
- كيف تضمن سيستمك ما يطيح وقت الزحمة؟ (هندسة، يناير 2026، 15 د قراءة)

جاهز؟ خلنا نبدع سوى.

برو آرت. بيت الخبرة التقنية في أبوظبي. نبني لك برمجيات تعيش معك وتكبر مع طموحك. من الفكرة لين يلمس
منتجك يد مستخدمك الأول.

ابدأ مشروعك الحين · تصفح الموقع: أعمالنا · خدماتنا · قصتنا · تواصل
تابعنا: LinkedIn · GitHub · X · Dribbble
وش نعرف؟ SaaS وذكاء اصطناعي · تطبيقات ومواقع · تقنية مالية · حلول خاصة
hello@proart.tech · أبوظبي، الإمارات العربية المتحدة
© 2026 برو آرت تكنولوجي. كل الحقوق محفوظة لأصحاب الطموح. · سياسة الخصوصية · صُنع بحب في ◆ أبوظبي
عندك مشروع؟ كلمنا. (زر واتساب)
```
