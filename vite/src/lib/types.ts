export type Database = {
  category: {
    [category: string]: {
      [event: string]: PlanningData;
    },
  },
}

export type EventListEntry = {
  category: string;
  event: string;
}

export type PlanningData = {
  options: OptionData[];
  participants: ParticipantData[];
}

export type OptionData = {
  label: string;
  iso: string;
}

export type ParticipantData = {
  label: string;
  attending: string[]; // matches iso
  maybe: string[]; // matches iso
}
