export enum SetType {
  arena = 'Arena',
  craftable = 'Craftable',
  dungeon = 'Dungeon',
  monster = 'Monster Set',
  mythic = 'Mythic',
  overland = 'Overland',
  pvp = 'PvP',
  trial = 'Trial',
  unknown = 'Unknown'
}

interface Stat {
  armor: number | undefined,
  armor: number | undefined,
}
export interface ESOSetBonus {
  string: {
    description: string,
    stats: [{
      string: string
    }]
  }
}

export type ESOSet = {
  image: string,
  name: string,
  type: SetType,
  link: string,
  htmlDescription: string,
  bonuses: {
    string: ESOSetBonus
  }
  dlc: string | null,
  style: string | null,
  location: [],
  items: Array<object>
}
