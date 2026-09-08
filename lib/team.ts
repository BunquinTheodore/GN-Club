export type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

/**
 * Placeholder roster — swap in real names, roles, and (ideally) headshots
 * once available. TeamGrid renders `initials` as an avatar until then.
 */
export const team: TeamMember[] = [
  { name: "Gab Navarro", role: "Founder & Executive Producer", initials: "GN" },
  { name: "Lex Aquino", role: "Head of Production", initials: "LA" },
  { name: "Rian Mercado", role: "Technical Director", initials: "RM" },
  { name: "Dani Ocampo", role: "Client Partnerships", initials: "DO" },
  { name: "Kai Villaruel", role: "Creative Director", initials: "KV" },
  { name: "Sam Bautista", role: "Logistics Lead", initials: "SB" },
];
