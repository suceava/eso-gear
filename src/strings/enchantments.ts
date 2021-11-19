import { EsoItemEnchantment } from "../data/eso-sets";

export const Strings_EsoItemEnchantment = {
  [EsoItemEnchantment.maximumHealth]: 'Maximum Health',
  [EsoItemEnchantment.maximumMagicka]: 'Maximum Magicka',
  [EsoItemEnchantment.maximumStamina]: 'Maximum Stamina',
  [EsoItemEnchantment.healthRecovery]: 'Health Recovery',
  [EsoItemEnchantment.magickaRecovery]: 'Magicka Recovery',
  [EsoItemEnchantment.staminaRecovery]: 'Stamina Recovery',
  [EsoItemEnchantment.lifeDrain]: 'Life Drain',
  [EsoItemEnchantment.absorbMagicka]: 'Absorb Magicka',
  [EsoItemEnchantment.absorbStamina]: 'Absorb Stamina',
  [EsoItemEnchantment.multiEffect]: 'Multi-Effect'
};

const Strings_EsoItemEnchantment_Description = {
  [EsoItemEnchantment.maximumHealth]: 'Adds <span class=\"health\">{0} Maximum Health</span>.',
  [EsoItemEnchantment.maximumMagicka]: 'Adds <span class=\"magicka\">{0} Maximum Magicka</span>.',
  [EsoItemEnchantment.maximumStamina]: 'Adds <span class=\"stamina\">{0} Maximum Stamina</span>.',
  [EsoItemEnchantment.healthRecovery]: 'Adds <span class=\"health\">{0} Health Recovery</span>.',
  [EsoItemEnchantment.magickaRecovery]: 'Adds <span class=\"magicka\">{0} Magicka Recovery</span>.',
  [EsoItemEnchantment.staminaRecovery]: 'Adds <span class=\"stamina\">{0} Stamina Recovery</span>.',
  [EsoItemEnchantment.lifeDrain]: 'Deals <span class=\"magic-damage\">{0} Magic Damage</span> and restores <span class=\"health\">{1} Health</span>.',
  [EsoItemEnchantment.absorbMagicka]: 'Deals <span class=\"magic-damage\">{0} Magic Damage</span> and restores <span class=\"magicka\">{1} Magicka</span>.',
  [EsoItemEnchantment.absorbStamina]: 'Deals <span class=\"physical-damage\">{0} Physical Damage</span> and restores <span class=\"staimna\">{1} Stamina</span>.',
  [EsoItemEnchantment.multiEffect]: 'Adds <span class=\"magicka\">{0} Maximum Magicka</span>.<br/>Adds <span class=\"health\">{1} Maximum Health</span>.<br/>Adds <span class=\"stamina\">{2} Maximum Stamina</span>.'
};

export function getEsoItemEnchantmentDescription(enchantment: EsoItemEnchantment, values: number[]): string {
  return Strings_EsoItemEnchantment_Description[enchantment].replace(/{(\d+)}/g, (match, number) => (values[number] || 0).toString());
};
