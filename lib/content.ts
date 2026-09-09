/**
 * Single source of truth for all page copy.
 * Edit here — components read from this file.
 */

export const site = {
  name: "Prashant Phuyal",
  firstName: "Prashant",
  lastName: "Phuyal",
  role: "Co-founder & CEO, Blanxer",
  location: "Kathmandu, Nepal",
  email: "prashant@blanxer.com",
  whatsapp: "+977 9802705557",
  whatsappHref: "https://wa.me/9779802705557",
  tagline: "I help businesses run better with AI and smarter systems.",
  pullQuote: "Four years building what real businesses run on.",
  url: "https://prashantphuyal.com",
};

export const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/__prashantphuyal/",
    icon: "instagram",
  },
  { label: "TikTok", href: "https://www.tiktok.com/@__prashantphuyal", icon: "tiktok" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prashant-phuyal-997a05152/",
    icon: "linkedin",
  },
  { label: "Facebook", href: "https://www.facebook.com/prashant.phuyal.pp", icon: "facebook" },
  { label: "WhatsApp", href: "https://wa.me/9779802705557", icon: "whatsapp" },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
] as const;

/** Floating capability pills around the hero portrait */
export const heroTags = [
  "AI Automation",
  "Ecommerce",
  "Retail & POS",
  "Growth Marketing",
  "Custom Tech",
  "Ops Strategy",
];

export const marquee = [
  "AI Automation",
  "Ecommerce Growth",
  "Process Streamlining",
  "Retail & POS",
  "Custom Tech",
  "Cost Savings",
];

export const heroStats = {
  headline: "1,000+ businesses",
  sub: "run on what I've built",
};

export const heroSecondStat = {
  headline: "4 years",
  sub: "building Blanxer",
};

/** "How I Help" accordion */
export const services = [
  {
    n: "01",
    title: "AI Automation",
    chips: ["AI agents", "Customer support", "Sales in the DMs", "Back-office tasks"],
    body:
      "AI that answers customers at 2am, knows your real stock and prices, and turns a chat into an order. Not a chatbot that annoys people.",
  },
  {
    n: "02",
    title: "Ecommerce & Sales",
    chips: ["Online store", "QR checkout", "Ad funnels", "Channel mix"],
    body:
      "Where your money is leaking, which channels are worth the budget, and how to turn Instagram and TikTok attention into orders you can actually fulfil.",
  },
  {
    n: "03",
    title: "Operations",
    chips: ["Inventory", "Multi-branch", "POS billing", "Staff workflows"],
    body:
      "One system instead of notebooks, WhatsApp groups and spreadsheets. One stock count, so you stop overselling.",
  },
  {
    n: "04",
    title: "Custom Tech",
    chips: ["Tailored builds", "Integrations", "Logistics APIs", "Built to scale"],
    body:
      "When off-the-shelf doesn't fit. Built around the couriers, payments and tools you already use, and made to hold up as you grow.",
  },
  {
    n: "05",
    title: "Advisory",
    chips: ["Build vs buy", "Roadmap", "Tech hiring", "Founder sparring"],
    body:
      "An honest outside opinion from someone who has shipped this stuff here. What to build, what to buy, what to drop.",
  },
];

/** The consultation offer — the primary conversion */
export const offer = {
  eyebrow: "Free consultation",
  title: "Let's find what's slowing you down",
  body:
    "Every week I keep some time free to talk to business owners. We look at how you work today, where time and money go missing, and whether AI would actually help — or wouldn't.",
  who: {
    title: "Who this is for",
    items: [
      "Already trading, not pre-launch",
      "Doing real volume, feeling the strain",
      "Open to changing how things run",
      "Want something built for you, not a template",
    ],
  },
  outcomes: {
    title: "What you get",
    items: [
      "Your biggest bottleneck, named",
      "Where AI would actually save money",
      "A straight build-or-buy answer",
      "Next steps. No pitch deck.",
    ],
  },
};

export const ventures = [
  {
    name: "Blanxer",
    kind: "Commerce OS · 4 years",
    href: "https://www.blanxer.com",
    blurb:
      "Online selling, POS, inventory, payments and delivery — for 1,000+ brands, including Bhatbhateni.",
    points: ["1,000+ businesses", "Web, POS & mobile", "Local payments & couriers"],
    accent: "amber" as const,
  },
  {
    name: "Sambad",
    kind: "Agentic AI Messaging",
    href: "#consult",
    blurb:
      "AI that sells in the DMs. Messenger, Instagram and WhatsApp — real stock, real prices, orders closed in the chat.",
    points: ["Replies 24/7", "Live product data", "Android, iOS & web"],
    accent: "ink" as const,
  },
];

export const aboutParas = [
  "I'm Prashant — co-founder and CEO of Blanxer. For four years I've been building the software businesses actually run on.",
  "My background is ecommerce and marketing, and I'm analytical about both. I care where the numbers come from. That's carried into building AI products like Sambad.",
  "1,000+ businesses use what we've built, from one-shop sellers to Bhatbhateni. So I've seen what breaks, what scales, and what's just expensive noise.",
  "I like meeting people building real things. If that's you, the form below reaches me.",
];

export const aboutFacts = [
  { k: "Based in", v: "Kathmandu, Nepal" },
  { k: "Company", v: "Blanxer Technology Pvt. Ltd." },
  { k: "Building", v: "4 years" },
  { k: "Focus", v: "AI & commerce tech" },
];

/** Factual customer names (from company context) */
export const clients = [
  "Bhatbhateni",
  "DJI Nepal",
  "Oliz Store",
  "LVD",
];

export const metrics = [
  { value: "1,000+", label: "Businesses on board" },
  { value: "4 yrs", label: "Building & shipping" },
  { value: "3", label: "Products shipped" },
  { value: "24/7", label: "AI that never sleeps" },
];

/** ---- Consultation form options ---- */
export const helpOptions = [
  "AI automation",
  "Ecommerce & online sales",
  "Retail / POS operations",
  "Marketing & growth",
  "Custom software build",
  "Not sure yet — need advice",
];

export const companySizeOptions = [
  "10–20 employees",
  "20–50 employees",
  "50–100 employees",
  "100–200 employees",
  "200+ employees",
  "Prefer not to say",
];


/**
 * Hero portrait. Set to the cut-out PNG in /public.
 */
export const portraitSrc: string | null = "/prashant.webp";

export const rotatingBadge = "FREE CONSULTATION • ";
