import { InventoryFilterType, InventorySubFilterType } from '../inventory/inventorySettings';

export const Strings_InventoryFilterType = {
  [InventoryFilterType.all]: 'All',
  [InventoryFilterType.weapons]: 'Weapons',
  [InventoryFilterType.armor]: 'Armor',
  [InventoryFilterType.jewelry]: 'Jewelry'
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
