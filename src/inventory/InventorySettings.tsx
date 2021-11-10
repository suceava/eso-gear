export enum InventoryFilterType {
  all = 'all',
  weapons = 'weapons',
  armor = 'armor',
  jewelry = 'jewelry'
};
export const Strings_InventoryFilterType = {
  [InventoryFilterType.all]: 'All',
  [InventoryFilterType.weapons]: 'Weapons',
  [InventoryFilterType.armor]: 'Armor',
  [InventoryFilterType.jewelry]: 'Jewelry'
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
export const Strings_InventorySubFilterType = {
  [InventorySubFilterType.all]: 'All',
  // weapons
  [InventorySubFilterType.oneHanded]: 'One-Handed Melee',
  [InventorySubFilterType.twoHanded]: 'Two-Handed Melee',
  [InventorySubFilterType.bow]: 'Bow',
  [InventorySubFilterType.destructionStaff]: 'Destruction Staff',
  [InventorySubFilterType.healingStaff]: 'Healing Staff',
  // armor
  [InventorySubFilterType.heavy]: 'Heavy Armor',
  [InventorySubFilterType.medium]: 'Medium Armor',
  [InventorySubFilterType.light]: 'Light Armor',
  [InventorySubFilterType.shield]: 'Shield',
  // jewelry
  [InventorySubFilterType.ring]: 'Ring',
  [InventorySubFilterType.neck]: 'Neck'
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
