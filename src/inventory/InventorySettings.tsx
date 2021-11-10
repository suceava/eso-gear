export enum InventoryFilterType {
  all = 'all',
  weapons = 'weapons',
  armor = 'armor',
  jewelry = 'jewelry'
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

export enum InventoryWeaponSubFilterType {
  all = 'all',
  oneHanded = 'oneHanded',
  twoHanded = 'twoHanded',
  bow = 'bow',
  destructionStaff = 'destructionStaff',
  healingStaff = 'healingStaff'
};
export const inventoryWeaponSubFilterTypeToString = (filterType: InventoryWeaponSubFilterType) => {
  switch (filterType) {
    case InventoryWeaponSubFilterType.all:
      return 'All';
    case InventoryWeaponSubFilterType.oneHanded:
      return 'One-Handed Melee';
    case InventoryWeaponSubFilterType.twoHanded:
      return 'Two-Handed Melee';
    case InventoryWeaponSubFilterType.bow:
      return 'Bow';
    case InventoryWeaponSubFilterType.destructionStaff:
      return 'Destruction Staff';
    case InventoryWeaponSubFilterType.healingStaff:
      return 'Healing Staff';
    default:
      return '';
  }
};

export enum InventoryArmorSubFilterType {
  all = 'all',
  heavy = 'heavy',
  medium = 'medium',
  light = 'light',
  shield = 'shield'
};

export enum InventoryJewelrySubFilterType {
  all = 'all',
  neck = 'neck',
  ring = 'ring'
};

export class InventorySettings {
  inventoryFilter: InventoryFilterType;
  inventorySubFilter?: InventoryWeaponSubFilterType | InventoryArmorSubFilterType | InventoryJewelrySubFilterType;
  inventorySearch: string;

  constructor(inventoryFilter = InventoryFilterType.all, inventorySubFilter = undefined) {
    this.inventoryFilter = inventoryFilter;
    this.inventorySubFilter = inventorySubFilter;
    this.inventorySearch = '';
  }
}
