import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { EquipmentBuild } from '../character/EquipmentBuild';
import {
  EsoArmorType,
  EsoItem,
  EsoItemType,
  EsoSet,
  EsoSetBonus,
  EsoSetBonusKey,
  EsoSetType,
  EsoSlot,
  Strings_EsoArmorType,
  Strings_EsoSlot,
  Strings_EsoWeaponType
} from '../data/eso-sets';

import './Tooltips.css';

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
  if (item.itemType === EsoItemType.weapons) {
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
  if (item.itemType === EsoItemType.weapons || (item.itemType === EsoItemType.armor && item.armorType === EsoArmorType.shield)) {
    // weapons or shield => use slot name
    return Strings_EsoSlot[item.slot];
  }

  return item.armorType ? Strings_EsoArmorType[item.armorType] : '';
}
function getItemStatString(item: EsoItem) {
  if (item.itemType === EsoItemType.weapons) {
    return 'DAMAGE';
  }
  if (item.itemType === EsoItemType.armor) {
    return 'ARMOR';
  }
  return '';
}
function getItemStatValue(item: EsoItem) {
  if (item.itemType === EsoItemType.weapons) {
    return '0';
  }
  if (item.itemType === EsoItemType.armor) {
    return '0';
  }
  return '';
}

function TooltipContent(props: { build?: EquipmentBuild, item: EsoItem, set?: EsoSet }) {
  const { build, item, set } = props;
  const itemClass = (set && set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';
  const itemsInSet = build ? build.countBySet(item.setName) : 0;

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
      <h3>{`Part of the ${item.setName} set (${itemsInSet}/${set ? set.bonusCount : 0})`}</h3>
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
  build?: EquipmentBuild;
  item: EsoItem;
  set?: EsoSet;
  show: boolean;
  target: any;
}

export function ItemTooltip({ build, item, set, show, target }: ItemTooltipProps) {
  return (
    <Overlay
      target={target.current}
      show={show}
      popperConfig={popperConfig}
      placement='left'
    >
      {(props) => (
        <Tooltip id="tooltip" className='tooltip' {...props}>
          <TooltipContent build={build} item={item} set={set} />
        </Tooltip>
      )}
    </Overlay>
  );
}

export function SimpleItemTooltip(props: { build: EquipmentBuild, item: EsoItem, set?: EsoSet, children: any }) {
  const { build, item, set } = props;

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      overlay={
        <Tooltip id={`tooltip_item_${item.name}`} className='tooltip'>
          <TooltipContent build={build} item={item} set={set} />
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
