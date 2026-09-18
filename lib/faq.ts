export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Placeholder FAQ copy — swap in GN Club's real answers (pricing ranges,
 * lead times, service area specifics, etc.) once available.
 */
export const faq: FaqItem[] = [
  {
    question: "What kind of events does GN Club take on?",
    answer:
      "Mostly activations, conferences, product launches, and community events for tech and Web3 brands, anywhere from a single day activation to a multi day convention presence.",
  },
  {
    question: "Do you handle everything in house, or do you subcontract?",
    answer:
      "We plan, build, staff, and run events ourselves rather than brokering the work out. The same team that designs the stage also runs the livestream and the on ground crew.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "It depends on scope. A small activation can come together in a few weeks, but a multi day production benefits from a longer lead time. Reach out early and we'll scope it together.",
  },
  {
    question: "Can you support events outside the Philippines?",
    answer:
      "Yes, we've run regional roadshows across multiple cities and support hybrid/online production for audiences anywhere.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "We start with a brief, scope the production plan and budget together, then handle everything through setup, run of show, and strike, with one team accountable end to end.",
  },
];
