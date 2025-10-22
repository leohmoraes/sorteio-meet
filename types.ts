
export interface Participant {
  id: string;
  name: string;
  timestamp: number;
}

export interface Winner extends Participant {
  tag?: string;
}

export interface EventData {
  id: string; // The 6-digit hash
  title: string;
  participants: Participant[];
  winners: Winner[];
  isRegistrationOpen: boolean;
  initialWinnerCount: number;
}

export type Events = Record<string, EventData>;
