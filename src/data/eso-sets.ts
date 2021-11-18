export enum EsoSetType {
  arena = 'Arena',
  craftable = 'Craftable',
  dungeon = 'Dungeon',
  monster = 'Monster Set',
  mythic = 'Mythic',
  overland = 'Overland',
  pvp = 'PvP',
  trial = 'Trial'
};

export enum EsoItemRarity {
  normal = 'normal',
  fine = 'fine',
  superior = 'superior',
  epic = 'epic',
  legendary = 'legendary',
  mythic = 'mythic'
}

export enum EsoItemType {
  armor = 'armor',
  jewelry = 'jewelry',
  weapon = 'weapon'
};

export enum EsoArmorType {
  heavy = 'heavy',
  light = 'light',
  medium = 'medium',
  shield = 'shield'
};

export enum EsoWeaponType {
  axe = 'axe',
  dagger = 'dagger',
  mace = 'mace',
  sword = 'sword',

  battleAxe = 'battleAxe',
  greatsword = 'greatsword',
  maul = 'maul',

  bow = 'bow',

  restorationStaff = 'restorationStaff',
  infernoStaff = 'infernoStaff',
  iceStaff = 'iceStaff',
  lightningStaff = 'lightningStaff'
};

export enum EsoDamageType {
  physical = 'physicalDamage',
  magic = 'magicDamage',
  fire = 'fireDamage',
  cold = 'coldDamage',
  lightning = 'lightningDamage',
  poison = 'poisonDamage',
  disease = 'diseaseDamage'
}

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

  maximumMagicka = 'maximumMagicka',
  maximumHealth = 'maximumHealth',
  maximumStamina = 'maximumStamina',
  magickaRecovery = 'magickaRecovery',
  healthRecovery = 'healthRecovery',
  staminaRecovery = 'staminaRecovery',

  spellDamage = 'spellDamage',
  spellCritical = 'spellCritical',
  spellPenetration = 'spellPenetration',
  weaponDamage = 'weaponDamage',
  weaponCritical = 'weaponCritical',
  physicalPenetration = 'physicalPenetration',

  spellResistance = 'spellResistance',
  physicalResistance = 'physicalResistance',
  criticalResistance = 'criticalResistance',

  criticalChance = 'criticalChance',
  offensivePenetration = 'offensivePenetration',
  healingDone = 'healingDone',
  healingTaken = 'healingTaken'
};

export type EsoBonusStats = {
  [key in EsoStat]: number | undefined;
}

export type EsoSetBonus = {
  description: string;
  htmlDescription: string;
  stats?: EsoBonusStats | undefined;
  buffs?: string[] | undefined;
};

export type EsoSetBonusKey = '1' | '2' | '3' | '4' | '5';

export enum EsoItemEnchantment {
  // armor
  maximumHealth = 'maximumHealth',
  maximumMagicka = 'maximumMagicka',
  maximumStamina = 'maximumStamina',
  multiEffect = 'multiEffect',
  // jewelry
  healthRecovery = 'healthRecovery',
  magickaRecovery = 'magickaRecovery',
  staminaRecovery = 'staminaRecovery',
  // weapon
  lifeDrain = 'lifeDrain',
  absorbMagicka = 'absorbMagicka',
  absorbStamina = 'absorbStamina'
};
export const esoItemEnchantmentToEsoStat = (enchantment: EsoItemEnchantment): EsoStat | undefined => {
  switch (enchantment) {
    case EsoItemEnchantment.maximumHealth:
      return EsoStat.maximumHealth;
    case EsoItemEnchantment.maximumMagicka:
      return EsoStat.maximumMagicka;
    case EsoItemEnchantment.maximumStamina:
      return EsoStat.maximumStamina;
    case EsoItemEnchantment.healthRecovery:
      return EsoStat.healthRecovery;
    case EsoItemEnchantment.magickaRecovery:
      return EsoStat.magickaRecovery;
    case EsoItemEnchantment.staminaRecovery:
      return EsoStat.staminaRecovery;

    default:
      return undefined;
  }
};

export type EsoItem = {
  id: number;
  image: string;
  name: string;
  setName: string;
  slot: EsoSlot;
  itemType: EsoItemType;
  armorType?: EsoArmorType | undefined;
  weaponType?: EsoWeaponType | undefined;

  // overridden on build
  rarity: EsoItemRarity;
  enchantment: EsoItemEnchantment;
};

export type EsoLocation = {
  name: string;
  link: string;
};

export type EsoSet = {
  id: number;
  image: string;
  name: string;
  type: EsoSetType;
  link: string;
  htmlDescription: string;
  bonusCount: number;
  bonuses: {
    [key in EsoSetBonusKey]: EsoSetBonus | undefined;
  }
  dlc?: string | undefined;
  style?: string | undefined;
  location: EsoLocation[];
  items: {
    list: EsoItem[];
  }
};


export const esoWeaponTypeToEsoSlot = (weaponType: EsoWeaponType): EsoSlot => {
  switch (weaponType) {
    case EsoWeaponType.axe:
    case EsoWeaponType.dagger:
    case EsoWeaponType.mace:
    case EsoWeaponType.sword:
      return EsoSlot.oneHand;

    default:
      return EsoSlot.twoHands;
  }
};
