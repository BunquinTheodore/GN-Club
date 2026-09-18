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

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: string[];
  /** relative sizing hint for the bento grid */
  span: "lg" | "md" | "sm";
  media: string;
  /** Short line shown under the title on the /services/[slug] detail page. */
  tagline?: string;
  /** Longer-form descriptive paragraphs for the detail page. */
  overview?: string[];
  /** Short numbered process/steps list for the detail page. */
  process?: ServiceProcessStep[];
  /** lib/media.ts keys for the detail page's photo gallery. */
  gallery?: string[];
};

export const services: Service[] = [
  {
    slug: "activations-and-events",
    title: "Activations and Events",
    blurb:
      "On ground experiences built to move a crowd, from a single product reveal to a multi day convention.",
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
    tagline:
      "Product reveals, conventions, roadshows, and everything in between — planned, built, staffed, and run in house.",
    overview: [
      "Activations and Events is the widest service GN Club runs, and the one most tech and Web3 brands come to us for first. It covers a flagship convention booth, a single night product launch, a trading competition floor, a press and influencer event, a multi city roadshow, or a full scale concert or consumer trade show. Whatever the format, the work is the same: a site or venue turned into a branded environment that a crowd actually moves through, on a schedule that holds.",
      "Because we plan, build, staff, and run every activation ourselves, there's one team accountable from the layout sketch to the last teardown truck — not a chain of vendors handing off risk to each other. That's what lets us take on the events other production houses turn down: a conference hall that needs full fit out overnight, a roadshow that hits three cities in a week, or a launch where the run of show has to survive last minute changes from the client's side.",
    ],
    process: [
      {
        title: "Brief and site walk",
        description:
          "We take the format, audience size, and venue (or shortlist of venues) and map out what the space needs to become — floor plan, flow, and the moments that need to land.",
      },
      {
        title: "Design and build plan",
        description:
          "Layout, staging, branding, and run of show get locked, with our own build and fabrication teams scoped in alongside AV, staffing, and logistics.",
      },
      {
        title: "Load in and rehearsal",
        description:
          "Our crews build on site, cue the run of show, and walk it once before doors open so the team running it has already seen it happen.",
      },
      {
        title: "Live run and teardown",
        description:
          "Our own staff run the floor for the duration of the event, then strike and clear the venue on the agreed schedule.",
      },
    ],
    gallery: ["services.activations", "services.activations.gallery.2", "services.activations.gallery.3"],
  },
  {
    slug: "online-events",
    title: "Online Events",
    blurb: "Studio grade virtual production for audiences who never leave their seat.",
    icon: Radio,
    items: ["3D Virtual Production and Management", "Live/Prerecorded Streaming", "Hybrid Event"],
    span: "md",
    media: "services.online",
    tagline: "A studio and a control room behind every livestream, hybrid session, and virtual set.",
    overview: [
      "Online Events covers the productions where the audience is watching through a screen instead of standing in a room — a livestream, a prerecorded broadcast cut and released on schedule, a hybrid event running a stage and a stream in parallel, or a session built entirely in a 3D virtual set. For Web3 and tech clients whose communities are spread across time zones and platforms, this is often the primary format, not a backup for when travel isn't possible.",
      "We run this the same way we run a physical activation: in house, from virtual set design and 3D production management through the live switch and stream delivery. A hybrid event gets a single production team managing both the in room stage and the remote feed, so the two don't drift out of sync — the stream sees what the room sees, cued off the same run of show.",
    ],
    process: [
      {
        title: "Format and platform scope",
        description: "We define whether the session is fully virtual, prerecorded, or hybrid, and which platforms it needs to reach.",
      },
      {
        title: "Virtual set or stage build",
        description: "3D environments get built and tested, or the physical stage gets rigged for camera and stream alongside the in room audience.",
      },
      {
        title: "Live production and streaming",
        description: "Our crew runs camera, switch, and stream delivery through the session, managing both the room and the remote feed in real time.",
      },
      {
        title: "Delivery and edit",
        description: "Recordings get pulled, edited, and handed back on the agreed turnaround for reuse or archiving.",
      },
    ],
    gallery: ["services.online", "services.online.gallery.2", "services.online.gallery.3"],
  },
  {
    slug: "digital",
    title: "Digital",
    blurb: "The web, app, and marketing layer behind every activation.",
    icon: Globe2,
    items: ["Website development", "Digital marketing", "App design and development", "Augmented reality"],
    span: "md",
    media: "services.digital",
    tagline: "The website, app, and marketing work that carries an activation before and after the event day.",
    overview: [
      "Digital is where the event stops being a single day and becomes a campaign. This covers the website that sells tickets and holds the agenda, the app that guests use on site, the digital marketing that fills the room in the first place, and augmented reality builds that extend a booth or launch beyond what's physically on the floor. It's the layer most agencies bolt on from outside — we run it alongside the physical build because the two are describing the same event.",
      "That proximity matters most in the run up and the aftermath: a landing page that needs to reflect a last minute lineup change the same day a floor plan changes, or an AR activation that has to match the physical booth it's tied to down to the branding. Having the digital team sit next to the event team means those changes move once, not twice.",
    ],
    process: [
      {
        title: "Scope the digital surface",
        description: "We map which pieces the event needs — site, app, campaign, AR — against the activation timeline it has to support.",
      },
      {
        title: "Design and build",
        description: "Our own developers and designers build the site, app, or AR experience, keeping it tied to the physical event's branding and schedule.",
      },
      {
        title: "Campaign and launch",
        description: "Digital marketing runs in the lead up to drive registration or awareness, timed against the physical event's own milestones.",
      },
      {
        title: "Live support and wrap",
        description: "The digital layer stays live and monitored through the event, then gets handed off or archived once it's done.",
      },
    ],
    gallery: ["services.digital", "services.digital.gallery.2", "services.digital.gallery.3"],
  },
  {
    slug: "video-production",
    title: "Video Production",
    blurb: "Capturing and cutting the story while it's still happening — from live coverage to a dedicated studio shoot.",
    icon: Clapperboard,
    items: ["Shooting", "Same Day Edit", "Animation", "Video Editing", "Photo Ops"],
    span: "sm",
    media: "services.video",
    tagline: "Cameras rolling before the crowd arrives, cuts delivered before they've left.",
    overview: [
      "Video production at GN Club runs alongside the event, not after it. A shoot crew covers stage moments, reactions, and b roll while the room is live, and an editor is already cutting on site so a recap or highlight reel can go out the same day instead of a week later. This applies across shooting, same day edit, animation, general video editing, and photo ops — all run in house with our own crew and equipment, no outside production house brought in to cover a gap.",
      "Because the crew is the same one running the rest of the event, coverage plans get built into the run of show instead of bolted on afterward: camera positions that don't block sightlines, an edit bay that doesn't need a separate power or network drop, and a shot list that already accounts for the keynote, the booth activity, and the candid moments in between. Animation work — explainer cuts, title cards, motion graphics for a stage screen — gets scoped the same way a shoot does, against what the event actually needs on screen, not a generic template.",
    ],
    process: [
      {
        title: "Coverage plan",
        description: "We walk the run of show and agenda to map what needs a camera, what needs a same day cut, and what's a photo op moment versus a b roll moment.",
      },
      {
        title: "Crew and gear on site",
        description: "Shooters, an on site editor, and any animation or graphics work get scheduled against the actual event clock, not a separate production timeline.",
      },
      {
        title: "Live shoot and same day edit",
        description: "Footage is captured and cut in parallel during the event, so a recap or social clip can be reviewed and released before the venue empties out.",
      },
      {
        title: "Delivery",
        description: "Final cuts, raw selects, and photo op assets are handed off in the formats the brand actually needs — social, internal recap, or sponsor deliverables.",
      },
    ],
    gallery: ["services.video", "services.video.gallery.2", "services.video.gallery.3"],
  },
  {
    slug: "logistics",
    title: "Logistics",
    blurb: "The quiet infrastructure that keeps an event on schedule.",
    icon: Truck,
    items: ["Data Processing", "Corporate Courier Servicing"],
    span: "sm",
    media: "services.logistics",
    tagline: "The backend work nobody sees, running so the front of house never stalls.",
    overview: [
      "Logistics at GN Club covers the two things that quietly break events when they're not handled: data and physical movement. Data processing means every registration, badge scan, lead capture form, and attendee list gets managed with a clean pipeline in and out, so the numbers a client asks for mid event or after are actually accurate. Corporate courier servicing means getting materials, signage, equipment, and documents to and from a venue on schedule, without depending on a client's own staff to shuttle boxes across town.",
      "This is deliberately unglamorous work, and that's the point — it's infrastructure, not a showcase. A trading competition or a multi day convention generates a constant stream of lists, printed materials, and last minute item runs, and having that handled by the same team running the event means fewer handoffs and fewer things that fall through the cracks between vendors.",
    ],
    process: [
      {
        title: "Scope the flow",
        description: "We map what data needs to move (registrations, leads, badges) and what physical items need to move (signage, kits, equipment) before the event date.",
      },
      {
        title: "Set up processing",
        description: "Data pipelines and courier routes are built against the actual event schedule, including cutoffs for last minute changes.",
      },
      {
        title: "Run it live",
        description: "During the event, data gets processed in real time and courier runs happen on a set schedule, not on an ad hoc basis.",
      },
      {
        title: "Reconcile and hand off",
        description: "Final attendee and lead data, plus any returned materials, are reconciled and delivered back to the client in a usable format.",
      },
    ],
    gallery: ["services.logistics", "services.logistics.gallery.2", "services.logistics.gallery.3"],
  },
  {
    slug: "others",
    title: "Fabrication & Build",
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
    tagline: "Build it, permit it, staff it, book it — the parts an event stands on.",
    overview: [
      "This is fabrication and build in the fullest sense: physical fabrication and booth builds, construction of permanent structures, the permit and LGU coordination that lets any of it legally happen, the manpower to staff it, and the speaker booking that fills the stage. It's the category that covers everything an event needs to physically exist, get approved, get staffed, and get remembered after the last day — booth structures for a trade show floor, a permanent installation that outlives the event, or the paperwork trail with local government that keeps a build from getting shut down mid setup.",
      "Permits and LGU coordination in particular is work that's easy to underestimate until it's missing — a booth or structure without the right sign offs doesn't go up on schedule, no matter how good the build is. Manpower deployment and speaker booking round this out on the people side: crew to run the floor and talent to fill the program, sourced and confirmed the same way the physical build is — directly, without a chain of subcontractors between the client and the people actually showing up.",
    ],
    process: [
      {
        title: "Define the build",
        description: "We scope what needs to be fabricated or constructed, whether it's a booth, a temporary structure, or something permanent.",
      },
      {
        title: "Clear the permits",
        description: "LGU coordination and permitting are handled up front, against the real timeline of the build, so approvals aren't the thing holding up install.",
      },
      {
        title: "Build and staff",
        description: "Fabrication happens in parallel with manpower deployment and any speaker booking, so the physical space and the people in it are ready together.",
      },
      {
        title: "Install and stand up",
        description: "Structures go up on site, crew is briefed and in place, and speakers are confirmed and ready before doors open.",
      },
    ],
    gallery: ["services.others", "services.others.gallery.2", "services.others.gallery.3"],
  },
  {
    slug: "studio-and-podcast",
    title: "Studio & Podcast Production",
    blurb: "A dedicated studio space for brand shoots, podcast recording, and photoshoot sessions.",
    icon: Podcast,
    items: ["Studio Shoot", "Podcast Recording & Photoshoot"],
    span: "md",
    media: "services.studio",
    tagline: "A room built for record, not rented for a day.",
    overview: [
      "Studio & Podcast Production covers everything that happens inside four controlled walls: brand shoots that need consistent light and a clean backdrop, podcast recording for a host and their guests, and photoshoot sessions for product or portrait work. Because GN Club runs this in house alongside the rest of its event operation, a studio booking can sit on its own or plug straight into a bigger activation — same crew, same gear inventory, no handoff between vendors.",
      "Studio Shoot covers the space and setup: lighting, backdrop, and camera position built around what's being shot, whether that's a talking head interview, a product table, or a full brand campaign day. Podcast Recording & Photoshoot pairs multi mic audio capture with a photo pass in the same session, so a brand walks out with an episode and a set of stills without booking two separate days.",
    ],
    process: [
      {
        title: "Brief",
        description: "Walk through the format — brand shoot, podcast episode, or photoshoot — and lock the shot list, guest count, and run of show.",
      },
      {
        title: "Set",
        description: "Lighting, backdrop, and mic setup are built to the brief before anyone walks in, so the session starts on time.",
      },
      {
        title: "Record",
        description: "Studio Shoot and Podcast Recording & Photoshoot run with a crew present the whole time, not just for setup and teardown.",
      },
      {
        title: "Handoff",
        description: "Raw footage, audio, and stills are delivered for the brand's own editing team or GN Club's Video Production service to cut.",
      },
    ],
    gallery: ["services.studio", "services.studio.gallery.2", "services.studio.gallery.3"],
  },
  {
    slug: "brand-merchandising",
    title: "Brand Merchandising",
    blurb: "Custom apparel and shirt printing to put a brand on every attendee.",
    icon: Shirt,
    items: ["Custom Merch Design", "Shirt Printing", "Bulk Fulfillment"],
    span: "md",
    media: "services.merch",
    tagline: "Put the brand on people, not just on a screen.",
    overview: [
      "Brand Merchandising is the physical layer of a brand's presence at an event — shirts, giveaways, and staff uniforms that attendees actually take home and wear again. It starts with Custom Merch Design, turning a brand's identity into something that works printed on fabric, then moves through Shirt Printing for production and Bulk Fulfillment to get finished merch to a venue, a booth, or a warehouse on schedule.",
      "This service exists because merch orders have a habit of showing up late or wrong when they're handled by a separate print shop with no stake in the event date. Running design, printing, and fulfillment under the same roof as the rest of GN Club's event production means the merch timeline is tied to the event timeline, not a separate vendor's queue.",
    ],
    process: [
      {
        title: "Design",
        description: "Custom Merch Design takes the brand's logo and colors and works out what actually prints well at the intended quantity and garment type.",
      },
      {
        title: "Sample",
        description: "A proof or physical sample is signed off before the full run goes to print, so there are no surprises at scale.",
      },
      {
        title: "Print",
        description: "Shirt Printing runs the approved design across the full order quantity.",
      },
      {
        title: "Fulfill",
        description: "Bulk Fulfillment sorts, packs, and delivers merch to the venue or distribution point ahead of the event date.",
      },
    ],
    gallery: ["services.merch", "services.merch.gallery.2", "services.merch.gallery.3"],
  },
];
