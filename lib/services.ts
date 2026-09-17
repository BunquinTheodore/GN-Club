import {
  Sparkles,
  Radio,
  Globe2,
  Clapperboard,
  Truck,
  Hammer,
  Shirt,
  Podcast,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: string[];
  /** relative sizing hint for the bento grid */
  span: "lg" | "md" | "sm";
  media: string;
};

export const services: Service[] = [
  {
    slug: "activations-and-events",
    title: "Activations and Events",
    blurb:
      "On-ground experiences built to move a crowd, from a single product reveal to a multi-day convention.",
    icon: Sparkles,
    items: [
      "Various Activations",
      "Flagship Tech Events",
      "Trading Competitions",
      "Running Events",
      "Concerts",
      "Consumer & Trade Shows",
      "Conventions",
      "Product Launches",
      "Press and Influencer Events",
      "Parties",
      "Roadshow Presentations",
    ],
    span: "lg",
    media: "services.activations",
  },
  {
    slug: "online-events",
    title: "Online Events",
    blurb: "Studio-grade virtual production for audiences who never leave their seat.",
    icon: Radio,
    items: ["3D Virtual Production and Management", "Live/Pre-Recorded Streaming", "Hybrid Event"],
    span: "md",
    media: "services.online",
  },
  {
    slug: "digital",
    title: "Digital",
    blurb: "The web, app, and marketing layer behind every activation.",
    icon: Globe2,
    items: ["Website development", "Digital marketing", "App design and development", "Augmented reality"],
    span: "md",
    media: "services.digital",
  },
  {
    slug: "video-production",
    title: "Video Production",
    blurb: "Capturing and cutting the story while it's still happening — from live coverage to a dedicated studio shoot.",
    icon: Clapperboard,
    items: ["Shooting", "Same-Day Edit", "Animation", "Video Editing", "Photo Ops"],
    span: "sm",
    media: "services.video",
  },
  {
    slug: "logistics",
    title: "Logistics",
    blurb: "The quiet infrastructure that keeps an event on schedule.",
    icon: Truck,
    items: ["Data Processing", "Corporate Courier Servicing"],
    span: "sm",
    media: "services.logistics",
  },
  {
    slug: "others",
    title: "Others",
    blurb: "Everything an event needs to physically exist and be remembered after.",
    icon: Hammer,
    items: [
      "Fabrication",
      "Booth Fabrication",
      "Construction of Permanent Structure",
      "Permits & LGU Coordination",
      "Manpower Deployment",
      "Speaker Booking",
    ],
    span: "sm",
    media: "services.others",
  },
  {
    slug: "studio-and-podcast",
    title: "Studio & Podcast Production",
    blurb: "A dedicated studio space for brand shoots, podcast recording, and photoshoot sessions.",
    icon: Podcast,
    items: ["Studio Shoot", "Podcast Recording & Photoshoot"],
    span: "md",
    media: "services.studio",
  },
  {
    slug: "brand-merchandising",
    title: "Brand Merchandising",
    blurb: "Custom apparel and shirt printing to put a brand on every attendee.",
    icon: Shirt,
    items: ["Custom Merch Design", "Shirt Printing", "Bulk Fulfillment"],
    span: "md",
    media: "services.merch",
  },
];
