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

import { EsoSet, EsoItem, EsoSlot } from '../data/eso-sets';
import { InventoryFilterType } from './InventorySettings';
import { ItemSetTooltip, ItemTooltip } from '../tooltips/Tooltips';

import './Inventory.css';
import treeOpenImage from '../images/tree_open_up.png';
import treeClosedImage from '../images/tree_closed_up.png';

// json data
import setsData from '../data/eso-sets.json';
// enforce typing
const ESO_SETS: EsoSet[] = setsData as EsoSet[];


interface InventoryTableData {
  image: string,
  name: string,
  items?: {
    list: InventoryTableData[]
  }
}

function rowExpandOnClick(originalOnClick: any) {
  return (e: any) => {
    if (originalOnClick) {
      originalOnClick(e);
    }
  };
}

export function InventoryTable(props: { inventoryFilter: InventoryFilterType }) {
  const data: InventoryTableData[] = useMemo(() => ESO_SETS, []);
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
        // console.log(row);
        let className = '';

        if (row.depth === 0) {
          // top level => item set
          return (
            <ItemSetTooltip row={row.original}>
              <div>
                <img src={'../images/gear/' + row.original.image} alt={row.values.name}></img>
                <span className={className}>{row.values.name}</span>
              </div>
            </ItemSetTooltip>
          );
        } else {
          // item of a set
          className += 'item-legendary ';

          return (
            <ItemTooltip row={row.original}>
              <div className='inventory-item-row'>
                <img src={'../images/gear/' + row.original.image} alt={row.values.name}></img>
                <span className={className}>{row.values.name}</span>
              </div>
            </ItemTooltip>
          );
        }
      }
    } as Column<InventoryTableData>
  ], []);

  const getSubRows = (originalRow: InventoryTableData, index: number) => {
    return originalRow?.items?.list || [];
  };

  const globalFilter = (
    rows: Row<InventoryTableData>[],
    columnIds: string[],
    filterValue: string
  ) : Row<InventoryTableData>[] => {
    if (props.inventoryFilter === InventoryFilterType.all) {
      return rows;
    }

    return rows.filter(r => {
      if (r.depth === 0) {
        // set -> must contain an item matching filter
        const orig: EsoSet = r.original as EsoSet;
        if (props.inventoryFilter === InventoryFilterType.jewelry) {
          return orig.items.list.find((i: EsoItem) => i.slot === EsoSlot.ring || i.slot === EsoSlot.neck);
        }
      } else {
        // item
        const orig: EsoItem = r.original as EsoItem;
        if (props.inventoryFilter === InventoryFilterType.jewelry) {
          return orig.slot === EsoSlot.ring || orig.slot === EsoSlot.neck;
        }
      }

      return true;
    });
  }

  const useControlledState = (state: any) => {
    return useMemo(
      () => ({
        ...state,
        globalFilter: props.inventoryFilter
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
                        <td {...cell.getCellProps()}>
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