export type TeamMember = {
  name: string;
  role: string;
  initials: string;
};

/**
 * Roles are placeholder titles carried over from the previous roster until
 * real ones are confirmed — swap in real titles and (ideally) headshots
 * once available. TeamGrid renders `initials` as an avatar until then.
 */
export const team: TeamMember[] = [
  { name: "Carl Harvey Derez", role: "Founder & Executive Producer", initials: "CD" },
  { name: "Mark Denzel Delgado", role: "Head of Production", initials: "MD" },
  { name: "Jops Santos", role: "Technical Director", initials: "JS" },
  { name: "Edricka Meldane", role: "Client Partnerships", initials: "EM" },
  { name: "Kim Joshua Delos Reyes", role: "Creative Director", initials: "KD" },
];
