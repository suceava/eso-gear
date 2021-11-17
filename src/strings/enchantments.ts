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
  [EsoItemEnchantment.maximumHealth]: 'Adds {0} Maximum Health.',
  [EsoItemEnchantment.maximumMagicka]: 'Adds {0} Maximum Magicka.',
  [EsoItemEnchantment.maximumStamina]: 'Adds {0} Maximum Stamina.',
  [EsoItemEnchantment.healthRecovery]: 'Adds {0} Health Recovery.',
  [EsoItemEnchantment.magickaRecovery]: 'Adds {0} Magicka Recovery.',
  [EsoItemEnchantment.staminaRecovery]: 'Adds {0} Stamina Recovery.',
  [EsoItemEnchantment.lifeDrain]: 'Deals {0} Magic Damage and restores {1} Health.',
  [EsoItemEnchantment.absorbMagicka]: 'Deals {0} Magic Damage and restores {1} Magicka.',
  [EsoItemEnchantment.absorbStamina]: 'Deals {0} Physical Damage and restores {1} Stamina.',
  [EsoItemEnchantment.multiEffect]: 'Adds {0} Maximum Magicka.<br/>Adds {1} Maximum Health.<br/>Adds {2} Maximum Stamina.'
};

export function getEsoItemEnchantmentDescription(enchantment: EsoItemEnchantment, values: number[]): string {
  return Strings_EsoItemEnchantment_Description[enchantment].replace(/{(\d+)}/g, (match, number) => (values[number] || 0).toString());
};
