import { EsoArmorType, EsoItemEnchantment, EsoItemType, EsoSlot } from './eso-sets';

export type EsoArmorStatsItemEnchantmentProps =
  EsoItemEnchantment.maximumHealth |
  EsoItemEnchantment.maximumMagicka |
  EsoItemEnchantment.maximumStamina |
  EsoItemEnchantment.multiEffect;
export type EsoArmorStats = {
  armor: number;

  [EsoItemEnchantment.maximumHealth]: number;
  [EsoItemEnchantment.maximumMagicka]: number;
  [EsoItemEnchantment.maximumStamina]: number;
  [EsoItemEnchantment.multiEffect]?: object;
};
type EsoArmorSlotStats = {
  [key in EsoArmorType]?: EsoArmorStats | undefined;
};

export type EsoJewelryStatsItemEnchantmentProps =
  EsoItemEnchantment.healthRecovery |
  EsoItemEnchantment.magickaRecovery |
  EsoItemEnchantment.staminaRecovery;
export type EsoJewelryStats = {
  [key in EsoJewelryStatsItemEnchantmentProps]: number;
};

export type EsoWeaponStatsItemEnchantmentProps =
  EsoItemEnchantment.lifeDrain |
  EsoItemEnchantment.absorbMagicka |
  EsoItemEnchantment.absorbStamina;
export type EsoWeaponStats = {
  damage: number;

  [EsoItemEnchantment.lifeDrain]: object;
  [EsoItemEnchantment.absorbMagicka]: object;
  [EsoItemEnchantment.absorbStamina]: object;
};


export type EsoItemStats = {
  [EsoItemType.armor]: {
    [key in EsoSlot]: EsoArmorSlotStats;
  };
  [EsoItemType.jewelry]: EsoJewelryStats;
  [EsoItemType.weapon]: {
    [key in EsoSlot]: EsoWeaponStats;
  };
};
