import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { EquipmentBuild } from '../character/EquipmentBuild';
import { getArmorStats, getJewelryStats, getWeaponStats } from '../data/esoItemStatsDataLoader';
import {
  EsoArmorType,
  EsoItem,
  EsoItemEnchantment,
  EsoItemType,
  EsoSet,
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSetType,
  EsoSlot
} from '../data/eso-sets';
import { Strings_EsoItemEnchantment, getEsoItemEnchantmentDescription } from '../strings/enchantments';
import {
  Strings_EsoArmorType,
  Strings_EsoSlot,
  Strings_EsoWeaponType
} from '../strings/equipment';

import './Tooltips.css';
import { EquipmentSlot } from '../character/EquipmentBuildSlot';
import { getEsoSetByName } from '../data/esoSetDataLoader';

const popperConfig = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 64]
      }
    }
  ]
}

export function ItemSetTooltip(props: { set: EsoSet, children: any }) {
  const { set } = props;
  const setClass = (set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      popperConfig={popperConfig}
      overlay={
        <Tooltip id={`tooltip_set_${set.name}`} className='tooltip'>
          <div className='tooltip-item-set'>
            <img src={'../images/gear/' + set.image} alt={set.name}></img>
            <h1 className={setClass}>{set.name}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: set.htmlDescription }} />
            <hr />
            <div className='tooltip-item-set-type'>{set.type}</div>
            {
              set.location && set.location.length ?
                <div className='tooltip-item-set-location'>{set.location[0].name}</div>
                :
                undefined
            }
          </div>
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}

function getItemTypeString(item: EsoItem) {
  if (item.itemType === EsoItemType.weapon) {
    // weapons => use weapon type
    return item.weaponType? Strings_EsoWeaponType[item.weaponType] : '';
  }
  if (item.slot === EsoSlot.offHand) {
    // odd one out - the shield
    return Strings_EsoArmorType[EsoArmorType.shield];
  }
  // use slot name
  return Strings_EsoSlot[item.slot];
}
function getItemSubTypeString(item: EsoItem) {
  if (item.itemType === EsoItemType.jewelry) {
    // jewelry doesn't have subtypes
    return null;
  }
  if (item.itemType === EsoItemType.weapon || (item.itemType === EsoItemType.armor && item.armorType === EsoArmorType.shield)) {
    // weapons or shield => use slot name
    return Strings_EsoSlot[item.slot];
  }

  return item.armorType ? Strings_EsoArmorType[item.armorType] : '';
}
function getItemStatString(item: EsoItem) {
  if (item.itemType === EsoItemType.weapon) {
    return 'DAMAGE';
  }
  if (item.itemType === EsoItemType.armor) {
    return 'ARMOR';
  }
  return '';
}
function getItemStatValue(item: EsoItem) {
  if (item.itemType === EsoItemType.weapon && item.weaponType) {
    const weaponStats = getWeaponStats(item.weaponType);
    return (weaponStats ? weaponStats.damage : 0).toString();
  }
  if (item.itemType === EsoItemType.armor && item.armorType) {
    const armorStats = getArmorStats(item.slot, item.armorType);
    return (armorStats ? armorStats.armor : 0).toString();
  }
  return '';
}
function getItemEnchantmentDescription(item: EsoItem, build: EquipmentBuild) {
  const values: number[] = [];
  if (item.itemType === EsoItemType.armor && item.armorType) {
    // armor enchantments
    if (item.enchantment === EsoItemEnchantment.multiEffect) {
      return "eek";
    } else if (
      item.enchantment === EsoItemEnchantment.maximumHealth ||
      item.enchantment === EsoItemEnchantment.maximumMagicka ||
      item.enchantment === EsoItemEnchantment.maximumStamina
    ) {
      const armorStats = getArmorStats(item.slot, item.armorType);
      if (armorStats) {
        values.push(armorStats[item.enchantment]);
      }
    }
  } else if (item.itemType === EsoItemType.jewelry) {
    // jewelry enchantments
    if (
      item.enchantment === EsoItemEnchantment.healthRecovery ||
      item.enchantment === EsoItemEnchantment.magickaRecovery ||
      item.enchantment === EsoItemEnchantment.staminaRecovery
    ) {
      const jewelryStats = getJewelryStats(item.slot);
      if (jewelryStats) {
        values.push(jewelryStats[item.enchantment]);
      }
    }
  } else if (item.itemType === EsoItemType.weapon && item.weaponType) {
    // weapon enchantments
    if (
      item.enchantment === EsoItemEnchantment.lifeDrain ||
      item.enchantment === EsoItemEnchantment.absorbMagicka ||
      item.enchantment === EsoItemEnchantment.absorbStamina
    ) {
      const weaponStats = getWeaponStats(item.weaponType);
      if (weaponStats) {
        values.push(...Object.values(weaponStats[item.enchantment]) as number[]);
      }
    }
  }

  return getEsoItemEnchantmentDescription(item.enchantment, values);
}

function TooltipContent(props: { build: EquipmentBuild, item: EsoItem }) {
  const { build, item } = props;
  const set = getEsoSetByName(item.setName);
  const itemClass = (set && set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';
  const setBonusCount = set ? set.bonusCount : 0;
  const itemsInSet = build ? build.countBonusesBySet(item.setName) : 0;


  return (
    <div className='tooltip-item'>
      <div className='tooltip-item-type'>
        {getItemTypeString(item)}
        <br/>
        {getItemSubTypeString(item)}
      </div>
      <div>
        <img src={'../images/gear/' + item.image} alt={item.name}></img>
      </div>
      <h1 className={itemClass}>{item.name}</h1>
      <hr />
      <div className='tooltip-item-level'>
        <div>{getItemStatString(item)} <span>{getItemStatValue(item)}</span></div>
        <div>LEVEL <span>50</span></div>
        <div>CP <span>160</span></div>
      </div>
      <h3>{Strings_EsoItemEnchantment[item.enchantment]} Enchantment</h3>
      <div className='tooltip-enchantment' dangerouslySetInnerHTML={{ __html: getItemEnchantmentDescription(item, build) }}></div>
      <br/>
      <h3>{`Part of the ${item.setName} set (${Math.min(itemsInSet, setBonusCount)}/${setBonusCount})`}</h3>
      {
        set && Object.keys(set.bonuses).map(key => {
          const bonusKey = key as EsoSetBonusKey;
          const bonus = set.bonuses[bonusKey] as EsoSetBonus;
          if (!bonus) {
            return null;
          }
          return (
            <div
              key={key}
              dangerouslySetInnerHTML={{ __html: bonus.htmlDescription }}
              className={parseInt(key) > itemsInSet ? 'tooltip-item-set-bonus-disabled' : ''}
            ></div>
          );
        })
      }
    </div>
  );
};

export interface ItemTooltipProps {
  build: EquipmentBuild;
  item: EsoItem;
  show: boolean;
  target: any;
}

export function ItemTooltip({ build, item, show, target }: ItemTooltipProps) {
  return (
    <Overlay
      target={target.current}
      show={show}
      popperConfig={popperConfig}
      placement='left'
    >
      {(props) => (
        <Tooltip id="tooltip" className='tooltip' {...props}>
          <TooltipContent build={build} item={item} />
        </Tooltip>
      )}
    </Overlay>
  );
}

export function EquipmentItemTooltip(props: { build: EquipmentBuild, equipmentSlot: EquipmentSlot, children: any }) {
  const { build, equipmentSlot } = props;
  const item = build.getEsoItem(equipmentSlot);
  if (!item) {
    return null;
  }

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      overlay={
        <Tooltip id={`tooltip_item_${item.name}`} className='tooltip'>
          <TooltipContent build={build} item={item} />
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
