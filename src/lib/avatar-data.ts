// AvatarArchive — fan-made data for the Avatar universe.
// All content is fan-created reference material, not official.

export type ElementId = "air" | "water" | "earth" | "fire" | "spirit" | "none";

export interface ElementInfo {
  id: ElementId;
  name: string;
  color: string; // hex accent
  glow: string; // rgba glow
  season: string;
  direction: string;
  philosophy: string;
  description: string;
  subSkills: string[];
  nations: string[];
  notableBenders: string[];
}

export const ELEMENTS: ElementInfo[] = [
  {
    id: "water",
    name: "Water",
    color: "#2da6f4",
    glow: "rgba(45,166,244,0.45)",
    season: "Winter",
    direction: "North",
    philosophy: "Adaptability & healing",
    description:
      "Waterbenders draw power from the moon and ocean spirits, bending the fluid element to heal, defend, and strike. Their style flows between gentle redirection and crushing waves, mirroring the push and pull of the tides.",
    subSkills: ["Healing", "Bloodbending", "Plantbending", "Ice & steam shaping"],
    nations: ["Northern Water Tribe", "Southern Water Tribe", "Foggy Swamp Tribe"],
    notableBenders: ["Katara", "Pakku", "Hama", "Korra", "Ming-Hua"],
  },
  {
    id: "earth",
    name: "Earth",
    color: "#7cb342",
    glow: "rgba(124,179,66,0.45)",
    season: "Spring",
    direction: "East",
    philosophy: "Endurance & strength",
    description:
      "Earthbenders stand their ground, channeling the stubborn strength of stone and soil. Rooted and resolute, they listen to the vibrations of the earth — waiting, absorbing, and answering with overwhelming force.",
    subSkills: ["Metalbending", "Sandbending", "Seismic sense", "Lavabending"],
    nations: ["Earth Kingdom", "Ba Sing Se", "Zaofu"],
    notableBenders: ["Toph Beifong", "Bolin", "Lin Beifong", "Suyin Beifong", "Kyoshi"],
  },
  {
    id: "fire",
    name: "Fire",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.45)",
    season: "Summer",
    direction: "South",
    philosophy: "Power & drive",
    description:
      "Firebenders wield the breath of the dragon, drawing energy from the sun. Their discipline channels raw, living heat into searing offense and controlled bursts — a bending art that demands both restraint and conviction.",
    subSkills: ["Lightning generation", "Lightning redirection", "Combustionbending", "Flight"],
    nations: ["Fire Nation", "Sun Warriors"],
    notableBenders: ["Zuko", "Iroh", "Azula", "Ozai", "Mako"],
  },
  {
    id: "air",
    name: "Air",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.45)",
    season: "Autumn",
    direction: "West",
    philosophy: "Freedom & peace",
    description:
      "Airbenders embody detachment and movement, riding currents of wind with serene agility. Their circular, evasive techniques turn an opponent's momentum against them — non-violent in spirit, untouchable in practice.",
    subSkills: ["Flight", "Spiritual projection", "Air scooter", "Suffocation"],
    nations: ["Air Nomads", "Air Temple Island", "Northern Air Temple"],
    notableBenders: ["Aang", "Tenzin", "Jinora", "Zaheer", "Yangchen"],
  },
];

export interface Series {
  id: string;
  title: string;
  short: string;
  years: string;
  element: ElementId;
  episodes: number;
  seasons: string[];
  synopsis: string;
  accent: string; // hex
  tagline: string;
}

export const SERIES: Series[] = [
  {
    id: "atla",
    title: "Avatar: The Last Airbender",
    short: "ATLA",
    years: "2005 – 2008",
    element: "air",
    episodes: 61,
    seasons: ["Book 1: Water", "Book 2: Earth", "Book 3: Fire"],
    synopsis:
      "A 12-year-old boy frozen in an iceberg for a century awakens as the last Airbender and the Avatar — the one person who can master all four elements and end the Fire Nation's hundred-year war.",
    accent: "#f59e0b",
    tagline: "The boy who was lost in time.",
  },
  {
    id: "korra",
    title: "The Legend of Korra",
    short: "Korra",
    years: "2012 – 2014",
    element: "water",
    episodes: 52,
    seasons: ["Book 1: Air", "Book 2: Spirits", "Book 3: Change", "Book 4: Balance"],
    synopsis:
      "Seventy years after Aang's war, the next Avatar — a headstrong Waterbender named Korra — faces a modernizing world that questions whether the Avatar is still needed.",
    accent: "#2da6f4",
    tagline: "The Avatar in a world that moved on.",
  },
  {
    id: "live",
    title: "Avatar: The Last Airbender (Live Action)",
    short: "Netflix",
    years: "2024 – present",
    element: "fire",
    episodes: 8,
    seasons: ["Season 1", "Season 2 (filming)"],
    synopsis:
      "A big-budget live-action reimagining of the original animated series, retelling Aang's journey across a re-created Four Nations with new set-pieces and expanded character beats.",
    accent: "#ef4444",
    tagline: "The legend, reforged in live action.",
  },
  {
    id: "film2026",
    title: "Aang: The Last Airbender",
    short: "2026 Film",
    years: "October 9, 2026",
    element: "air",
    episodes: 1,
    seasons: ["Theatrical · Paramount+"],
    synopsis:
      "The first animated Avatar theatrical film in over a decade, following Aang and his friends in a new adventure after the events of the original series.",
    accent: "#f59e0b",
    tagline: "The Avatar returns to the big screen.",
  },
  {
    id: "film2010",
    title: "The Last Airbender (2010)",
    short: "2010 Film",
    years: "2010",
    element: "earth",
    episodes: 1,
    seasons: ["Live-action feature"],
    synopsis:
      "M. Night Shyamalan's live-action film adaptation that condensed the first Book of the animated series into a single feature — widely regarded as a cautionary tale of adaptation.",
    accent: "#7cb342",
    tagline: "The adaptation fans would rather forget.",
  },
];

export interface Character {
  id: string;
  name: string;
  element: ElementId;
  role: string;
  affiliation: string;
  series: string[];
  firstAppearance: string;
  description: string;
  voicedBy: string;
  quote: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "aang",
    name: "Aang",
    element: "air",
    role: "The Avatar",
    affiliation: "Air Nomads",
    series: ["ATLA", "Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "A fun-loving 12-year-old monk and the last surviving Airbender, awakened from a century in the ice. Burdened with being the Avatar, he seeks to restore balance without abandoning his pacifist heart.",
    voicedBy: "Zach Tyler Eisen",
    quote: "When we hit our lowest point, we are open to the greatest change.",
  },
  {
    id: "katara",
    name: "Katara",
    element: "water",
    role: "Waterbending Master",
    affiliation: "Southern Water Tribe",
    series: ["ATLA", "Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "The last Waterbender of the Southern Tribe and the group's heart. Determined, nurturing, and fierce, she grows from self-taught novice to one of the world's greatest Waterbending masters.",
    voicedBy: "Mae Whitman",
    quote: "I will never, ever turn my back on people who need me.",
  },
  {
    id: "sokka",
    name: "Sokka",
    element: "none",
    role: "Strategist & Warrior",
    affiliation: "Southern Water Tribe",
    series: ["ATLA"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "Katara's non-bending brother, whose wit, sarcasm, and tactical mind hold the team together. He proves that courage and ingenuity matter as much as bending on the battlefield.",
    voicedBy: "Jack DeSena",
    quote: "Boomerang! You do always come back!",
  },
  {
    id: "zuko",
    name: "Zuko",
    element: "fire",
    role: "Crown Prince / Fire Lord",
    affiliation: "Fire Nation",
    series: ["ATLA", "Korra"],
    firstAppearance: "Book 1, Episode 2",
    description:
      "The banished Fire Nation prince hunting the Avatar to reclaim his honor. His arc — from scarred, angry exile to Aang's closest friend and Fire Lord — is the soul of the series.",
    voicedBy: "Dante Basco",
    quote: "You're going to fail a lot before things work out.",
  },
  {
    id: "toph",
    name: "Toph Beifong",
    element: "earth",
    role: "Earthbending Prodigy",
    affiliation: "Earth Kingdom",
    series: ["ATLA", "Korra"],
    firstAppearance: "Book 2, Episode 6",
    description:
      "A blind 12-year-old who 'sees' through seismic vibrations and invented metalbending. Brash, blunt, and brilliant, she becomes Aang's Earthbending teacher despite her tiny frame.",
    voicedBy: "Jessie Flower",
    quote: "I am the greatest earthbender in the world! Don't you two dunderheads ever forget it!",
  },
  {
    id: "iroh",
    name: "Uncle Iroh",
    element: "fire",
    role: "Dragon of the West",
    affiliation: "Fire Nation",
    series: ["ATLA"],
    firstAppearance: "Book 1, Episode 2",
    description:
      "Zuko's tea-loving uncle, a retired Fire Nation general and Firebending master. Wise, warm, and quietly grieving, he guides his nephew toward honor with patience and pai sho.",
    voicedBy: "Mako Iwamatsu / Greg Baldwin",
    quote: "It is important to draw wisdom from many different places.",
  },
  {
    id: "azula",
    name: "Azula",
    element: "fire",
    role: "Fire Nation Princess",
    affiliation: "Fire Nation",
    series: ["ATLA"],
    firstAppearance: "Book 1, Episode 8",
    description:
      "Zuko's prodigy sister — a Firebending genius whose blue flames mirror her cold precision. Perfectionist, manipulative, and tragic, she is one of the Avatarverse's most compelling villains.",
    voicedBy: "Grey DeLisle",
    quote: "You're just a wildcard. You'll never amount to anything.",
  },
  {
    id: "appa",
    name: "Appa",
    element: "air",
    role: "Sky Bison",
    affiliation: "Air Nomads",
    series: ["ATLA", "Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "Aang's ten-ton flying sky bison and lifelong companion — the team's loyal transport and a living symbol of the Air Nomads' bond with their animal guides.",
    voicedBy: "Dee Bradley Baker",
    quote: "...",
  },
  {
    id: "suki",
    name: "Suki",
    element: "none",
    role: "Kyoshi Warrior",
    affiliation: "Kyoshi Island",
    series: ["ATLA"],
    firstAppearance: "Book 1, Episode 4",
    description:
      "Leader of the Kyoshi Warriors, a band of fan-wielding fighters who honor Avatar Kyoshi. Disciplined and brave, she becomes a key ally — and Sokka's equal in every way.",
    voicedBy: "Jennie Kwan",
    quote: "I am a warrior, but I'm a girl too.",
  },
  {
    id: "korra",
    name: "Korra",
    element: "water",
    role: "The Avatar",
    affiliation: "Southern Water Tribe",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "The Avatar after Aang — impulsive, physically gifted, and struggling with the spiritual side of her role. Across four Books she confronts revolution, dark spirits, anarchy, and tyranny.",
    voicedBy: "Janet Varney",
    quote: "I'm the Avatar! You gotta deal with it!",
  },
  {
    id: "mako",
    name: "Mako",
    element: "fire",
    role: "Pro-bender / Detective",
    affiliation: "Republic City Police",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 2",
    description:
      "A street-smart Firebender and pro-bending star who raises his brother Bolin. Reserved and responsible, he becomes Korra's teammate, love interest, and later a cop.",
    voicedBy: "David Faustino",
    quote: "I'll do whatever it takes to protect the people I love.",
  },
  {
    id: "bolin",
    name: "Bolin",
    element: "earth",
    role: "Pro-bender / Actor",
    affiliation: "Future Industries",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 2",
    description:
      "Mako's cheerful, lovable Earthbender brother — a pro-bending star who later discovers he can lavabend. His humor and heart keep Team Avatar's spirits up.",
    voicedBy: "P.J. Byrne",
    quote: "I'm an actor! Nuktuk: Hero of the South!",
  },
  {
    id: "asami",
    name: "Asami Sato",
    element: "none",
    role: "Industrialist / Engineer",
    affiliation: "Future Industries",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 4",
    description:
      "The brilliant non-bending heiress to Future Industries. A skilled driver, engineer, and fighter, she proves that technology and courage rival any bending power.",
    voicedBy: "Seychelle Gabriel",
    quote: "You don't need to be a bender to be strong.",
  },
  {
    id: "tenzin",
    name: "Tenzin",
    element: "air",
    role: "Airbending Master",
    affiliation: "Air Nation",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "Aang and Katara's youngest son and the only Airbending master of his generation. Serious and devoted, he mentors Korra while carrying the weight of his father's legacy.",
    voicedBy: "J.K. Simmons",
    quote: "Being the Avatar's not about being perfect — it's about learning.",
  },
  {
    id: "lin",
    name: "Lin Beifong",
    element: "earth",
    role: "Chief of Police",
    affiliation: "Republic City Police",
    series: ["Korra"],
    firstAppearance: "Book 1, Episode 1",
    description:
      "Toph's tough, metalbending police chief daughter. Stern and selfless, she protects Republic City with unshakable integrity — even at great personal cost.",
    voicedBy: "Mindya Sterling",
    quote: "I've dedicated my life to protecting this city.",
  },
];

export interface TimelineEvent {
  era: string;
  year: string; // display label
  title: string;
  element: ElementId;
  detail: string;
}

export const TIMELINE: TimelineEvent[] = [
  {
    era: "Era of Beginnings",
    year: "~10,000 BG",
    title: "Wan becomes the first Avatar",
    element: "fire",
    detail:
      "After merging with Raava during Harmonic Convergence, Wan commits to keeping balance between the mortal and spirit worlds — beginning the Avatar Cycle.",
  },
  {
    era: "Ancient Avatars",
    year: "~3,829 BG",
    title: "Avatar Szeto restores Fire Nation order",
    element: "fire",
    detail:
      "A bureaucrat-Avatar who served as Fire Lord's adviser, stabilizing a corrupt Fire Nation through political reform rather than raw power.",
  },
  {
    era: "Ancient Avatars",
    year: "~312 BG",
    title: "Avatar Kyoshi separates Kyoshi Island",
    element: "earth",
    detail:
      "Using her immense power, Kyoshi splits a peninsula from the mainland to protect its people from a tyrannical Earth King — and founds the Kyoshi Warriors.",
  },
  {
    era: "Ancient Avatars",
    year: "55 BG",
    title: "Avatar Roku's warning to Fire Lord Sozin",
    element: "fire",
    detail:
      "Roku spares his old friend Sozin after his first act of aggression — a mercy he would pay for with his life, and the world would pay for with a century of war.",
  },
  {
    era: "The Hundred Year War",
    year: "0 AG",
    title: "The Air Nomad Genocide",
    element: "air",
    detail:
      "Sozin exploits the comet's power to wipe out the Air Nomads in a single day, hoping to end the Avatar Cycle. Aang — hidden in the iceberg — survives unknown.",
  },
  {
    era: "The Hundred Year War",
    year: "0 AG",
    title: "Aang is frozen in the iceberg",
    element: "water",
    detail:
      "Fleeing his destiny, a young Aang is caught in a storm with Appa and encases them both in ice, suspended in the Avatar State for a hundred years.",
  },
  {
    era: "The Hundred Year War",
    year: "99 AG",
    title: "Aang is freed by Katara & Sokka",
    element: "water",
    detail:
      "Siblings from the Southern Water Tribe break the iceberg and release the Avatar — reigniting the world's hope and the Fire Nation's hunt.",
  },
  {
    era: "The Hundred Year War",
    year: "100 AG",
    title: "Fall of the Fire Nation & end of the war",
    element: "fire",
    detail:
      "Aang energybends Ozai's firebending away during Sozin's Comet, ending the Hundred Year War. Zuko is crowned Fire Lord and pledges an era of peace.",
  },
  {
    era: "Reconstruction",
    year: "171 AG",
    title: "Korra reopens the spirit portals",
    element: "spirit",
    detail:
      "During a new Harmonic Convergence, Korra leaves the spirit portals open, merging the spirit and physical worlds and ushering in a new age.",
  },
  {
    era: "Reconstruction",
    year: "174 AG",
    title: "Kuvina's earth empire & the new Air Nation",
    element: "earth",
    detail:
      "Reborn Airbenders form a new Air Nation, while Kuvira's military campaign forces Korra into one final confrontation to restore balance.",
  },
];

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: FeatureCard[] = [
  {
    icon: "Compass",
    title: "World Map Splash",
    description:
      "The hub opens on an animated map of the Four Nations before dissolving into the archive.",
  },
  {
    icon: "Search",
    title: "Cross-Series Search",
    description:
      "One debounced search bar queries every episode, character, and entry across the whole universe.",
  },
  {
    icon: "Sparkles",
    title: "Ambient Particles",
    description:
      "Floating bending symbols drift across the canvas, each cycling through orbit, wave, and drift motion.",
  },
  {
    icon: "Palette",
    title: "Elemental Themes",
    description:
      "Six palettes — Dark, Parchment, Water, Earth, Fire, and Air — re-color the entire archive instantly.",
  },
  {
    icon: "ScrollText",
    title: "Full Chronology",
    description:
      "An accordion timeline from Avatar Wan's era through Korra's, with every major event annotated.",
  },
  {
    icon: "Users",
    title: "Character Compendium",
    description:
      "Every major character, color-coded by element, with affiliations, voice actors, and defining quotes.",
  },
];

// Helper: map element id to its info
export function elementInfo(id: ElementId): ElementInfo | undefined {
  if (id === "spirit") return undefined;
  if (id === "none") return undefined;
  return ELEMENTS.find((e) => e.id === id);
}

export const ELEMENT_COLOR: Record<ElementId, string> = {
  air: "#f59e0b",
  water: "#2da6f4",
  earth: "#7cb342",
  fire: "#ef4444",
  spirit: "#a855f7",
  none: "#94a3b8",
};
