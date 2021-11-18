import { EsoArmorType, EsoItemEnchantment, EsoItemType, EsoSlot } from './eso-sets';

export type EsoArmorStats = {
  armor: number;

  [EsoItemEnchantment.maximumHealth]: number;
  [EsoItemEnchantment.maximumMagicka]: number;
  [EsoItemEnchantment.maximumStamina]: number;
};

export type EsoWeaponStats = {
  damage: number;
};

type EsoArmorSlotStats = {
  [key in EsoArmorType]?: EsoArmorStats | undefined;
};

export type EsoItemStats = {
  [EsoItemType.armor]: {
    [key in EsoSlot]: EsoArmorSlotStats;
  }
};
