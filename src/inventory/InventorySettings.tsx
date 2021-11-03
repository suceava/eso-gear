
export enum InventoryFilterType {
  all = 'all',
  weapons = 'weapons',
  armor = 'armor',
  jewelry = 'jewelry'
};

export enum InventoryWeaponSubFilterType {
  all = 'all',
  oneHanded = 'oneHanded',
  twoHanded = 'twoHanded',
  bow = 'bow',
  damageStaff = 'damageStaff',
  healStaff = 'healingStaff'
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
  inventorySubFilter: 
    InventoryWeaponSubFilterType |
    InventoryArmorSubFilterType |
    InventoryJewelrySubFilterType |
    undefined;

  constructor(inventoryFilter = InventoryFilterType.all, inventorySubFilter = undefined) {
    this.inventoryFilter = inventoryFilter;
    this.inventorySubFilter = inventorySubFilter;
  }
}
