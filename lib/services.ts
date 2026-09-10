import {
  Sparkles,
  Radio,
  Globe2,
  Clapperboard,
  Truck,
  Hammer,
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
    items: ["Shooting", "Animation", "Video Editing", "Studio Shoot & Podcast Photoshoot"],
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
      "Construction of Permanent Structure",
      "Brand Merchandising & Shirt Printing",
      "Manpower Deployment",
    ],
    span: "sm",
    media: "services.others",
  },
];
