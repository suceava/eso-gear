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

export enum EsoItemType {
  armor = 'armor',
  jewelry = 'jewelry',
  weapons = 'weapons'
}

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
};

export type EsoBonusStat = {
  [key in EsoStat]: number | undefined
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

export type EsoSetBonus = {
  description: string,
  stats: EsoBonusStat[] | undefined,
  buffs: string[] | undefined
};

export type EsoItem = {
  name: string,
  image: string,
  slot: EsoSlot,
  itemType: EsoItemType,
  armorType: EsoArmorType | undefined
};

export type EsoLocation = {
  name: string,
  link: string
};

export type EsoSet = {
  image: string,
  name: string,
  type: EsoSetType,
  link: string,
  htmlDescription: string,
  bonuses: {
    '1': EsoSetBonus | undefined,
    '2': EsoSetBonus | undefined,
    '3': EsoSetBonus | undefined,
    '4': EsoSetBonus | undefined,
    '5': EsoSetBonus | undefined
  }
  dlc: string | null,
  style: string | null,
  location: EsoLocation[],
  items: {
    list: EsoItem[]
  }
};
