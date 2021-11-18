import { EsoArmorStats, EsoItemStats, EsoJewelryStats  } from "./eso-item-stats";
import { EsoArmorType, EsoSlot } from './eso-sets';
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
  return ESO_ITEM_STATS.armor[slot][armorType];
};

export const getJewelryStats = (slot: EsoSlot): EsoJewelryStats | undefined => {
  loadEsoItemStatsData();
  return ESO_ITEM_STATS.jewelry[slot];
};
