import { EsoArmorType, EsoItemEnchantment, EsoItemType, EsoSlot } from './eso-sets';

export type EsoArmorStats = {
  armor: number;

  [EsoItemEnchantment.maximumHealth]: number;
  [EsoItemEnchantment.maximumMagicka]: number;
  [EsoItemEnchantment.maximumStamina]: number;
};
export type EsoArmorStatsItemEnchantmentProps =
  EsoItemEnchantment.maximumHealth |
  EsoItemEnchantment.maximumMagicka |
  EsoItemEnchantment.maximumStamina;

export type EsoJewelryStats = {
  [EsoItemEnchantment.healthRecovery]: number;
  [EsoItemEnchantment.magickaRecovery]: number;
  [EsoItemEnchantment.staminaRecovery]: number;
};
export type EsoJewelryStatsItemEnchantmentProps =
  EsoItemEnchantment.healthRecovery |
  EsoItemEnchantment.magickaRecovery |
  EsoItemEnchantment.staminaRecovery;

export type EsoWeaponStats = {
  damage: number;
};

type EsoArmorSlotStats = {
  [key in EsoArmorType]?: EsoArmorStats | undefined;
};

export type EsoItemStats = {
  [EsoItemType.armor]: {
    [key in EsoSlot]: EsoArmorSlotStats;
  },
  [EsoItemType.jewelry]: {
    [key in EsoSlot]: EsoJewelryStats;
  }
};
