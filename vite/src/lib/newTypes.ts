export type Database = {
  db: {
    [category: string]: {
      [event: string]: PlanningData;
    },
  },
}

export type EventLookup = {
  category: string;
  event: string;
}

export type PlanningData = {
  options: OptionData[];
  user: {
    [uid: string]: UserData;
  };
}

export type OptionData = {
  label: string;
  iso: string;
}

export type UserData = {
  created: number;
  uid: string;
  label: string;
  attending: string[]; // matches iso
  maybe: string[]; // matches iso
}
export type UserDraft = Omit<UserData, 'created' | 'uid'>;
