import {
  EsoArmorStatsItemEnchantmentProps,
  EsoJewelryStatsItemEnchantmentProps,
  EsoWeaponStatsItemEnchantmentProps
} from '../data/eso-item-stats';
import {
  EsoBonusStats,
  EsoItem,
  EsoItemEnchantment,
  EsoItemType,
  EsoSlot,
  esoItemEnchantmentToEsoStat
} from '../data/eso-sets';
import { getArmorStats, getJewelryStats, getWeaponStats } from '../data/esoItemStatsDataLoader';

export enum EquipmentSlot {
  head = 'head',
  shoulders = 'shoulders',
  chest = 'chest',
  legs = 'legs',
  hands = 'hands',
  feet = 'feet',
  waist = 'waist',
  neck = 'neck',
  ring1 = 'ring1',
  ring2 = 'ring2',
  mainHand1 = 'mainHand1',
  offHand1 = 'offHand1',
  mainHand2 = 'mainHand2',
  offHand2 = 'offHand2'
}

// convert EquipmentSlot to EsoSlot
export const equipmentSlotToEsoSlot = (equipmentSlot: EquipmentSlot): EsoSlot | EsoSlot[] => {
  switch (equipmentSlot) {
    case EquipmentSlot.head:
      return EsoSlot.head;
    case EquipmentSlot.shoulders:
      return EsoSlot.shoulders;
    case EquipmentSlot.hands:
      return EsoSlot.hands;
    case EquipmentSlot.legs:
      return EsoSlot.legs;
    case EquipmentSlot.chest:
      return EsoSlot.chest;
    case EquipmentSlot.waist:
      return EsoSlot.waist;
    case EquipmentSlot.feet:
      return EsoSlot.feet;
    case EquipmentSlot.neck:
      return EsoSlot.neck;
    case EquipmentSlot.ring1:
    case EquipmentSlot.ring2:
      return EsoSlot.ring;
    case EquipmentSlot.mainHand1:
    case EquipmentSlot.mainHand2:
      return [EsoSlot.oneHand, EsoSlot.twoHands];
    case EquipmentSlot.offHand1:
    case EquipmentSlot.offHand2:
      return [EsoSlot.oneHand, EsoSlot.offHand];
  }
};
// convert EsoSlot to EquipmentSlot
export const esoSlotToEquipmentSlot = (esoSlot: EsoSlot, isMainWeaponSet: boolean = true): EquipmentSlot => {
  switch (esoSlot) {
    case EsoSlot.head:
      return EquipmentSlot.head;
    case EsoSlot.shoulders:
      return EquipmentSlot.shoulders;
    case EsoSlot.hands:
      return EquipmentSlot.hands;
    case EsoSlot.legs:
      return EquipmentSlot.legs;
    case EsoSlot.chest:
      return EquipmentSlot.chest;
    case EsoSlot.waist:
      return EquipmentSlot.waist;
    case EsoSlot.feet:
      return EquipmentSlot.feet;
    case EsoSlot.neck:
      return EquipmentSlot.neck;
    case EsoSlot.ring:
      return EquipmentSlot.ring1;
    case EsoSlot.oneHand:
      return isMainWeaponSet ? EquipmentSlot.mainHand1 : EquipmentSlot.mainHand2;
    case EsoSlot.twoHands:
      return isMainWeaponSet ? EquipmentSlot.mainHand1 : EquipmentSlot.mainHand2;
    case EsoSlot.offHand:
      return isMainWeaponSet ? EquipmentSlot.offHand1 : EquipmentSlot.offHand2;
  }
};

export type EquipmentItemEnchantment = {
  enchantment: EsoItemEnchantment;
  values: number[];
  stats?: EsoBonusStats;
};

// get the enchantment for the given armor item
const getArmorEnchantment = (item: EsoItem): EquipmentItemEnchantment | undefined => {
  // armor enchantments
  if (!item) {
    return undefined;
  }
  if (item.itemType !== EsoItemType.armor || !item.armorType) {
    return undefined;
  }

  // get stats from data
  const armorStats = getArmorStats(item.slot, item.armorType);
  if (!armorStats) {
    return undefined;
  }

  const values: number[] = [];
  const prop = item.enchantment as EsoArmorStatsItemEnchantmentProps;
  if (!prop || !armorStats[prop]) {
    return undefined;
  }
  values.push(armorStats[prop]);

  const enchantment = {
    enchantment: item.enchantment,
    values
  } as EquipmentItemEnchantment;

  const esoStat = esoItemEnchantmentToEsoStat(item.enchantment);
  if (esoStat) {
    enchantment.stats = {
      [esoStat]: armorStats[prop]
    } as EsoBonusStats;
  }

  return enchantment;
};

// get the enchantment for the given jewelry item
const getJewelryEnchantment = (item: EsoItem): EquipmentItemEnchantment | undefined => {
  // jewelry enchantments
  if (!item) {
    return undefined;
  }
  if (item.itemType !== EsoItemType.jewelry) {
    return undefined;
  }

  // get stats from data
  const jewelryStats = getJewelryStats(item.slot);
  if (!jewelryStats) {
    return undefined;
  }

  const values: number[] = [];
  const prop = item.enchantment as EsoJewelryStatsItemEnchantmentProps;
  if (!prop || !jewelryStats[prop]) {
    return undefined;
  }
  values.push(jewelryStats[prop]);

  const enchantment = {
    enchantment: item.enchantment,
    values
  } as EquipmentItemEnchantment;

  const esoStat = esoItemEnchantmentToEsoStat(item.enchantment);
  if (esoStat) {
    enchantment.stats = {
      [esoStat]: jewelryStats[prop]
    } as EsoBonusStats;
  }

  return enchantment;
};

// get the enchantment for the given weapon item
const getWeaponEnchantment = (item: EsoItem, equipmentSlot: EquipmentSlot): EquipmentItemEnchantment | undefined => {
  // weapon enchantments
  if (!item) {
    return undefined;
  }
  if (item.itemType !== EsoItemType.weapon || !item.weaponType) {
    return undefined;
  }

  // get stats from data
  const weaponStats = getWeaponStats(item.weaponType);
  if (!weaponStats) {
    return undefined;
  }

  const values: number[] = [];
  const prop = item.enchantment as EsoWeaponStatsItemEnchantmentProps;
  if (!prop || !weaponStats[prop]) {
    return undefined;
  }
  Object.values(weaponStats[prop]).forEach(value => values.push(value));

  const enchantment = {
    enchantment: item.enchantment,
    values
  } as EquipmentItemEnchantment;

  return enchantment;
};

export class EquipmentBuildSlot {
  equipmentSlot: EquipmentSlot;
  item?: EsoItem;
  slotEnchantment?: EquipmentItemEnchantment;
  armor?: number;
  damage?: number;

  constructor(equipmentSlot: EquipmentSlot, item?: EsoItem) {
    this.equipmentSlot = equipmentSlot;
    this.setItem(item);
  }

  public setItem(item?: EsoItem) {
    this.item = item;
    this.assignStats();
  }

  public assignStats() {
    if (!this.item) {
      return;
    }

    if (this.item.itemType === EsoItemType.armor && this.item.armorType) {
      const armorStats = getArmorStats(this.item.slot, this.item.armorType);
      this.armor = armorStats ? armorStats.armor : 0;
    } else if (this.item.itemType === EsoItemType.weapon && this.item.weaponType) {
      const weaponStats = getWeaponStats(this.item.weaponType);
      this.damage = weaponStats ? weaponStats.damage : 0;
    }

    // first delete old enchantment
    delete this.slotEnchantment;

    if (this.item.enchantment) {
      if (this.item.itemType === EsoItemType.armor && this.item.armorType) {
        // armor enchantments
        this.slotEnchantment = getArmorEnchantment(this.item);
      } else if (this.item.itemType === EsoItemType.jewelry) {
        // jewelry enchantments
        this.slotEnchantment = getJewelryEnchantment(this.item);
      } else if (this.item.itemType === EsoItemType.weapon) {
        // weapon enchantments
        this.slotEnchantment = getWeaponEnchantment(this.item, this.equipmentSlot);
      }
    }
  }
}
