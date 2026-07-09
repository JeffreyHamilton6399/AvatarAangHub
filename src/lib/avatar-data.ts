// AvatarArchive — real fan-curated content extracted from the original static site.
// All content is fan-created reference material. Avatar © Nickelodeon/Viacom/Paramount.

export type ElementId = "air" | "water" | "earth" | "fire" | "spirit" | "none";

// ─────────────────────────────────────────────────────────────────────────────
// ELEMENTS
// ─────────────────────────────────────────────────────────────────────────────

export interface ElementInfo {
  id: ElementId;
  name: string;
  color: string;
  glow: string;
  image: string; // PNG mark from /images
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
    image: "/images/water.png",
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
    image: "/images/earth.png",
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
    image: "/images/fire.png",
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
    image: "/images/air.png",
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

// ─────────────────────────────────────────────────────────────────────────────
// SERIES + REAL EPISODE DATA (extracted from the original static site)
// ─────────────────────────────────────────────────────────────────────────────

export interface Book {
  book: number;
  label: string;
  sublabel: string;
  element: ElementId;
  tag: string; // caption folder name
  episodes: string[];
}

export interface Series {
  id: string;
  title: string;
  short: string;
  years: string;
  element: ElementId;
  episodes: number;
  seasons: number;
  accent: string;
  backgroundImage: string;
  tagline: string;
  synopsis: string;
  books: Book[];
}

export const SERIES: Series[] = [
  {
    id: "atla",
    title: "Avatar: The Last Airbender",
    short: "ATLA",
    years: "2005 – 2008",
    element: "air",
    episodes: 61,
    seasons: 3,
    accent: "#f59e0b",
    backgroundImage: "/images/atlabg.png",
    tagline: "The boy who was lost in time.",
    synopsis:
      "A 12-year-old boy frozen in an iceberg for a century awakens as the last Airbender and the Avatar — the one person who can master all four elements and end the Fire Nation's hundred-year war.",
    books: [
      {
        book: 1,
        label: "Book One",
        sublabel: "Water",
        element: "water",
        tag: "atla-season1",
        episodes: [
          "The Boy in the Iceberg", "The Avatar Returns", "The Southern Air Temple",
          "The Warriors of Kyoshi", "The King of Omashu", "Imprisoned",
          "The Spirit World", "Avatar Roku", "The Waterbending Scroll", "Jet",
          "The Great Divide", "The Storm", "The Blue Spirit", "The Fortuneteller",
          "Bato of the Water Tribe", "The Deserter", "The Northern Air Temple",
          "The Waterbending Master", "The Siege of the North, Part 1",
          "The Siege of the North, Part 2",
        ],
      },
      {
        book: 2,
        label: "Book Two",
        sublabel: "Earth",
        element: "earth",
        tag: "atla-season2",
        episodes: [
          "The Avatar State", "The Cave of Two Lovers", "Return to Omashu",
          "The Swamp", "Avatar Day", "The Blind Bandit", "Zuko Alone", "The Chase",
          "Bitter Work", "The Library", "The Desert", "The Serpent's Pass",
          "The Drill", "City of Walls and Secrets", "The Tales of Ba Sing Se",
          "Appa's Lost Days", "Lake Laogai", "The Earth King", "The Guru",
          "The Crossroads of Destiny",
        ],
      },
      {
        book: 3,
        label: "Book Three",
        sublabel: "Fire",
        element: "fire",
        tag: "atla-season3",
        episodes: [
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
        ],
      },
    ],
  },
  {
    id: "korra",
    title: "The Legend of Korra",
    short: "Korra",
    years: "2012 – 2014",
    element: "water",
    episodes: 52,
    seasons: 4,
    accent: "#2da6f4",
    backgroundImage: "/images/korabg.png",
    tagline: "The Avatar in a world that moved on.",
    synopsis:
      "Seventy years after Aang's war, the next Avatar — a headstrong Waterbender named Korra — faces a modernizing world that questions whether the Avatar is still needed.",
    books: [
      {
        book: 1,
        label: "Book One",
        sublabel: "Air",
        element: "air",
        tag: "korra-season1",
        episodes: [
          "Welcome to Republic City", "A Leaf in the Wind", "The Revelation",
          "The Voice in the Night", "The Spirit of Competition", "And the Winner Is...",
          "The Aftermath", "When Extremes Meet", "Out of the Past", "Turning the Tides",
          "Skeletons in the Closet", "Endgame",
        ],
      },
      {
        book: 2,
        label: "Book Two",
        sublabel: "Spirits",
        element: "water",
        tag: "korra-season2",
        episodes: [
          "Rebel Spirit", "The Southern Lights", "Civil Wars, Part 1",
          "Civil Wars, Part 2", "Peacekeepers", "The Sting", "Beginnings, Part 1",
          "Beginnings, Part 2", "The Guide", "A New Spiritual Age",
          "Night of a Thousand Stars", "Harmonic Convergence", "Darkness Falls",
          "Light in the Dark",
        ],
      },
      {
        book: 3,
        label: "Book Three",
        sublabel: "Change",
        element: "earth",
        tag: "korra-season3",
        episodes: [
          "A Breath of Fresh Air", "Rebirth", "The Earth Queen", "In Harm's Way",
          "The Metal Clan", "Old Wounds", "Original Airbenders", "The Terror Within",
          "The Stakeout", "Long Live the Queen", "The Ultimatum", "Enter the Void",
          "Venom of the Red Lotus",
        ],
      },
      {
        book: 4,
        label: "Book Four",
        sublabel: "Balance",
        element: "fire",
        tag: "korra-season4",
        episodes: [
          "After All These Years", "Korra Alone", "The Coronation", "The Calling",
          "Enemy at the Gates", "The Battle of Zaofu", "Reunion", "Remembrances",
          "Beyond the Wilds", "Operation Beifong", "Kuvira's Gambit",
          "Day of the Colossus", "The Last Stand",
        ],
      },
    ],
  },
  {
    id: "live",
    title: "Avatar: The Last Airbender (Live Action)",
    short: "Netflix",
    years: "2024 – present",
    element: "fire",
    episodes: 8,
    seasons: 2,
    accent: "#ef4444",
    backgroundImage: "/images/liveshowbg.png",
    tagline: "The legend, reforged in live action.",
    synopsis:
      "A big-budget live-action reimagining of the original animated series, retelling Aang's journey across a re-created Four Nations with new set-pieces and expanded character beats.",
    books: [
      {
        book: 1,
        label: "Season 1",
        sublabel: "Water",
        element: "water",
        tag: "live-season1",
        episodes: [
          "Aang", "Warriors", "Omashu", "Into the Dark", "Spirited Away",
          "Masks", "The North", "Legends",
        ],
      },
      {
        book: 2,
        label: "Season 2",
        sublabel: "Earth",
        element: "earth",
        tag: "live-season2",
        episodes: ["Coming 2026"],
      },
    ],
  },
  {
    id: "film2026",
    title: "Aang: The Last Airbender",
    short: "2026 Film",
    years: "October 9, 2026",
    element: "air",
    episodes: 1,
    seasons: 1,
    accent: "#f59e0b",
    backgroundImage: "/images/movie2026bg.png",
    tagline: "The Avatar returns to the big screen.",
    synopsis:
      "The first animated Avatar theatrical film in over a decade, following Aang and his friends in a new adventure after the events of the original series.",
    books: [
      {
        book: 1,
        label: "Theatrical",
        sublabel: "Paramount+",
        element: "air",
        tag: "movie2026",
        episodes: ["Aang: The Last Airbender"],
      },
    ],
  },
  {
    id: "film2010",
    title: "The Last Airbender (2010)",
    short: "2010 Film",
    years: "2010",
    element: "earth",
    episodes: 1,
    seasons: 1,
    accent: "#7cb342",
    backgroundImage: "/images/movie2010bg.png",
    tagline: "The adaptation fans would rather forget.",
    synopsis:
      "M. Night Shyamalan's live-action film adaptation that condensed the first Book of the animated series into a single feature — widely regarded as a cautionary tale of adaptation.",
    books: [
      {
        book: 1,
        label: "Live-action",
        sublabel: "Feature film",
        element: "earth",
        tag: "movie2010",
        episodes: ["The Last Airbender"],
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
  firstAppearance: string;
  description: string;
  voicedBy: string;
  quote: string;
}

export const CHARACTERS: Character[] = [
  { id: "aang", name: "Aang", element: "air", role: "The Avatar", affiliation: "Air Nomads", series: ["ATLA", "Korra"], firstAppearance: "Book 1, Episode 1", description: "A fun-loving 12-year-old monk and the last surviving Airbender, awakened from a century in the ice. Burdened with being the Avatar, he seeks to restore balance without abandoning his pacifist heart.", voicedBy: "Zach Tyler Eisen", quote: "When we hit our lowest point, we are open to the greatest change." },
  { id: "katara", name: "Katara", element: "water", role: "Waterbending Master", affiliation: "Southern Water Tribe", series: ["ATLA", "Korra"], firstAppearance: "Book 1, Episode 1", description: "The last Waterbender of the Southern Tribe and the group's heart. Determined, nurturing, and fierce, she grows from self-taught novice to one of the world's greatest Waterbending masters.", voicedBy: "Mae Whitman", quote: "I will never, ever turn my back on people who need me." },
  { id: "sokka", name: "Sokka", element: "none", role: "Strategist & Warrior", affiliation: "Southern Water Tribe", series: ["ATLA"], firstAppearance: "Book 1, Episode 1", description: "Katara's non-bending brother, whose wit, sarcasm, and tactical mind hold the team together. He proves that courage and ingenuity matter as much as bending on the battlefield.", voicedBy: "Jack DeSena", quote: "Boomerang! You do always come back!" },
  { id: "zuko", name: "Zuko", element: "fire", role: "Crown Prince / Fire Lord", affiliation: "Fire Nation", series: ["ATLA", "Korra"], firstAppearance: "Book 1, Episode 2", description: "The banished Fire Nation prince hunting the Avatar to reclaim his honor. His arc — from scarred, angry exile to Aang's closest friend and Fire Lord — is the soul of the series.", voicedBy: "Dante Basco", quote: "You're going to fail a lot before things work out." },
  { id: "toph", name: "Toph Beifong", element: "earth", role: "Earthbending Prodigy", affiliation: "Earth Kingdom", series: ["ATLA", "Korra"], firstAppearance: "Book 2, Episode 6", description: "A blind 12-year-old who 'sees' through seismic vibrations and invented metalbending. Brash, blunt, and brilliant, she becomes Aang's Earthbending teacher despite her tiny frame.", voicedBy: "Jessie Flower", quote: "I am the greatest earthbender in the world! Don't you two dunderheads ever forget it!" },
  { id: "iroh", name: "Uncle Iroh", element: "fire", role: "Dragon of the West", affiliation: "Fire Nation", series: ["ATLA"], firstAppearance: "Book 1, Episode 2", description: "Zuko's tea-loving uncle, a retired Fire Nation general and Firebending master. Wise, warm, and quietly grieving, he guides his nephew toward honor with patience and pai sho.", voicedBy: "Mako Iwamatsu / Greg Baldwin", quote: "It is important to draw wisdom from many different places." },
  { id: "azula", name: "Azula", element: "fire", role: "Fire Nation Princess", affiliation: "Fire Nation", series: ["ATLA"], firstAppearance: "Book 1, Episode 8", description: "Zuko's prodigy sister — a Firebending genius whose blue flames mirror her cold precision. Perfectionist, manipulative, and tragic, she is one of the Avatarverse's most compelling villains.", voicedBy: "Grey DeLisle", quote: "You're just a wildcard. You'll never amount to anything." },
  { id: "appa", name: "Appa", element: "air", role: "Sky Bison", affiliation: "Air Nomads", series: ["ATLA", "Korra"], firstAppearance: "Book 1, Episode 1", description: "Aang's ten-ton flying sky bison and lifelong companion — the team's loyal transport and a living symbol of the Air Nomads' bond with their animal guides.", voicedBy: "Dee Bradley Baker", quote: "..." },
  { id: "suki", name: "Suki", element: "none", role: "Kyoshi Warrior", affiliation: "Kyoshi Island", series: ["ATLA"], firstAppearance: "Book 1, Episode 4", description: "Leader of the Kyoshi Warriors, a band of fan-wielding fighters who honor Avatar Kyoshi. Disciplined and brave, she becomes a key ally — and Sokka's equal in every way.", voicedBy: "Jennie Kwan", quote: "I am a warrior, but I'm a girl too." },
  { id: "korra", name: "Korra", element: "water", role: "The Avatar", affiliation: "Southern Water Tribe", series: ["Korra"], firstAppearance: "Book 1, Episode 1", description: "The Avatar after Aang — impulsive, physically gifted, and struggling with the spiritual side of her role. Across four Books she confronts revolution, dark spirits, anarchy, and tyranny.", voicedBy: "Janet Varney", quote: "I'm the Avatar! You gotta deal with it!" },
  { id: "mako", name: "Mako", element: "fire", role: "Pro-bender / Detective", affiliation: "Republic City Police", series: ["Korra"], firstAppearance: "Book 1, Episode 2", description: "A street-smart Firebender and pro-bending star who raises his brother Bolin. Reserved and responsible, he becomes Korra's teammate, love interest, and later a cop.", voicedBy: "David Faustino", quote: "I'll do whatever it takes to protect the people I love." },
  { id: "bolin", name: "Bolin", element: "earth", role: "Pro-bender / Actor", affiliation: "Future Industries", series: ["Korra"], firstAppearance: "Book 1, Episode 2", description: "Mako's cheerful, lovable Earthbender brother — a pro-bending star who later discovers he can lavabend. His humor and heart keep Team Avatar's spirits up.", voicedBy: "P.J. Byrne", quote: "I'm an actor! Nuktuk: Hero of the South!" },
  { id: "asami", name: "Asami Sato", element: "none", role: "Industrialist / Engineer", affiliation: "Future Industries", series: ["Korra"], firstAppearance: "Book 1, Episode 4", description: "The brilliant non-bending heiress to Future Industries. A skilled driver, engineer, and fighter, she proves that technology and courage rival any bending power.", voicedBy: "Seychelle Gabriel", quote: "You don't need to be a bender to be strong." },
  { id: "tenzin", name: "Tenzin", element: "air", role: "Airbending Master", affiliation: "Air Nation", series: ["Korra"], firstAppearance: "Book 1, Episode 1", description: "Aang and Katara's youngest son and the only Airbending master of his generation. Serious and devoted, he mentors Korra while carrying the weight of his father's legacy.", voicedBy: "J.K. Simmons", quote: "Being the Avatar's not about being perfect — it's about learning." },
  { id: "lin", name: "Lin Beifong", element: "earth", role: "Chief of Police", affiliation: "Republic City Police", series: ["Korra"], firstAppearance: "Book 1, Episode 1", description: "Toph's tough, metalbending police chief daughter. Stern and selfless, she protects Republic City with unshakable integrity — even at great personal cost.", voicedBy: "Mindya Sterling", quote: "I've dedicated my life to protecting this city." },
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
  { name: "The Promise", element: "fire", description: "Immediately after the war, Aang and Zuko face the Fire Nation colonies' uncertain future — testing their friendship and the new peace.", parts: NOVELS.filter((n) => n.trilogy === "The Promise") },
  { name: "The Search", element: "spirit", description: "Zuko enlists Azula and Team Avatar to hunt for his long-vanished mother, Ursa — uncovering family secrets buried for years.", parts: NOVELS.filter((n) => n.trilogy === "The Search") },
  { name: "The Rift", element: "earth", description: "Aang clashes with an old Air Nomad friend over the soul of a new industrial town, while Toph confronts her past.", parts: NOVELS.filter((n) => n.trilogy === "The Rift") },
  { name: "Smoke and Shadow", element: "fire", description: "Zuko's rule is threatened by a shadowy movement seeking to restore the old Fire Nation order.", parts: NOVELS.filter((n) => n.trilogy === "Smoke and Shadow") },
  { name: "North and South", element: "water", description: "Katara and Sokka return to the Southern Water Tribe to find it transformed — and a new tension brewing between the poles.", parts: NOVELS.filter((n) => n.trilogy === "North and South") },
  { name: "Imbalance", element: "earth", description: "In the Earth Kingdom, benders and non-benders clash over industry and equality — a spiritual successor to the Equalist conflict.", parts: NOVELS.filter((n) => n.trilogy === "Imbalance") },
];

// ─────────────────────────────────────────────────────────────────────────────
// GAMES (from games.html)
// ─────────────────────────────────────────────────────────────────────────────

export interface Game {
  title: string;
  platform: string;
  description: string;
  element: ElementId;
  link?: string;
}

export const GAMES: Game[] = [
  { title: "Quest for Balance", platform: "Switch · PS · Xbox · PC", element: "air", description: "Team Avatar is back! Play as Aang and 8 friends across 18 chapters retelling the original series. A co-op puzzle-adventure through the Four Nations." },
  { title: "Nickelodeon All-Star Brawl 2", platform: "Switch · PS · Xbox · PC", element: "fire", description: "Platform fighter featuring Aang, Korra, and Azula as playable characters alongside SpongeBob, TMNT, and more Nickelodeon icons." },
  { title: "Avatar Legends", platform: "Tabletop RPG", element: "earth", description: "The official Avatar tabletop roleplaying game by Magpie Games. Create your own bender and adventure across every era of the Avatarverse." },
];

// ─────────────────────────────────────────────────────────────────────────────
// MERCH / STORES (from merch.html)
// ─────────────────────────────────────────────────────────────────────────────

export interface Store {
  label: string;
  tag: string;
  name: string;
  description: string;
  element: ElementId;
  color: string;
}

export const STORES: Store[] = [
  { label: "Paramount", tag: "Official", name: "Paramount Shop", description: "The official Paramount merchandise store — apparel, accessories, and collectibles for the entire Avatar franchise.", element: "fire", color: "#ef4444" },
  { label: "Nickelodeon", tag: "Official", name: "Nick Shop", description: "Nickelodeon's official storefront with licensed Avatar: The Last Airbender and Legend of Korra merchandise.", element: "air", color: "#f59e0b" },
  { label: "Netflix", tag: "Live Action", name: "Netflix ATLA", description: "The official Netflix page for the Live Action series — plus links to Netflix merch and soundtrack.", element: "fire", color: "#ef4444" },
  { label: "Netflix Shop", tag: "Official", name: "Netflix Shop — Avatar", description: "Official Netflix merchandise store for Avatar: The Last Airbender live action apparel and collectibles.", element: "fire", color: "#ef4444" },
  { label: "Funko", tag: "Collectibles", name: "Funko Pop! Avatar", description: "The full lineup of official Avatar Funko Pops — Aang, Zuko, Katara, Toph, and more vinyl figures.", element: "earth", color: "#7cb342" },
  { label: "Hot Topic", tag: "Apparel", name: "Hot Topic — Avatar", description: "Officially licensed Avatar apparel, accessories, bags, jewelry, and home goods. Online and in-store.", element: "water", color: "#2da6f4" },
  { label: "Amazon", tag: "Licensed", name: "Amazon — ATLA Merch", description: "Officially licensed Avatar merchandise on Amazon — includes Nickelodeon-licensed figures, books, and apparel.", element: "none", color: "#94a3b8" },
  { label: "Target", tag: "Retail", name: "Target — Avatar", description: "Licensed Avatar merchandise at Target — clothing, toys, action figures, and collectibles.", element: "fire", color: "#ef4444" },
  { label: "Dark Horse", tag: "Publisher", name: "Dark Horse Comics", description: "The official publisher of Avatar graphic novels and art books. Shop Smoke and Shadow, The Promise, and more.", element: "earth", color: "#7cb342" },
  { label: "Abrams Books", tag: "Official", name: "Abrams — Avatar Books", description: "Official Avatar novels, activity books, art of books, and the Avatar: The Last Airbender — The Art book.", element: "water", color: "#2da6f4" },
  { label: "Bookshop.org", tag: "Books", name: "Bookshop — ATLA Books", description: "Support independent bookstores while shopping official Avatar novels and graphic novels.", element: "earth", color: "#7cb342" },
  { label: "Paramount+", tag: "2026 Film", name: "Paramount+ — Aang", description: "Official Paramount+ page for the 2026 animated film 'Aang, the Last Airbender' — streaming at release.", element: "air", color: "#f59e0b" },
  { label: "Avatar Studios", tag: "Official", name: "Avatar Studios", description: "The official home of Avatar Studios at Paramount — the creative home behind all new Avatar content.", element: "spirit", color: "#a855f7" },
  { label: "Etsy", tag: "Licensed & Fan", name: "Etsy — Avatar Merch", description: "A huge selection of licensed and artist-made Avatar merchandise — enamel pins, prints, plushies, and more.", element: "spirit", color: "#a855f7" },
];

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE (real eras from timeline.html)
// ─────────────────────────────────────────────────────────────────────────────

export interface TimelineEvent {
  era: string;
  year: string;
  title: string;
  element: ElementId;
  detail: string;
}

export const TIMELINE: TimelineEvent[] = [
  { era: "Era of Beginnings", year: "~10,000 BG", title: "Wan becomes the first Avatar", element: "fire", detail: "After merging with Raava during Harmonic Convergence, Wan commits to keeping balance between the mortal and spirit worlds — beginning the Avatar Cycle." },
  { era: "Ancient Avatars", year: "~3,829 BG", title: "Avatar Szeto restores Fire Nation order", element: "fire", detail: "A bureaucrat-Avatar who served as Fire Lord's adviser, stabilizing a corrupt Fire Nation through political reform rather than raw power." },
  { era: "Ancient Avatars", year: "~312 BG", title: "Avatar Kyoshi separates Kyoshi Island", element: "earth", detail: "Using her immense power, Kyoshi splits a peninsula from the mainland to protect its people from a tyrannical Earth King — and founds the Kyoshi Warriors." },
  { era: "Ancient Avatars", year: "55 BG", title: "Avatar Roku's warning to Fire Lord Sozin", element: "fire", detail: "Roku spares his old friend Sozin after his first act of aggression — a mercy he would pay for with his life, and the world would pay for with a century of war." },
  { era: "The Hundred Year War", year: "0 AG", title: "The Air Nomad Genocide", element: "air", detail: "Sozin exploits the comet's power to wipe out the Air Nomads in a single day, hoping to end the Avatar Cycle. Aang — hidden in the iceberg — survives unknown." },
  { era: "The Hundred Year War", year: "0 AG", title: "Aang is frozen in the iceberg", element: "water", detail: "Fleeing his destiny, a young Aang is caught in a storm with Appa and encases them both in ice, suspended in the Avatar State for a hundred years." },
  { era: "The Hundred Year War", year: "99 AG", title: "Aang is freed by Katara & Sokka", element: "water", detail: "Siblings from the Southern Water Tribe break the iceberg and release the Avatar — reigniting the world's hope and the Fire Nation's hunt." },
  { era: "The Hundred Year War", year: "100 AG", title: "Fall of the Fire Nation & end of the war", element: "fire", detail: "Aang energybends Ozai's firebending away during Sozin's Comet, ending the Hundred Year War. Zuko is crowned Fire Lord and pledges an era of peace." },
  { era: "Reconstruction", year: "171 AG", title: "Korra reopens the spirit portals", element: "spirit", detail: "During a new Harmonic Convergence, Korra leaves the spirit portals open, merging the spirit and physical worlds and ushering in a new age." },
  { era: "Reconstruction", year: "174 AG", title: "Kuvira's earth empire & the new Air Nation", element: "earth", detail: "Reborn Airbenders form a new Air Nation, while Kuvira's military campaign forces Korra into one final confrontation to restore balance." },
];

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────────────────────

export const FEATURES = [
  { icon: "Compass", title: "World Map Splash", description: "The hub opens on an animated map of the Four Nations before dissolving into the archive." },
  { icon: "Search", title: "Cross-Series Search", description: "One debounced search bar queries every episode, character, and entry across the whole universe." },
  { icon: "Sparkles", title: "Ambient Particles", description: "Floating bending symbols drift across the canvas, each cycling through orbit, wave, and drift motion." },
  { icon: "Palette", title: "Elemental Themes", description: "Six palettes — Dark, Parchment, Water, Earth, Fire, and Air — re-color the entire archive instantly." },
  { icon: "ScrollText", title: "Full Chronology", description: "An accordion timeline from Avatar Wan's era through Korra's, with every major event annotated." },
  { icon: "Users", title: "Character Compendium", description: "Every major character, color-coded by element, with affiliations, voice actors, and defining quotes." },
  { icon: "Film", title: "Episode Browser", description: "Browse all 113+ episodes across ATLA, Korra, and the films — with real titles and per-book organization." },
  { icon: "BookOpen", title: "Comic Reader", description: "Read 18 graphic novels across 6 trilogies, served straight from the archive as embedded PDFs." },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2026 FILM COUNTDOWN
// ─────────────────────────────────────────────────────────────────────────────

export const FILM_2026_PREMIERE = new Date("2026-10-09T00:00:00-07:00").getTime();

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const ELEMENT_COLOR: Record<ElementId, string> = {
  air: "#f59e0b",
  water: "#2da6f4",
  earth: "#7cb342",
  fire: "#ef4444",
  spirit: "#a855f7",
  none: "#94a3b8",
};

export function totalEpisodes(): number {
  return SERIES.reduce((sum, s) => sum + s.books.reduce((b, book) => b + book.episodes.length, 0), 0);
}
