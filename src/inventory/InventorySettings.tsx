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

export const isSubFilterOfFilterType = (filterType: InventoryFilterType, subFilterType: InventorySubFilterType) => {
  if (filterType === InventoryFilterType.all) {
    return true;
  }
  return filterSubFilterMap[filterType].includes(subFilterType);
};

export const inventoryFilterTypeToString = (filterType: InventoryFilterType) => {
  switch (filterType) {
    case InventoryFilterType.all:
      return 'All';
    case InventoryFilterType.weapons:
      return 'Weapons';
    case InventoryFilterType.armor:
      return 'Armor';
    case InventoryFilterType.jewelry:
      return 'Jewelry';
    default:
      return '';
  }
};

export const inventoryWeaponSubFilterTypeToString = (filterType: InventorySubFilterType) => {
  switch (filterType) {
    case InventorySubFilterType.all:
      return 'All';
    case InventorySubFilterType.oneHanded:
      return 'One-Handed Melee';
    case InventorySubFilterType.twoHanded:
      return 'Two-Handed Melee';
    case InventorySubFilterType.bow:
      return 'Bow';
    case InventorySubFilterType.destructionStaff:
      return 'Destruction Staff';
    case InventorySubFilterType.healingStaff:
      return 'Healing Staff';

    case InventorySubFilterType.heavy:
      return 'Heavy Armor';
    case InventorySubFilterType.medium:
      return 'Medium Armor';
    case InventorySubFilterType.light:
      return 'Light Armor';
    case InventorySubFilterType.shield:
      return 'Shield';

    case InventorySubFilterType.neck:
      return 'Neck';
    case InventorySubFilterType.ring:
      return 'Ring';

    default:
      return '';
  }
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
