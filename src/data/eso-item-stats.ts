import { EsoArmorType, EsoItemType, EsoSlot } from './eso-sets';

export type EsoArmorStats = {
  armor: number;
  maximumHealth: number;
  maximumMagicka: number;
  maximumStamina: number;
};

export type EsoWeaponStats = {
  damage: number;
};

type EsoArmorSlotStats = {
  [EsoArmorType.light]: EsoArmorStats;
  [EsoArmorType.medium]: EsoArmorStats;
  [EsoArmorType.heavy]: EsoArmorStats;
};

export type EsoItemStats = {
  [EsoItemType.armor]: {
    [key in EsoSlot]: EsoArmorSlotStats;
  }
};
