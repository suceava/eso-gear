enum EsoSetType {
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

enum EsoArmorType {
  heavy = 'heavy',
  light = 'light',
  medium = 'medium'
};

enum EsoSlot {
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

enum EsoStat {
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

interface EsoBonusStat {
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

interface EsoSetBonus {
  string: {
    description: string,
    stats: Array<EsoBonusStat> | undefined,
    buffs: Array<string> | undefined
  }
}

interface EsoItem {
  name: string,
  image: string,
  slot: EsoSlot,
  armorType: EsoArmorType | undefined
}

interface EsoLocation {
  name: string,
  link: string
}

interface EsoSet {
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
  location: Array<EsoLocation>,
  items: {
    list: Array<EsoItem>
  }
}