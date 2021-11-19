import { EsoArmorStats, EsoItemStats, EsoJewelryStats, EsoWeaponStats  } from "./eso-item-stats";
import { EsoArmorType, EsoItemType, EsoSlot, EsoWeaponType, esoWeaponTypeToEsoSlot } from './eso-sets';
// json data
import itemStatsData from "./eso-item-stats.json";

let ESO_ITEM_STATS: EsoItemStats;

export const loadEsoItemStatsData = (): EsoItemStats => {
  if (ESO_ITEM_STATS) {
    return ESO_ITEM_STATS;
  }

  // enforce typing
  ESO_ITEM_STATS = itemStatsData as EsoItemStats;

  return ESO_ITEM_STATS;
};

export const getArmorStats = (slot: EsoSlot, armorType: EsoArmorType): EsoArmorStats | undefined => {
  loadEsoItemStatsData();
  return ESO_ITEM_STATS[EsoItemType.armor][slot][armorType];
};

export const getJewelryStats = (slot: EsoSlot): EsoJewelryStats | undefined => {
  loadEsoItemStatsData();
  return ESO_ITEM_STATS[EsoItemType.jewelry];
};

export const getWeaponStats = (weaponType: EsoWeaponType): EsoWeaponStats | undefined => {
  loadEsoItemStatsData();
  const slot = esoWeaponTypeToEsoSlot(weaponType);
  const stats = {...ESO_ITEM_STATS[EsoItemType.weapon][slot]};

  // staves are two-handed weapons, but they have one-handed damage
  if (weaponType === EsoWeaponType.restorationStaff ||
    weaponType === EsoWeaponType.infernoStaff ||
    weaponType === EsoWeaponType.iceStaff ||
    weaponType === EsoWeaponType.lightningStaff
  ) {
    stats.damage = ESO_ITEM_STATS[EsoItemType.weapon][EsoSlot.oneHand].damage;
  }

  return stats;
};

