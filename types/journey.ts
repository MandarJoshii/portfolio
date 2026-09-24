export type JourneyKind = "education" | "work" | "project";

export interface JourneyEntry {
  id: string;
  period: string;
  title: string;
  org?: string;
  kind: JourneyKind;
  summary: string;
}
