import { EsoItemType } from '../data/eso-sets';

export enum InventoryFilterType {
  all = 'all',
  weapons = 'weapons',
  armor = 'armor',
  jewelry = 'jewelry'
};

export enum InventorySubFilterType {
  all = 'all',
  // weapons
  oneHanded = 'oneHanded',
  twoHanded = 'twoHanded',
  bow = 'bow',
  destructionStaff = 'destructionStaff',
  healingStaff = 'healingStaff',
  // armor
  heavy = 'heavy',
  medium = 'medium',
  light = 'light',
  shield = 'shield',
  // jewelry
  ring = 'ring',
  neck = 'neck'
};

const filterSubFilterMap = {
  [InventoryFilterType.weapons]: [
    InventorySubFilterType.all,
    InventorySubFilterType.oneHanded,
    InventorySubFilterType.twoHanded,
    InventorySubFilterType.bow,
    InventorySubFilterType.destructionStaff,
    InventorySubFilterType.healingStaff
  ],
  [InventoryFilterType.armor]: [
    InventorySubFilterType.all,
    InventorySubFilterType.heavy,
    InventorySubFilterType.light,
    InventorySubFilterType.medium,
    InventorySubFilterType.shield
  ],
  [InventoryFilterType.jewelry]: [
    InventorySubFilterType.all,
    InventorySubFilterType.ring,
    InventorySubFilterType.neck
  ]
};

export const inventoryFitlerTypeToEsoItemType = (inventoryFilterType: InventoryFilterType): EsoItemType | EsoItemType[] => {
  switch (inventoryFilterType) {
    case InventoryFilterType.all:
      return [EsoItemType.weapon, EsoItemType.armor, EsoItemType.jewelry];
    case InventoryFilterType.weapons:
      return EsoItemType.weapon;
    case InventoryFilterType.armor:
      return EsoItemType.armor;
    case InventoryFilterType.jewelry:
      return EsoItemType.jewelry;
  }
};

export const isSubFilterOfFilterType = (filterType: InventoryFilterType, subFilterType: InventorySubFilterType) => {
  if (filterType === InventoryFilterType.all) {
    return true;
  }
  return filterSubFilterMap[filterType].includes(subFilterType);
};


export class InventorySettings {
  inventoryFilter: InventoryFilterType;
  inventorySubFilter: InventorySubFilterType;
  inventorySearch: string;

  constructor(
    inventoryFilter = InventoryFilterType.all,
    inventorySubFilter = InventorySubFilterType.all,
    inventorySearch = ''
  ) {
    this.inventoryFilter = inventoryFilter;
    this.inventorySubFilter = inventorySubFilter;
    this.inventorySearch = inventorySearch;
  }
}
