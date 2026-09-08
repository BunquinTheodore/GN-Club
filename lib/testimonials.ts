export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/**
 * Placeholder quotes — swap in real client testimonials as they come in.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "GN Club ran our launch like they'd been doing it for that brand for years. Zero handoffs, zero surprises on the day.",
    name: "Maria Santos",
    role: "Head of Marketing, Neon Labs",
  },
  {
    quote:
      "We needed a hybrid event that felt as good online as it did in the room. They built both at once, not as an afterthought.",
    name: "James Cruz",
    role: "Community Lead, Chainlink Meetup Manila",
  },
  {
    quote:
      "The kind of team you call once and then just keep calling. Production, logistics, livestream — all one point of contact.",
    name: "Andrea Reyes",
    role: "Founder, Studio One",
  },
];
