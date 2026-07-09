// AvatarArchive — real fan-curated content with video URLs from GitHub Releases.
// Avatar © Nickelodeon/Viacom/Paramount. Fan-made, non-commercial.

export type ElementId = "air" | "water" | "earth" | "fire" | "spirit" | "none";

// Base URL for all release-hosted videos
const RELEASE_BASE =
  "https://github.com/JeffreyHamilton6399/AvatarArchive/releases/download";

function videoUrl(release: string, file: string): string {
  return `${RELEASE_BASE}/${release}/${file}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────

export interface ElementInfo {
  id: ElementId;
  name: string;
  color: string;
  image: string;
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
    color: "#4db8ff",
    image: "/images/water.png",
    season: "Winter",
    direction: "North",
    philosophy: "Adaptability & healing",
    description:
      "Waterbenders draw power from the moon and ocean spirits, bending the fluid element to heal, defend, and strike. Their style flows between gentle redirection and crushing waves.",
    subSkills: ["Healing", "Bloodbending", "Plantbending", "Ice & steam shaping"],
    nations: ["Northern Water Tribe", "Southern Water Tribe", "Foggy Swamp Tribe"],
    notableBenders: ["Katara", "Pakku", "Hama", "Korra", "Ming-Hua"],
  },
  {
    id: "earth",
    name: "Earth",
    color: "#6abf69",
    image: "/images/earth.png",
    season: "Spring",
    direction: "East",
    philosophy: "Endurance & strength",
    description:
      "Earthbenders stand their ground, channeling the stubborn strength of stone and soil. Rooted and resolute, they listen to the vibrations of the earth.",
    subSkills: ["Metalbending", "Sandbending", "Seismic sense", "Lavabending"],
    nations: ["Earth Kingdom", "Ba Sing Se", "Zaofu"],
    notableBenders: ["Toph Beifong", "Bolin", "Lin Beifong", "Suyin Beifong", "Kyoshi"],
  },
  {
    id: "fire",
    name: "Fire",
    color: "#f97316",
    image: "/images/fire.png",
    season: "Summer",
    direction: "South",
    philosophy: "Power & drive",
    description:
      "Firebenders wield the breath of the dragon, drawing energy from the sun. Their discipline channels raw, living heat into searing offense and controlled bursts.",
    subSkills: ["Lightning generation", "Lightning redirection", "Combustionbending", "Flight"],
    nations: ["Fire Nation", "Sun Warriors"],
    notableBenders: ["Zuko", "Iroh", "Azula", "Ozai", "Mako"],
  },
  {
    id: "air",
    name: "Air",
    color: "#f5c518",
    image: "/images/air.png",
    season: "Autumn",
    direction: "West",
    philosophy: "Freedom & peace",
    description:
      "Airbenders embody detachment and movement, riding currents of wind with serene agility. Their circular, evasive techniques turn an opponent's momentum against them.",
    subSkills: ["Flight", "Spiritual projection", "Air scooter", "Suffocation"],
    nations: ["Air Nomads", "Air Temple Island", "Northern Air Temple"],
    notableBenders: ["Aang", "Tenzin", "Jinora", "Zaheer", "Yangchen"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EPISODES — with real video URLs from GitHub Releases
// ─────────────────────────────────────────────────────────────────────────────

export interface Episode {
  n: number; // episode number within the book
  title: string;
  video?: string; // direct mp4 URL from releases
  caption?: string; // SRT path
  captionOffset?: number; // seconds to shift captions (for combined episodes)
}

export interface Book {
  book: number;
  label: string;
  sublabel: string;
  element: ElementId;
  tag: string; // release tag + caption folder name
  episodes: Episode[];
}

export interface Series {
  id: string;
  title: string;
  short: string;
  years: string;
  element: ElementId;
  accent: string;
  backgroundImage: string;
  tagline: string;
  synopsis: string;
  books: Book[];
}

// Helper to build ATLA episodes (release file naming: S{book}E{ep}.mp4)
function atlaEpisodes(bookNum: number, titles: string[]): Episode[] {
  return titles.map((title, i) => {
    const ep = i + 1;
    // Book 2 episodes 12 & 13 are combined into one file: S2E12E13.mp4
    let file: string;
    let captionOffset: number | undefined;
    if (bookNum === 2 && ep === 12) {
      file = "S2E12E13.mp4";
    } else if (bookNum === 2 && ep === 13) {
      // Episode 13 shares the combined file — captions need offset by S2E12's duration
      file = "S2E12E13.mp4";
      captionOffset = 1424; // S2E12 ends at ~23:43
    } else {
      file = `S${bookNum}E${ep}.mp4`;
    }
    return {
      n: ep,
      title,
      video: videoUrl(`atla-season${bookNum}`, file),
      caption: `/captions/atla-season${bookNum}/S${bookNum}E${ep}.srt`,
      captionOffset,
    };
  });
}

// Helper to build Korra episodes (release tag is "kora-season{N}", file S{book}E{ep}.mp4)
function korraEpisodes(bookNum: number, titles: string[]): Episode[] {
  return titles.map((title, i) => {
    const ep = i + 1;
    return {
      n: ep,
      title,
      video: videoUrl(`kora-season${bookNum}`, `S${bookNum}E${ep}.mp4`),
      caption: `/captions/korra-season${bookNum}/S${bookNum}E${ep}.srt`,
    };
  });
}

export const SERIES: Series[] = [
  {
    id: "atla",
    title: "Avatar: The Last Airbender",
    short: "ATLA",
    years: "2005 – 2008",
    element: "air",
    accent: "#f5c518",
    backgroundImage: "/images/atlabg.png",
    tagline: "The boy who was lost in time.",
    synopsis:
      "A 12-year-old boy frozen in an iceberg for a century awakens as the last Airbender and the Avatar — the one person who can master all four elements and end the Fire Nation's hundred-year war.",
    books: [
      {
        book: 1, label: "Book One", sublabel: "Water", element: "water", tag: "atla-season1",
        episodes: atlaEpisodes(1, [
          "The Boy in the Iceberg", "The Avatar Returns", "The Southern Air Temple",
          "The Warriors of Kyoshi", "The King of Omashu", "Imprisoned",
          "The Spirit World", "Avatar Roku", "The Waterbending Scroll", "Jet",
          "The Great Divide", "The Storm", "The Blue Spirit", "The Fortuneteller",
          "Bato of the Water Tribe", "The Deserter", "The Northern Air Temple",
          "The Waterbending Master", "The Siege of the North, Part 1",
          "The Siege of the North, Part 2",
        ]),
      },
      {
        book: 2, label: "Book Two", sublabel: "Earth", element: "earth", tag: "atla-season2",
        episodes: atlaEpisodes(2, [
          "The Avatar State", "The Cave of Two Lovers", "Return to Omashu",
          "The Swamp", "Avatar Day", "The Blind Bandit", "Zuko Alone", "The Chase",
          "Bitter Work", "The Library", "The Desert", "The Serpent's Pass",
          "The Drill", "City of Walls and Secrets", "The Tales of Ba Sing Se",
          "Appa's Lost Days", "Lake Laogai", "The Earth King", "The Guru",
          "The Crossroads of Destiny",
        ]),
      },
      {
        book: 3, label: "Book Three", sublabel: "Fire", element: "fire", tag: "atla-season3",
        episodes: atlaEpisodes(3, [
          "The Awakening", "The Headband", "The Painted Lady", "Sokka's Master",
          "The Beach", "The Avatar and the Firelord", "The Runaway", "The Puppetmaster",
          "Nightmares and Daydreams", "The Day of Black Sun, Part 1",
          "The Day of Black Sun, Part 2", "The Western Air Temple",
          "The Firebending Masters", "The Boiling Rock, Part 1",
          "The Boiling Rock, Part 2", "The Southern Raiders",
          "The Ember Island Players", "Sozin's Comet, Part 1: The Phoenix King",
          "Sozin's Comet, Part 2: The Old Masters",
          "Sozin's Comet, Part 3: Into the Inferno",
          "Sozin's Comet, Part 4: Avatar Aang",
        ]),
      },
    ],
  },
  {
    id: "korra",
    title: "The Legend of Korra",
    short: "Korra",
    years: "2012 – 2014",
    element: "water",
    accent: "#4db8ff",
    backgroundImage: "/images/korabg.png",
    tagline: "The Avatar in a world that moved on.",
    synopsis:
      "Seventy years after Aang's war, the next Avatar — a headstrong Waterbender named Korra — faces a modernizing world that questions whether the Avatar is still needed.",
    books: [
      {
        book: 1, label: "Book One", sublabel: "Air", element: "air", tag: "kora-season1",
        episodes: korraEpisodes(1, [
          "Welcome to Republic City", "A Leaf in the Wind", "The Revelation",
          "The Voice in the Night", "The Spirit of Competition", "And the Winner Is...",
          "The Aftermath", "When Extremes Meet", "Out of the Past", "Turning the Tides",
          "Skeletons in the Closet", "Endgame",
        ]),
      },
      {
        book: 2, label: "Book Two", sublabel: "Spirits", element: "water", tag: "kora-season2",
        episodes: korraEpisodes(2, [
          "Rebel Spirit", "The Southern Lights", "Civil Wars, Part 1",
          "Civil Wars, Part 2", "Peacekeepers", "The Sting", "Beginnings, Part 1",
          "Beginnings, Part 2", "The Guide", "A New Spiritual Age",
          "Night of a Thousand Stars", "Harmonic Convergence", "Darkness Falls",
          "Light in the Dark",
        ]),
      },
      {
        book: 3, label: "Book Three", sublabel: "Change", element: "earth", tag: "kora-season3",
        episodes: korraEpisodes(3, [
          "A Breath of Fresh Air", "Rebirth", "The Earth Queen", "In Harm's Way",
          "The Metal Clan", "Old Wounds", "Original Airbenders", "The Terror Within",
          "The Stakeout", "Long Live the Queen", "The Ultimatum", "Enter the Void",
          "Venom of the Red Lotus",
        ]),
      },
      {
        book: 4, label: "Book Four", sublabel: "Balance", element: "fire", tag: "kora-season4",
        episodes: korraEpisodes(4, [
          "After All These Years", "Korra Alone", "The Coronation", "The Calling",
          "Enemy at the Gates", "The Battle of Zaofu", "Reunion", "Remembrances",
          "Beyond the Wilds", "Operation Beifong", "Kuvira's Gambit",
          "Day of the Colossus", "The Last Stand",
        ]),
      },
    ],
  },
  {
    id: "film2026",
    title: "Aang: The Last Airbender",
    short: "2026 Film",
    years: "October 9, 2026",
    element: "air",
    accent: "#f5c518",
    backgroundImage: "/images/movie2026bg.png",
    tagline: "The Avatar returns to the big screen.",
    synopsis:
      "The first animated Avatar theatrical film in over a decade, following Aang and his friends in a new adventure after the events of the original series.",
    books: [
      {
        book: 1, label: "Theatrical", sublabel: "Paramount+", element: "air", tag: "movie2026",
        episodes: [
          { n: 1, title: "Aang: The Last Airbender", video: videoUrl("movie2026", "movie2026.mp4"), caption: "/captions/movie2026.srt" },
        ],
      },
    ],
  },
  {
    id: "film2010",
    title: "The Last Airbender (2010)",
    short: "2010 Film",
    years: "2010",
    element: "earth",
    accent: "#6abf69",
    backgroundImage: "/images/movie2010bg.png",
    tagline: "The adaptation fans would rather forget.",
    synopsis:
      "M. Night Shyamalan's live-action film adaptation that condensed the first Book of the animated series into a single feature.",
    books: [
      {
        book: 1, label: "Live-action", sublabel: "Feature film", element: "earth", tag: "movie2010",
        episodes: [
          { n: 1, title: "The Last Airbender", video: videoUrl("movie2010", "movie2010.mp4") },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTERS
// ─────────────────────────────────────────────────────────────────────────────

export interface Character {
  id: string;
  name: string;
  element: ElementId;
  role: string;
  affiliation: string;
  series: string[];
  description: string;
  voicedBy: string;
  quote: string;
}

export const CHARACTERS: Character[] = [
  { id: "aang", name: "Aang", element: "air", role: "The Avatar", affiliation: "Air Nomads", series: ["ATLA", "Korra"], description: "A fun-loving 12-year-old monk and the last surviving Airbender, awakened from a century in the ice. Burdened with being the Avatar, he seeks to restore balance without abandoning his pacifist heart.", voicedBy: "Zach Tyler Eisen", quote: "When we hit our lowest point, we are open to the greatest change." },
  { id: "katara", name: "Katara", element: "water", role: "Waterbending Master", affiliation: "Southern Water Tribe", series: ["ATLA", "Korra"], description: "The last Waterbender of the Southern Tribe and the group's heart. Determined, nurturing, and fierce.", voicedBy: "Mae Whitman", quote: "I will never, ever turn my back on people who need me." },
  { id: "sokka", name: "Sokka", element: "none", role: "Strategist & Warrior", affiliation: "Southern Water Tribe", series: ["ATLA"], description: "Katara's non-bending brother, whose wit, sarcasm, and tactical mind hold the team together.", voicedBy: "Jack DeSena", quote: "Boomerang! You do always come back!" },
  { id: "zuko", name: "Zuko", element: "fire", role: "Crown Prince / Fire Lord", affiliation: "Fire Nation", series: ["ATLA", "Korra"], description: "The banished Fire Nation prince hunting the Avatar to reclaim his honor. His arc is the soul of the series.", voicedBy: "Dante Basco", quote: "You're going to fail a lot before things work out." },
  { id: "toph", name: "Toph Beifong", element: "earth", role: "Earthbending Prodigy", affiliation: "Earth Kingdom", series: ["ATLA", "Korra"], description: "A blind 12-year-old who 'sees' through seismic vibrations and invented metalbending.", voicedBy: "Jessie Flower", quote: "I am the greatest earthbender in the world!" },
  { id: "iroh", name: "Uncle Iroh", element: "fire", role: "Dragon of the West", affiliation: "Fire Nation", series: ["ATLA"], description: "Zuko's tea-loving uncle, a retired Fire Nation general. Wise, warm, and quietly grieving.", voicedBy: "Mako / Greg Baldwin", quote: "It is important to draw wisdom from many different places." },
  { id: "azula", name: "Azula", element: "fire", role: "Fire Nation Princess", affiliation: "Fire Nation", series: ["ATLA"], description: "Zuko's prodigy sister — a Firebending genius whose blue flames mirror her cold precision.", voicedBy: "Grey DeLisle", quote: "You're just a wildcard. You'll never amount to anything." },
  { id: "appa", name: "Appa", element: "air", role: "Sky Bison", affiliation: "Air Nomads", series: ["ATLA", "Korra"], description: "Aang's ten-ton flying sky bison and lifelong companion.", voicedBy: "Dee Bradley Baker", quote: "..." },
  { id: "suki", name: "Suki", element: "none", role: "Kyoshi Warrior", affiliation: "Kyoshi Island", series: ["ATLA"], description: "Leader of the Kyoshi Warriors, a band of fan-wielding fighters who honor Avatar Kyoshi.", voicedBy: "Jennie Kwan", quote: "I am a warrior, but I'm a girl too." },
  { id: "korra", name: "Korra", element: "water", role: "The Avatar", affiliation: "Southern Water Tribe", series: ["Korra"], description: "The Avatar after Aang — impulsive, physically gifted, and struggling with the spiritual side of her role.", voicedBy: "Janet Varney", quote: "I'm the Avatar! You gotta deal with it!" },
  { id: "mako", name: "Mako", element: "fire", role: "Pro-bender / Detective", affiliation: "Republic City Police", series: ["Korra"], description: "A street-smart Firebender and pro-bending star who raises his brother Bolin.", voicedBy: "David Faustino", quote: "I'll do whatever it takes to protect the people I love." },
  { id: "bolin", name: "Bolin", element: "earth", role: "Pro-bender / Actor", affiliation: "Future Industries", series: ["Korra"], description: "Mako's cheerful, lovable Earthbender brother who later discovers he can lavabend.", voicedBy: "P.J. Byrne", quote: "I'm an actor! Nuktuk: Hero of the South!" },
  { id: "asami", name: "Asami Sato", element: "none", role: "Industrialist / Engineer", affiliation: "Future Industries", series: ["Korra"], description: "The brilliant non-bending heiress to Future Industries. A skilled driver, engineer, and fighter.", voicedBy: "Seychelle Gabriel", quote: "You don't need to be a bender to be strong." },
  { id: "tenzin", name: "Tenzin", element: "air", role: "Airbending Master", affiliation: "Air Nation", series: ["Korra"], description: "Aang and Katara's youngest son and the only Airbending master of his generation.", voicedBy: "J.K. Simmons", quote: "Being the Avatar's not about being perfect — it's about learning." },
  { id: "lin", name: "Lin Beifong", element: "earth", role: "Chief of Police", affiliation: "Republic City Police", series: ["Korra"], description: "Toph's tough, metalbending police chief daughter. Stern and selfless.", voicedBy: "Mindy Sterling", quote: "I've dedicated my life to protecting this city." },
];

// ─────────────────────────────────────────────────────────────────────────────
// BOOKS / GRAPHIC NOVELS (real PDFs in /books)
// ─────────────────────────────────────────────────────────────────────────────

export interface Novel {
  title: string;
  file: string;
  url: string;
  trilogy: string;
  part: number;
}

export interface Trilogy {
  name: string;
  element: ElementId;
  description: string;
  parts: Novel[];
}

export const NOVELS: Novel[] = [
  { title: "The Promise, Part 1", file: "thepromise1.pdf", url: "/books/thepromise1.pdf", trilogy: "The Promise", part: 1 },
  { title: "The Promise, Part 2", file: "thepromise2.pdf", url: "/books/thepromise2.pdf", trilogy: "The Promise", part: 2 },
  { title: "The Promise, Part 3", file: "thepromise3.pdf", url: "/books/thepromise3.pdf", trilogy: "The Promise", part: 3 },
  { title: "The Search, Part 1", file: "thesearch1.pdf", url: "/books/thesearch1.pdf", trilogy: "The Search", part: 1 },
  { title: "The Search, Part 2", file: "thesearch2.pdf", url: "/books/thesearch2.pdf", trilogy: "The Search", part: 2 },
  { title: "The Search, Part 3", file: "thesearch3.pdf", url: "/books/thesearch3.pdf", trilogy: "The Search", part: 3 },
  { title: "The Rift, Part 1", file: "therift1.pdf", url: "/books/therift1.pdf", trilogy: "The Rift", part: 1 },
  { title: "The Rift, Part 2", file: "therift2.pdf", url: "/books/therift2.pdf", trilogy: "The Rift", part: 2 },
  { title: "The Rift, Part 3", file: "therift3.pdf", url: "/books/therift3.pdf", trilogy: "The Rift", part: 3 },
  { title: "Smoke and Shadow, Part 1", file: "smokeandshadow1.pdf", url: "/books/smokeandshadow1.pdf", trilogy: "Smoke and Shadow", part: 1 },
  { title: "Smoke and Shadow, Part 2", file: "smokeandshadow2.pdf", url: "/books/smokeandshadow2.pdf", trilogy: "Smoke and Shadow", part: 2 },
  { title: "Smoke and Shadow, Part 3", file: "smokeandshadow3.pdf", url: "/books/smokeandshadow3.pdf", trilogy: "Smoke and Shadow", part: 3 },
  { title: "North and South, Part 1", file: "northandsouth1.pdf", url: "/books/northandsouth1.pdf", trilogy: "North and South", part: 1 },
  { title: "North and South, Part 2", file: "northandsouth2.pdf", url: "/books/northandsouth2.pdf", trilogy: "North and South", part: 2 },
  { title: "North and South, Part 3", file: "northandsouth3.pdf", url: "/books/northandsouth3.pdf", trilogy: "North and South", part: 3 },
  { title: "Imbalance, Part 1", file: "imbalance1.pdf", url: "/books/imbalance1.pdf", trilogy: "Imbalance", part: 1 },
  { title: "Imbalance, Part 2", file: "imbalance2.pdf", url: "/books/imbalance2.pdf", trilogy: "Imbalance", part: 2 },
  { title: "Imbalance, Part 3", file: "imbalance3.pdf", url: "/books/imbalance3.pdf", trilogy: "Imbalance", part: 3 },
];

export const TRILOGIES: Trilogy[] = [
  { name: "The Promise", element: "fire", description: "Immediately after the war, Aang and Zuko face the Fire Nation colonies' uncertain future.", parts: NOVELS.filter((n) => n.trilogy === "The Promise") },
  { name: "The Search", element: "spirit", description: "Zuko enlists Azula and Team Avatar to hunt for his long-vanished mother, Ursa.", parts: NOVELS.filter((n) => n.trilogy === "The Search") },
  { name: "The Rift", element: "earth", description: "Aang clashes with an old Air Nomad friend over the soul of a new industrial town.", parts: NOVELS.filter((n) => n.trilogy === "The Rift") },
  { name: "Smoke and Shadow", element: "fire", description: "Zuko's rule is threatened by a shadowy movement seeking to restore the old Fire Nation order.", parts: NOVELS.filter((n) => n.trilogy === "Smoke and Shadow") },
  { name: "North and South", element: "water", description: "Katara and Sokka return to the Southern Water Tribe to find it transformed.", parts: NOVELS.filter((n) => n.trilogy === "North and South") },
  { name: "Imbalance", element: "earth", description: "In the Earth Kingdom, benders and non-benders clash over industry and equality.", parts: NOVELS.filter((n) => n.trilogy === "Imbalance") },
];

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  era: string;
  year: string;
  title: string;
  element: ElementId;
  detail: string;
}

export const TIMELINE: TimelineEvent[] = [
  { era: "Era of Beginnings", year: "~10,000 BG", title: "Wan becomes the first Avatar", element: "fire", detail: "After merging with Raava during Harmonic Convergence, Wan commits to keeping balance between the mortal and spirit worlds." },
  { era: "Ancient Avatars", year: "~3,829 BG", title: "Avatar Szeto restores Fire Nation order", element: "fire", detail: "A bureaucrat-Avatar who served as Fire Lord's adviser, stabilizing a corrupt Fire Nation through reform." },
  { era: "Ancient Avatars", year: "~312 BG", title: "Avatar Kyoshi separates Kyoshi Island", element: "earth", detail: "Kyoshi splits a peninsula from the mainland to protect its people and founds the Kyoshi Warriors." },
  { era: "Ancient Avatars", year: "55 BG", title: "Avatar Roku's warning to Sozin", element: "fire", detail: "Roku spares his old friend Sozin after his first act of aggression — a mercy paid for with his life." },
  { era: "The Hundred Year War", year: "0 AG", title: "The Air Nomad Genocide", element: "air", detail: "Sozin exploits the comet's power to wipe out the Air Nomads in a single day. Aang survives in the iceberg." },
  { era: "The Hundred Year War", year: "0 AG", title: "Aang is frozen in the iceberg", element: "water", detail: "Fleeing his destiny, a young Aang is caught in a storm and encased in ice for a hundred years." },
  { era: "The Hundred Year War", year: "99 AG", title: "Aang is freed by Katara & Sokka", element: "water", detail: "Siblings from the Southern Water Tribe break the iceberg and release the Avatar." },
  { era: "The Hundred Year War", year: "100 AG", title: "End of the Hundred Year War", element: "fire", detail: "Aang energybends Ozai's firebending away during Sozin's Comet. Zuko is crowned Fire Lord." },
  { era: "Reconstruction", year: "171 AG", title: "Korra reopens the spirit portals", element: "spirit", detail: "During a new Harmonic Convergence, Korra leaves the spirit portals open, merging the worlds." },
  { era: "Reconstruction", year: "174 AG", title: "Kuvira's earth empire & the new Air Nation", element: "earth", detail: "Reborn Airbenders form a new Air Nation, while Kuvira's campaign forces one final confrontation." },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2026 FILM COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────

export const FILM_2026_PREMIERE = new Date("2026-10-09T00:00:00-07:00").getTime();

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const ELEMENT_COLOR: Record<ElementId, string> = {
  air: "#f5c518",
  water: "#4db8ff",
  earth: "#6abf69",
  fire: "#f97316",
  spirit: "#a855f7",
  none: "#94a3b8",
};

// Only air/water/earth/fire have PNG marks. spirit & none fall back to air.
export function elementImage(el: ElementId): string {
  if (el === "air" || el === "water" || el === "earth" || el === "fire") {
    return `/images/${el}.png`;
  }
  return "/images/air.png";
}

export function totalEpisodes(): number {
  return SERIES.reduce((sum, s) => sum + s.books.reduce((b, book) => b + book.episodes.length, 0), 0);
}
