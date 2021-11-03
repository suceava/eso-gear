export enum EsoSetType {
  arena = 'Arena',
  craftable = 'Craftable',
  dungeon = 'Dungeon',
  monster = 'Monster Set',
  mythic = 'Mythic',
  overland = 'Overland',
  pvp = 'PvP',
  trial = 'Trial',
  unknown = 'Unknown'
};

export enum EsoArmorType {
  heavy = 'heavy',
  light = 'light',
  medium = 'medium'
};

export enum EsoSlot {
  chest = 'chest',
  feet = 'feet',
  hands = 'hands',
  head = 'head',
  legs = 'legs',
  shoulders = 'shoulders',
  waist = 'waist',

  neck = 'neck',
  ring = 'ring',

  offHand = 'offHand',
  oneHand = 'oneHand',
  twoHands = 'twoHands'
};

export enum EsoStat {
  armor = 'armor',
  maximumHealth = 'maximumHealth',
  maximumMagicka = 'maximumMagicka',
  maximumStamina = 'maximumStamina',
  healthRecovery = 'healthRecovery',
  magickaRecovery = 'magickaRecovery',
  staminaRecovery = 'staminaRecovery',
  spellDamage = 'spellDamage',
  weaponDamage = 'weaponDamage',
  spellCritical = 'spellCritical',
  weaponCritical = 'weaponCritical',
  criticalChance = 'criticalChance',
  criticalResistance = 'criticalResistance',
  spellPenetration = 'spellPenetration',
  physicalPenetration = 'physicalPenetration',
  offensivePenetration = 'offensivePenetration',
  spellResistance = 'spellResistance',
  physicalResistance = 'physicalResistance',
  healingDone = 'healingDone',
  healingTaken = 'healingTaken'
}

export interface EsoBonusStat {
  [key as EsoStat]: number | undefined
  // armor: number | undefined,
  // maximumHealth: number | undefined,
  // maximumMagicka: number | undefined,
  // maximumStamina: number | undefined,
  // healthRecovery: number | undefined,
  // magickaRecovery: number | undefined,
  // staminaRecovery: number | undefined,
  // spellDamage: number | undefined,
  // weaponDamage: number | undefined,
  // spellCritical: number | undefined,
  // weaponCritical: number | undefined,
  // criticalChance: number | undefined,
  // criticalResistance: number | undefined,
  // spellPenetration: number | undefined,
  // physicalPenetration: number | undefined,
  // offensivePenetration: number | undefined,
  // spellResistance: number | undefined,
  // physicalResistance: number | undefined,
  // healingDone: number | undefined,
  // healingTaken: number | undefined,
}

export interface EsoSetBonus {
  string: {
    description: string,
    stats: EsoBonusStat[] | undefined,
    buffs: string[] | undefined
  }
}

export interface EsoItem {
  name: string,
  image: string,
  slot: EsoSlot,
  armorType: EsoArmorType | undefined
}

export interface EsoLocation {
  name: string,
  link: string
}

export interface EsoSet {
  image: string,
  name: string,
  type: EsoSetType,
  link: string,
  htmlDescription: string,
  bonuses: {
    [key as string]: ESOSetBonus
  }
  dlc: string | null,
  style: string | null,
  location: EsoLocation[],
  items: {
    list: EsoItem[]
  }
}
