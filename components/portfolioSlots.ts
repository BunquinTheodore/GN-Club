// object-cover art-direction overrides, keyed by lib/media.ts slot. Only
// slots where a blind center crop loses the subject at both the short/wide
// grid-tile shape and the wider aspect-video dialog shape need an entry —
// most of these are wide concert/crowd photos that center-crop fine as-is.
export const slotPosition: Record<string, string> = {
  // Group photo: heads (including the back row, flush with the top edge)
  // sit in the top ~60% of a 16:9 frame. The grid tile is much wider than
  // 16:9, so a center crop trims enough off the top to cut into hair/heads.
  "pickleball.1": "center 20%",
};
