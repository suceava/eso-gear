import { EsoItemStats  } from "./eso-item-stats";
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
