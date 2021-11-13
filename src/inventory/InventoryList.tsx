import { useCallback, useMemo } from 'react';
import { FixedSizeTree, FixedSizeNodeComponentProps } from 'react-vtree';

import { InventoryItem } from './InventoryItem';
import { InventoryFilterType, InventorySubFilterType } from './InventorySettings';
import { EquipmentBuild, esoSlotToEquipmentSlot } from '../character/EquipmentBuild';
import {
  EsoSet,
  EsoItem,
  EsoItemType,
  EsoSetType,
  EsoSlot,
  EsoWeaponType
} from '../data/eso-sets';
import { loadEsoSetData } from '../data/esoSetDataLoader';
import { ItemSetTooltip } from '../tooltips/Tooltips';

import './Inventory.css';
import treeOpenImage from '../images/tree_open_up.png';
import treeClosedImage from '../images/tree_closed_up.png';

const ESO_SETS: EsoSet[] = loadEsoSetData();

type NodeType = {
  id: string | symbol;
  name: string;
  isLeaf: boolean;
  isOpen: boolean;
  isOpenByDefault: boolean;
  nestingLevel: number;
  listItem: FilteredListItem;
};

interface FilteredListItem {
  depth: number;
  item: EsoSet | EsoItem;
  children: FilteredListItem[];
}

export interface InventoryTableProps {
  build: EquipmentBuild;
  buildOnChange: (newBuild: EquipmentBuild) => void;
  filter: InventoryFilterType;
  subFilter: InventorySubFilterType;
  search: string;
}

export function InventoryList({ build, buildOnChange, filter, subFilter, search }: InventoryTableProps) {
  const itemTypeFilter = filter as unknown as EsoItemType;
  const lowerSearch = search?.toLowerCase();
  const rowMatcher = useCallback((item: EsoItem) => {
    if (filter !== InventoryFilterType.all && item.itemType !== itemTypeFilter) {
      return false;
    }
    if (subFilter !== InventorySubFilterType.all) {
      switch (subFilter) {
        case InventorySubFilterType.oneHanded:
          if (item.itemType !== EsoItemType.weapons || (
            item.weaponType !== EsoWeaponType.axe &&
            item.weaponType !== EsoWeaponType.dagger &&
            item.weaponType !== EsoWeaponType.mace &&
            item.weaponType !== EsoWeaponType.sword)
          ) {
            return false;
          }
          break;
        case InventorySubFilterType.twoHanded:
          if (item.itemType !== EsoItemType.weapons || (
            item.weaponType !== EsoWeaponType.battleAxe &&
            item.weaponType !== EsoWeaponType.greatsword &&
            item.weaponType !== EsoWeaponType.maul)
          ) {
            return false;
          }
        break;
        case InventorySubFilterType.bow:
          if (item.itemType !== EsoItemType.weapons || item.weaponType !== EsoWeaponType.bow) {
            return false;
          }
          break;
        case InventorySubFilterType.destructionStaff:
          if (item.itemType !== EsoItemType.weapons || (
              item.weaponType !== EsoWeaponType.infernoStaff &&
              item.weaponType !== EsoWeaponType.iceStaff &&
              item.weaponType !== EsoWeaponType.lightningStaff)
          ) {
            return false;
          }
          break;
        case InventorySubFilterType.healingStaff:
          if (item.itemType !== EsoItemType.weapons || item.weaponType !== EsoWeaponType.restorationStaff) {
            return false;
          }
          break;

        case InventorySubFilterType.heavy:
        case InventorySubFilterType.light:
        case InventorySubFilterType.medium:
          if (item.itemType !== EsoItemType.armor || (item.armorType as string) !== (subFilter as string)) {
            return false;
          }
          break;
        case InventorySubFilterType.shield:
          if (item.itemType !== EsoItemType.armor || item.slot !== EsoSlot.offHand) {
            return false;
          }
          break;

        case InventorySubFilterType.ring:
        case InventorySubFilterType.neck:
          if (item.itemType !== EsoItemType.jewelry || (item.slot as string) !== (subFilter as string)) {
            return false;
          }
          break;
      }
    }
    if (!search || search === '') {
      return true;
    }

    if (item.setName.toLowerCase().includes(lowerSearch) || item.name.toLowerCase().includes(lowerSearch)) {
      return true;
    }
    return false;
  }, [filter, subFilter, search, itemTypeFilter, lowerSearch]);

  const filteredList = useMemo((): FilteredListItem[] => {
    const filteredList: FilteredListItem[] = [];
    // clone the tree
    ESO_SETS.forEach(set => {
      const listItem = {
        depth: 0,
        item: set,
        children: [] as FilteredListItem[]
      };
      set.items.list.forEach(item => {
        listItem.children.push({
          depth: 1,
          item,
          children: []
        });
      });
      filteredList.push(listItem);
    });

    if (filter === InventoryFilterType.all && subFilter === InventorySubFilterType.all && search === '') {
      return filteredList;
    }
    return filteredList.filter(listItem => {
      const filteredChildren = listItem.children.filter(child => rowMatcher(child.item as EsoItem));
      if (!filteredChildren.length) {
        return false;
      }
      listItem.children = filteredChildren;
      return true;
    });
  }, [rowMatcher, filter, subFilter, search]);

  function* treeWalker<NodeType>(refresh: boolean): Generator<NodeType | string | symbol, void, boolean> {
    for (const listItem of filteredList) {
      const isOpen = yield refresh ?
        {
          id: listItem.item.id,
          name: listItem.item.name,
          isLeaf: listItem.depth !== 0,
          isOpen: false,
          isOpenByDefault: false,
          nestingLevel: listItem.depth,
          listItem: listItem
        } as unknown as NodeType
        :
        listItem.item.id.toString();

      if (isOpen) {
        for (const child of listItem.children) {
          yield refresh ?
            {
              id: child.item.id,
              name: child.item.name,
              isLeaf: true,
              isOpen: true,
              isOpenByDefault: true,
              nestingLevel: child.depth,
              listItem: child
            } as unknown as NodeType
            :
            child.item.id.toString();
        }
      }
    }
  }

  const onEquip = useCallback(
    (item: EsoItem) => {
      build.equip(item, esoSlotToEquipmentSlot(item.slot));
      buildOnChange(build);
    },
    [build, buildOnChange]
  );

  const getEsoSetNode = (set: EsoSet, isOpen: boolean, toggle: () => void) => {
    const setClass = set.type === EsoSetType.mythic ? 'item-mythic' : '';
    const rowExpandOnClick = (e: any) => {
      toggle();
    };

    return (
      <>
        <div className='inventory-expander-cell' onClick={rowExpandOnClick}>
          <img src={isOpen ? treeOpenImage : treeClosedImage} alt={isOpen ? 'Expand' : 'Collapse'}></img>
        </div>
        <ItemSetTooltip set={set}>
          <div className='inventory-item-cell'>
            <img src={'../images/gear/' + set.image} alt={set.name}></img>
            <span className={setClass}>{set.name}</span>
          </div>
        </ItemSetTooltip>
      </>
    );
  };
  const getEsoItemNode = (item: EsoItem) => {
    return (
      <>
        <div className='inventory-expander-cell'></div>
        <InventoryItem item={item} build={build} onEquip={onEquip} />
      </>
    );
  };

  const Node = ({ data: { isLeaf, listItem }, isOpen, style, toggle }: FixedSizeNodeComponentProps<NodeType>) => {
    const { item } = listItem;
    const node = isLeaf ? getEsoItemNode(item as EsoItem) : getEsoSetNode(item as EsoSet, isOpen, toggle);

    return (
      <div style={style} className='inventory-item-row'>
        {node}
      </div>
    );
  };

  return (
    <div className='inventory-container'>
      <FixedSizeTree treeWalker={treeWalker} itemSize={64} height={525} width={370}>
        {Node}
      </FixedSizeTree>
    </div>
  );
}
