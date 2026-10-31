import {
  TestimonialItem,
  EventItem,
  StateHead,
  RoomColumn,
  StoryStep,
  SpeakerItem,
  JudgeItem,
  ProgramInfo,
  ProgramTier,
  Pillar,
} from "@/types/academy";

export const REGISTRATION_URL = "https://www.lenienttree.com/academy";
export const TBA = "To be added";
export const LINKEDIN_URL = "https://www.linkedin.com/";
export const IN_URL = LINKEDIN_URL;
export const INSVG =
  '<svg viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" fill="#0A66C2"/><circle cx="10.5" cy="10.5" r="2.5" fill="#fff"/><rect x="8.3" y="14.5" width="4.4" height="13" fill="#fff"/><path fill="#fff" d="M15.5 14.5h4.2v1.9c.7-1.2 2.1-2.2 4.2-2.2 4.2 0 5 2.8 5 6.4v6.9h-4.4v-6.1c0-1.5 0-3.3-2-3.3s-2.3 1.5-2.3 3.2v6.2h-4.4z"/></svg>';

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Christina",
    course: "FullStack+AI",
    college: "CUSAT, College of Engineering, Ernakulam",
    img: "/assets/christina.jpg",
    li: "https://www.linkedin.com/",
    q: "The program helped me better understand deployment and practical full-stack application workflows.",
    id: 0,
    quote:
      "The program helped me better understand deployment and practical full-stack application workflows.",
    role: "FullStack+AI · CUSAT, College of Engineering, Ernakulam",
    avatarSeed: 1,
  },
  {
    name: "Name Surname",
    course: "FullStack+AI",
    college: "College Name",
    q: "Nobody asked which college I came from. They asked what I could show.",
    id: 1,
    quote: "Nobody asked which college I came from. They asked what I could show.",
    role: "FullStack+AI · College Name",
    avatarSeed: 2,
  },
  {
    name: "Name Surname",
    course: "FullStack+AI",
    college: "College Name",
    q: "The theory days were short and sharp. The building days are where it clicked.",
    id: 2,
    quote:
      "The theory days were short and sharp. The building days are where it clicked.",
    role: "FullStack+AI · College Name",
    avatarSeed: 3,
  },
  {
    name: "Name Surname",
    course: "FullStack+AI",
    college: "College Name",
    q: "Working on a real project inside a company showed me how a team actually ships.",
    id: 3,
    quote:
      "Working on a real project inside a company showed me how a team actually ships.",
    role: "FullStack+AI · College Name",
    avatarSeed: 4,
  },
  {
    name: "Name Surname",
    course: "FullStack+AI",
    college: "College Name",
    q: "I came with a half-formed idea and left with a prototype plan.",
    id: 4,
    quote: "I came with a half-formed idea and left with a prototype plan.",
    role: "FullStack+AI · College Name",
    avatarSeed: 5,
  },
  {
    name: "Name Surname",
    course: "FullStack+AI",
    college: "College Name",
    q: "Live sessions meant I could ask the founder my question right then.",
    id: 5,
    quote:
      "Live sessions meant I could ask the founder my question right then.",
    role: "FullStack+AI · College Name",
    avatarSeed: 6,
  },
];

export const EVENTS: EventItem[] = [
  {
    img: "/assets/events/evoke.jpg",
    t: "Evoke",
    venue: "To be added",
    date: "To be added",
    about: "Full event details will be added here.",
    id: 0,
    title: "Evoke",
    details: "To be added",
    sceneSeed: 1,
  },
  {
    img: "/assets/events/hackinfinity.jpg",
    t: "Hack∞Finity",
    venue: "SIMATS Engineering",
    date: "To be added",
    about:
      "An exclusive hackathon for agentic AI solution development, organised by the Department of Research & Innovation.",
    id: 1,
    title: "Hack∞Finity",
    details: "SIMATS Engineering",
    sceneSeed: 2,
  },
  {
    img: "/assets/events/campus-event-1.jpg",
    t: "Campus event",
    venue: "To be added",
    date: "To be added",
    about: "The event name and full details will be added here.",
    id: 2,
    title: "Campus event",
    details: "To be added",
    sceneSeed: 3,
  },
  {
    img: "/assets/events/gec-thrissur.jpg",
    t: "Govt. Engineering College, Thrissur",
    venue: "Gloria Dopi Kumar Alumni Hall",
    date: "To be added",
    about: "Full event details will be added here.",
    id: 3,
    title: "Govt. Engineering College, Thrissur",
    details: "Gloria Dopi Kumar Alumni Hall",
    sceneSeed: 4,
  },
  {
    img: "/assets/events/campus-event-2.jpg",
    t: "Campus event",
    venue: "To be added",
    date: "To be added",
    about: "The event name and full details will be added here.",
    id: 4,
    title: "Campus event",
    details: "To be added",
    sceneSeed: 5,
  },
];

export const STATE_HEADS: StateHead[] = [
  {
    name: "Samyak Bhangare",
    role: "State Head",
    state: "Maharashtra",
    id: "01",
    imageNum: "01",
  },
  {
    name: "Pranjal Dey",
    role: "Community Head",
    state: "West Bengal",
    id: "02",
    imageNum: "02",
  },
  {
    name: "Abhishek Singh",
    role: "State Head",
    state: "Chhattisgarh",
    id: "03",
    imageNum: "03",
  },
  {
    name: "Dev Shukla",
    role: "State Head",
    state: "Uttar Pradesh",
    id: "04",
    imageNum: "04",
  },
  {
    name: "Anjal N S",
    role: "State Head",
    state: "Tamil Nadu",
    id: "05",
    imageNum: "05",
  },
  {
    name: "Mohammed Fayaz",
    role: "State Head",
    state: "Jammu & Kashmir",
    id: "06",
    imageNum: "06",
  },
  {
    name: "Bhavyakumar Pandya",
    role: "State Head",
    state: "Gujarat",
    id: "07",
    imageNum: "07",
  },
  {
    name: "Pusp",
    role: "State Head",
    state: "Bihar",
    id: "08",
    imageNum: "08",
  },
  {
    name: "Meera Surendran",
    role: "State Head",
    state: "Kerala",
    id: "09",
    imageNum: "09",
  },
  {
    name: "M. V. Reddy",
    role: "State Head",
    state: "Andhra Pradesh",
    id: "10",
    imageNum: "10",
  },
  {
    name: "Anand Bobba",
    role: "State Head",
    state: "Telangana",
    id: "12",
    imageNum: "12",
  },
];

export const HEADS = STATE_HEADS;

export const ROOM: RoomColumn[] = [
  {
    h: "Founders",
    heading: "Founders",
    p: [
      {
        name: "Name Surname",
        role: "Founder, SaaS company",
        avatarSeed: 60,
      },
    ],
    people: [
      {
        name: "Name Surname",
        role: "Founder, SaaS company",
        avatarSeed: 60,
      },
    ],
  },
  {
    h: "Academics",
    heading: "Academics",
    p: [
      {
        name: "Academia",
        role: "Conversation at Manipal Institute of Technology",
        img: "/assets/academia.jpg",
        avatarSeed: 63,
      },
    ],
    people: [
      {
        name: "Academia",
        role: "Conversation at Manipal Institute of Technology",
        img: "/assets/academia.jpg",
        avatarSeed: 63,
      },
    ],
  },
  {
    h: "Tech",
    heading: "Tech",
    p: [
      {
        name: "Name Surname",
        role: "Senior engineer, product company",
        avatarSeed: 66,
      },
    ],
    people: [
      {
        name: "Name Surname",
        role: "Senior engineer, product company",
        avatarSeed: 66,
      },
    ],
  },
];

export const ROOM_DATA = ROOM;

export const STORY_STEPS: StoryStep[] = [
  {
    eyebrow: "Why us",
    title: "Not a conventional school.",
    italicWord: "school.",
    points: [
      "Live Lectures Only",
      "Live Webinars & Offline Events",
      "Learn from Industry Leaders",
    ],
  },
  {
    eyebrow: "What is Lenienttree",
    title: "Three programs, one roof.",
    italicWord: "one roof.",
    points: [
      "Live Upskilling & Certifications",
      "Industry Internships",
      "Career & Founder Development",
    ],
  },
  {
    eyebrow: "What is Lenienttree",
    title: "Quality over quantity.",
    italicWord: "quantity.",
    points: [
      "Personalized Learning Paths",
      "Skills Over Labels",
      "Quality Over Quantity",
    ],
  },
  {
    eyebrow: "What is Lenienttree",
    title: "A pathway, not a course.",
    italicWord: "a course.",
    points: [
      "Learn & Gain Exposure",
      "Develop Your Potential",
      "Prototype & Build",
    ],
  },
];

export const SPEAKERS: SpeakerItem[] = [
  { name: "Name Surname", role: "Founder, Company", avatarSeed: 20 },
  { name: "Name Surname", role: "Business owner, Company", avatarSeed: 21 },
  { name: "Name Surname", role: "Industry mentor", avatarSeed: 22 },
  { name: "Name Surname", role: "Founder, Startup", avatarSeed: 23 },
  { name: "Name Surname", role: "Engineering lead", avatarSeed: 24 },
  { name: "Name Surname", role: "Founder, Company", avatarSeed: 25 },
];

export const JUDGES: JudgeItem[] = [
  { name: "Name Surname", role: "Hackathon judge, Founder", avatarSeed: 40 },
  { name: "Name Surname", role: "Industry expert", avatarSeed: 41 },
  { name: "Name Surname", role: "Professor, College", avatarSeed: 42 },
  { name: "Name Surname", role: "Investor, Venture firm", avatarSeed: 43 },
  { name: "Name Surname", role: "Engineering manager", avatarSeed: 44 },
  { name: "Name Surname", role: "Founder, Company", avatarSeed: 45 },
];

export const PROGRAMS: ProgramInfo[] = [
  {
    key: "live-classes",
    title: "Live classes",
    description:
      "Structured live programs led by founders and the Lenienttree team, with real industry exposure.",
    lead: "Structured live programs led by founders, business owners and the Lenienttree team. You learn the skills and earn recognised certification, in real time, from people who have built things.",
    facts: [
      { label: "Format", value: "Live sessions, not recorded lectures" },
      {
        label: "FullStack+AI",
        value: "17 days of theory, then 13 days of building",
      },
      { label: "Certification", value: "Recognised certification" },
      { label: "Schedule", value: TBA },
      { label: "Syllabus", value: TBA },
    ],
    svgMarkup: `<svg viewBox="0 0 320 352" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="w-full h-full block"><rect width="320" height="352" fill="#19181D"/><rect x="28" y="20" width="64" height="24" fill="#FE6500"/><text x="40" y="37" font-family="Inter,sans-serif" font-size="11" font-weight="700" letter-spacing="2" fill="#19181D">LIVE</text><rect x="28" y="60" width="264" height="170" fill="#F5EFE3"/><circle cx="92" cy="128" r="26" fill="#D8A27A"/><path d="M52 230C52 188 70 168 92 168C114 168 132 188 132 230Z" fill="#FE6500"/><path d="M66 120C66 98 80 92 92 92C104 92 118 98 118 120C112 110 104 106 92 106C80 106 72 110 66 120Z" fill="#19181D"/><rect x="156" y="84" width="112" height="12" fill="#19181D"/><rect x="156" y="108" width="84" height="12" fill="#FE6500"/><rect x="156" y="132" width="100" height="6" fill="#5D5B62"/><rect x="156" y="148" width="70" height="6" fill="#5D5B62"/><rect x="28" y="248" width="150" height="26" fill="#F5EFE3"/><rect x="118" y="284" width="174" height="26" fill="#FE6500"/><circle cx="46" cy="332" r="9" fill="#F1C9A5"/><circle cx="76" cy="332" r="9" fill="#8D5A3B"/><circle cx="106" cy="332" r="9" fill="#B97B54"/><circle cx="136" cy="332" r="9" fill="#F6D8C2"/></svg>`,
  },
  {
    key: "offline-internship",
    title: "Offline Internship",
    description:
      "Structured training, then practical offline internships on real projects, so you see how companies operate.",
    lead: "Structured training followed by practical offline internships on real projects, so you see how companies actually operate before your first job.",
    facts: [
      {
        label: "Format",
        value: "Structured training, then an offline internship",
      },
      { label: "Where", value: "Inside real companies, on real projects" },
      { label: "Duration", value: TBA },
      { label: "Locations", value: TBA },
      { label: "Projects", value: TBA },
    ],
    svgMarkup: `<svg viewBox="0 0 320 352" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="w-full h-full block"><rect width="320" height="352" fill="#FE6500"/><rect x="28" y="30" width="96" height="76" fill="#F5EFE3"/><rect x="74" y="30" width="3" height="76" fill="#FE6500"/><rect x="28" y="66" width="96" height="3" fill="#F5EFE3"/><circle cx="100" cy="176" r="24" fill="#B97B54"/><path d="M58 262C58 214 76 202 100 202C124 202 142 214 142 262Z" fill="#19181D"/><path d="M76 170C76 150 90 146 100 146C112 146 124 150 124 170C118 162 110 158 100 158C90 158 82 162 76 170Z" fill="#19181D"/><circle cx="224" cy="166" r="24" fill="#F1C9A5"/><path d="M182 262C182 214 200 202 224 202C248 202 266 214 266 262Z" fill="#F5EFE3"/><path d="M200 160C200 140 214 136 224 136C236 136 248 140 248 160C242 152 234 148 224 148C214 148 206 152 200 160Z" fill="#7A4A2B"/><rect x="0" y="262" width="320" height="90" fill="#19181D"/><rect x="52" y="226" width="96" height="64" fill="#F5EFE3"/><rect x="62" y="236" width="50" height="6" fill="#19181D"/><rect x="62" y="250" width="72" height="6" fill="#FE6500"/><rect x="62" y="264" width="40" height="6" fill="#19181D"/><rect x="40" y="290" width="120" height="8" fill="#F5EFE3"/><rect x="200" y="238" width="90" height="52" fill="#F5EFE3"/><rect x="210" y="248" width="40" height="6" fill="#19181D"/><rect x="210" y="262" width="62" height="6" fill="#FE6500"/><rect x="188" y="294" width="114" height="8" fill="#F5EFE3"/></svg>`,
  },
  {
    key: "career-accelerator",
    title: "Career Accelerator",
    description:
      "Guidance toward the career you choose, or a company of your own, with support for promising ideas.",
    lead: "Guidance toward the path you choose: a first job, further study or a company of your own. Selected students and graduates can move into the Prototype Track.",
    facts: [
      { label: "Focus", value: "Career guidance and founder development" },
      { label: "Prototype Track", value: "For selected students and graduates" },
      {
        label: "Support",
        value: "Idea validation and company-creation guidance",
      },
      { label: "Duration", value: TBA },
      { label: "Eligibility", value: TBA },
    ],
    svgMarkup: `<svg viewBox="0 0 320 352" preserveAspectRatio="xMidYMid slice" aria-hidden="true" class="w-full h-full block"><rect width="320" height="352" fill="#F5EFE3"/><rect x="24" y="288" width="55" height="44" fill="#19181D"/><rect x="79" y="244" width="55" height="88" fill="#19181D"/><rect x="134" y="200" width="55" height="132" fill="#19181D"/><rect x="189" y="156" width="55" height="176" fill="#19181D"/><rect x="244" y="112" width="55" height="220" fill="#FE6500"/><circle cx="136" cy="196" r="13" fill="#D8A27A"/><rect x="124" y="208" width="24" height="36" fill="#FE6500"/><path d="M40 140L220 56" stroke="#FE6500" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M196 36L246 52L214 94Z" fill="#FE6500"/><rect x="236" y="104" width="56" height="56" fill="#19181D"/><use href="#L" x="251" y="112" width="26" height="40" fill="#fff"/></svg>`,
  },
];

export const TIERS: ProgramTier[] = [
  {
    name: "Sprout",
    tag: "Standard",
    items: ["Live classes", "Mentorship from founders and industry mentors"],
  },
  {
    name: "Sapling",
    tag: "Upgraded",
    inherit: "Sprout",
    items: ["Attend five hackathons a year"],
  },
  {
    name: "Tree",
    tag: "Complete",
    top: true,
    inherit: "Sapling",
    items: ["Lenienttree goodies: notebook, tote and bottle"],
  },
];

export const PILLARS: Pillar[] = [
  {
    key: "live-classes",
    title: "Live classes",
    description:
      "Structured live programs led by founders and the Lenienttree team, with real industry exposure.",
    lead: "Structured live programs led by founders, business owners and the Lenienttree team. You learn the skills and earn recognised certification, in real time, from people who have built things.",
    facts: [
      ["Format", "Live sessions, not recorded lectures"],
      ["FullStack+AI", "17 days of theory, then 13 days of building"],
      ["Certification", "Recognised certification"],
      ["Schedule", "To be added"],
      ["Syllabus", "To be added"],
    ],
  },
  {
    key: "offline-internship",
    title: "Offline Internship",
    description:
      "Structured training, then practical offline internships on real projects, so you see how companies operate.",
    lead: "Structured training followed by practical offline internships on real projects, so you see how companies actually operate before your first job.",
    facts: [
      ["Format", "Structured training, then an offline internship"],
      ["Where", "Inside real companies, on real projects"],
      ["Duration", "To be added"],
      ["Locations", "To be added"],
      ["Projects", "To be added"],
    ],
  },
  {
    key: "career-accelerator",
    title: "Career Accelerator",
    description:
      "Guidance toward the career you choose, or a company of your own, with support for promising ideas.",
    lead: "Guidance toward the path you choose: a first job, further study or a company of your own. Selected students and graduates can move into the Prototype Track.",
    facts: [
      ["Focus", "Career guidance and founder development"],
      ["Prototype Track", "For selected students and graduates"],
      ["Support", "Idea validation and company-creation guidance"],
      ["Duration", "To be added"],
      ["Eligibility", "To be added"],
    ],
  },
];
