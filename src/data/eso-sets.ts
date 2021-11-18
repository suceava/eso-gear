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
export const Strings_EsoArmorType = {
  [EsoArmorType.heavy]: 'Heavy',
  [EsoArmorType.light]: 'Light',
  [EsoArmorType.medium]: 'Medium',
  [EsoArmorType.shield]: 'Shield'
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
export const Strings_EsoWeaponType = {
  [EsoWeaponType.axe]: 'Axe',
  [EsoWeaponType.dagger]: 'Dagger',
  [EsoWeaponType.mace]: 'Mace',
  [EsoWeaponType.sword]: 'Sword',
  [EsoWeaponType.battleAxe]: 'Battle Axe',
  [EsoWeaponType.greatsword]: 'Greatsword',
  [EsoWeaponType.maul]: 'Maul',
  [EsoWeaponType.bow]: 'Bow',
  [EsoWeaponType.restorationStaff]: 'Restoration Staff',
  [EsoWeaponType.infernoStaff]: 'Inferno Staff',
  [EsoWeaponType.iceStaff]: 'Ice Staff',
  [EsoWeaponType.lightningStaff]: 'Lightning Staff'
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
export const Strings_EsoSlot = {
  [EsoSlot.chest]: 'Chest',
  [EsoSlot.feet]: 'Feet',
  [EsoSlot.hands]: 'Hands',
  [EsoSlot.head]: 'Head',
  [EsoSlot.legs]: 'Legs',
  [EsoSlot.shoulders]: 'Shoulders',
  [EsoSlot.waist]: 'Waist',
  [EsoSlot.neck]: 'Neck',
  [EsoSlot.ring]: 'Ring',
  [EsoSlot.offHand]: 'Off Hand',
  [EsoSlot.oneHand]: 'One Hand',
  [EsoSlot.twoHands]: 'Two Hands'
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
export const Strings_EsoStat = {
  [EsoStat.armor]: 'Armor',
  [EsoStat.maximumMagicka]: 'Maximum Magicka',
  [EsoStat.maximumHealth]: 'Maximum Health',
  [EsoStat.maximumStamina]: 'Maximum Stamina',
  [EsoStat.magickaRecovery]: 'Magicka Recovery',
  [EsoStat.healthRecovery]: 'Health Recovery',
  [EsoStat.staminaRecovery]: 'Stamina Recovery',
  [EsoStat.spellDamage]: 'Spell Damage',
  [EsoStat.spellCritical]: 'Spell Critical',
  [EsoStat.spellPenetration]: 'Spell Penetration',
  [EsoStat.weaponDamage]: 'Weapon Damage',
  [EsoStat.weaponCritical]: 'Weapon Critical',
  [EsoStat.physicalPenetration]: 'Physical Penetration',
  [EsoStat.spellResistance]: 'Spell Resistance',
  [EsoStat.physicalResistance]: 'Physical Resistance',
  [EsoStat.criticalResistance]: 'Critical Resistance',
  [EsoStat.criticalChance]: 'Critical Chance',
  [EsoStat.offensivePenetration]: 'Offensive Penetration',
  [EsoStat.healingDone]: 'Healing Done',
  [EsoStat.healingTaken]: 'Healing Taken'
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
  maximumHealth = 'maximumHealth',
  maximumMagicka = 'maximumMagicka',
  maximumStamina = 'maximumStamina',
  healthRecovery = 'healthRecovery',
  magickaRecovery = 'magickaRecovery',
  staminaRecovery = 'staminaRecovery',
  lifeDrain = 'lifeDrain',
  absorbMagicka = 'absorbMagicka',
  absorbStamina = 'absorbStamina',
  multiEffect = 'multiEffect'
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
 