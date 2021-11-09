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
export const armorTypeToString = (armorType: EsoArmorType | undefined): string => {
  if (!armorType) {
    return '';
  }

  switch (armorType) {
    case EsoArmorType.heavy:
      return 'Heavy';
    case EsoArmorType.light:
      return 'Light';
    case EsoArmorType.medium:
      return 'Medium';
    default:
      return '';
  }
};

export enum EsoWeaponType {
  axe = 'axe',
  bow = 'bow',
  dagger = 'dagger',
  mace = 'mace',
  sword = 'sword',

  battleAxe = 'battleAxe',
  greatSword = 'greatSword',
  maul = 'maul',

  restorationStaff = 'restorationStaff',
  infernoStaff = 'infernoStaff',
  iceStaff = 'iceStaff',
  lightningStaff = 'lightningStaff'
};
export const weaponTypeToString = (weaponType: EsoWeaponType | undefined): string => {
  if (!weaponType) {
    return '';
  }

  switch (weaponType) {
    case EsoWeaponType.axe:
      return 'Axe';
    case EsoWeaponType.bow:
      return 'Bow';
    case EsoWeaponType.dagger:
      return 'Dagger';
    case EsoWeaponType.mace:
      return 'Mace';
    case EsoWeaponType.sword:
      return 'Sword';
    case EsoWeaponType.battleAxe:
      return 'Battle Axe';
    case EsoWeaponType.greatSword:
      return 'Greatsword';
    case EsoWeaponType.maul:
      return 'Maul';
    case EsoWeaponType.restorationStaff:
      return 'Restoration Staff';
    case EsoWeaponType.infernoStaff:
      return 'Inferno Staff';
    case EsoWeaponType.iceStaff:
      return 'Ice Staff';
    case EsoWeaponType.lightningStaff:
      return 'Lightning Staff';
    default:
      return '';
  }
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

export type EsoBonusStats = {
  [key in EsoStat]: number | undefined;
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
  description: string;
  stats?: EsoBonusStats | undefined;
  buffs?: string[] | undefined;
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
  enchantment?: string | undefined;
  trait?: string | undefined;
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
  bonuses: {
    '1'?: EsoSetBonus | undefined;
    '2'?: EsoSetBonus | undefined;
    '3'?: EsoSetBonus | undefined;
    '4'?: EsoSetBonus | undefined;
    '5'?: EsoSetBonus | undefined;
  }
  dlc: string | null;
  style: string | null;
  location: EsoLocation[];
  items: {
    list: EsoItem[];
  }
};
 