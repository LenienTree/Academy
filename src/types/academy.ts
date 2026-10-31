export interface TestimonialItem {
  name: string;
  course: string;
  college: string;
  q: string;
  img?: string;
  li?: string;
  id?: number;
  quote?: string;
  role?: string;
  avatarSeed?: number;
}

export type Testimonial = TestimonialItem;

export interface EventItem {
  img: string;
  t: string;
  venue: string;
  date: string;
  about: string;
  id?: number;
  title?: string;
  details?: string;
  sceneSeed?: number;
}

export interface StateHead {
  name: string;
  role: string;
  state: string;
  id: string;
  imageNum?: string;
}

export interface RoomPerson {
  name: string;
  role: string;
  img?: string;
  avatarSeed?: number;
}

export type MentorPerson = RoomPerson;

export interface RoomColumn {
  h: string;
  p: RoomPerson[];
  heading: string;
  people: RoomPerson[];
}

export type MentorColumn = RoomColumn;

export interface StoryStep {
  eyebrow: string;
  title: string;
  italicWord: string;
  points: string[];
}

export interface SpeakerItem {
  name: string;
  role: string;
  avatarSeed?: number;
}

export interface JudgeItem {
  name: string;
  role: string;
  avatarSeed?: number;
}

export interface ProgramFact {
  label: string;
  value: string;
}

export interface ProgramInfo {
  key: string;
  title: string;
  description: string;
  lead: string;
  facts: ProgramFact[];
  svgMarkup: string;
}

export interface ProgramTier {
  name: string;
  tag: string;
  inherit?: string;
  top?: boolean;
  items: string[];
}

export interface Pillar {
  key: string;
  title: string;
  description: string;
  lead: string;
  facts: [string, string][];
}
