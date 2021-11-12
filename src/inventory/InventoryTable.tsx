import { useMemo } from 'react';
import {
  useExpanded,
  useGlobalFilter,
  useTable,
  Cell,
  Column,
  HeaderGroup,
  Row
} from 'react-table';

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
import { loadEsoSetData, getEsoItemById } from '../data/esoSetDataLoader';
import { ItemSetTooltip } from '../tooltips/Tooltips';

import './Inventory.css';
import treeOpenImage from '../images/tree_open_up.png';
import treeClosedImage from '../images/tree_closed_up.png';

const ESO_SETS: EsoSet[] = loadEsoSetData();

interface InventoryTableData {
  id: number;
  image: string;
  name: string;
  items?: {
    list: InventoryTableData[];
  }
}

export interface InventoryTableProps {
  build: EquipmentBuild;
  buildOnChange: (newBuild: EquipmentBuild) => void;
  filter: InventoryFilterType;
  subFilter: InventorySubFilterType;
  search: string;
}

function rowExpandOnClick(originalOnClick: any) {
  return (e: any) => {
    if (originalOnClick) {
      originalOnClick(e);
    }
  };
}

export function InventoryTable({ build, buildOnChange, filter, subFilter, search }: InventoryTableProps) {
  const data: InventoryTableData[] = useMemo(() => ESO_SETS, []);

  const onDoubleClickRow = (e: any) => {
    if (!e.target.id) {
      return;
    }

    try {
      // id of the item
      const id = parseInt(e.target.id, 10);
      const item = getEsoItemById(id);
      if (item) {
        build.equip(item, esoSlotToEquipmentSlot(item.slot));
        buildOnChange(build);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const columns = useMemo(() => [
    {
      id: 'expander',
      // Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => {
      //   const img = <img src={isAllRowsExpanded ? treeOpenImage : treeClosedImage} alt={isAllRowsExpanded ? 'Expand' : 'Collapse'}></img>
      //   const props = getToggleAllRowsExpandedProps();
      //   props.onClick = rowExpandOnClick(props.onClick);
      //   return ( <span {...props}>{img}</span>);
      // },
      Header: '',
      Cell: ({ row }: { row: any }) => {
        let img;
        if (row.canExpand) {
          img = <img src={row.isExpanded ? treeOpenImage : treeClosedImage} alt={row.isExpanded ? 'Expand' : 'Collapse'}></img>
        }
        const props = row.getToggleRowExpandedProps();
        props.onClick = rowExpandOnClick(props.onClick);
        return (<span {...props}>{img}</span>);
      }
    } as Column<InventoryTableData>,
    {
      Header: 'NAME',
      accessor: 'name',
      Cell: ({ row }: { row: Row<InventoryTableData> }) => {
        if (row.depth === 1) {
          // bottom level => an item of a set
          return ( <InventoryItem item={row.original as EsoItem} build={build} /> );
        }

        // top level => item set
        const set = row.original as EsoSet;
        const setClass = set.type === EsoSetType.mythic ? 'item-mythic' : '';
        return (
          <ItemSetTooltip set={set}>
            <div className='inventory-item-cell'>
              <img src={'../images/gear/' + set.image} alt={set.name}></img>
              <span className={setClass}>{set.name}</span>
            </div>
          </ItemSetTooltip>
        );
      }
    } as Column<InventoryTableData>
  ], [build]);

  const getSubRows = (originalRow: InventoryTableData, index: number) => {
    return originalRow?.items?.list || [];
  };

  const itemTypeFilter = filter as unknown as EsoItemType;
  const lowerSearch = search?.toLowerCase();
  const rowMatcher = (item: EsoItem) => {
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
  };

  const globalFilter = (
    rows: Row<InventoryTableData>[],
    columnIds: string[],
    filterValue: string
  ) : Row<InventoryTableData>[] => {
    if (filter === InventoryFilterType.all && subFilter === InventorySubFilterType.all && search === '') {
      return rows;
    }

    return rows.filter(r => {
      if (r.depth === 0) {
        // set -> must contain an item matching filter
        const orig: EsoSet = r.original as EsoSet;
        return orig.items.list.find(rowMatcher);
      }

      // item
      return rowMatcher(r.original as EsoItem);
    });
  }

  const useControlledState = (state: any) => {
    return useMemo(
      () => ({
        ...state,
        globalFilter: filter
      }),
      [state]
    );
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data, getSubRows, globalFilter, useControlledState }, useGlobalFilter, useExpanded);

  return (
    <div className='inventory-container'>
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column: HeaderGroup<InventoryTableData>) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map((row: Row<InventoryTableData>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell: Cell<InventoryTableData>) => {
                      return (
                        <td {...cell.getCellProps()} onDoubleClick={cell.value && cell.row.depth === 1 ? onDoubleClickRow : undefined}>
                          {cell.render('Cell')}
                        </td>
                      );
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        {rows.length} sets
      </div>
    </div>
  );
}
