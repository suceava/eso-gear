import { useMemo } from 'react';
import { 
  useTable,
  useExpanded,
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableInstance
} from 'react-table';
import './Inventory.css';
import treeOpenImage from '../images/tree_open_up.png';
import treeClosedImage from '../images/tree_closed_up.png';
import setsData from '../data/eso-sets.json';

interface InventoryTableData {
  image: string,
  name: string,
  items?: {
    list: Array<InventoryTableData>
  }
}

function getTable(tableInstance: TableInstance<InventoryTableData>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column: HeaderGroup<InventoryTableData>) => (
                  <th {...column.getHeaderProps()}>
                    { column.render('Header') }
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
                        { cell.render('Cell') }
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
  );
}

function Inventory() {
  const data: InventoryTableData[] = useMemo(() => setsData.ESO_SETS, []);
  const columns = useMemo(() => [
    {
      id: 'expander',
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => {
        const img = <img src={isAllRowsExpanded ? treeOpenImage : treeClosedImage} alt={isAllRowsExpanded ? 'Expand' : 'Collapse'}></img>
        return ( <span {...getToggleAllRowsExpandedProps()}>{img}</span>);
      },
      Cell: ({ row }: { row: any }) => {
        let img;
        if (row.canExpand) {
          img = <img src={row.isExpanded ? treeOpenImage : treeClosedImage} alt={row.isExpanded ? 'Expand' : 'Collapse'}></img>
        }
        return ( <span {...row.getToggleRowExpandedProps()}>{img}</span> );
      }
    } as Column<InventoryTableData>,
    {
      Header: '',
      accessor: 'image',
      Cell: ({ row }: { row: any }) => {
        return <img src={"../images/gear/" + row.values.image} title="" alt={row.values.name}></img>
      }
    } as Column<InventoryTableData>,
    {
      Header: 'NAME',
      accessor: 'name',
      Cell: ({ row }: { row: Row<InventoryTableData> }) => {
        // console.log(row);
        let className = '';
        if (row.depth > 0) {
          className += 'item-legendary ';
        }
        return ( <span className={className}>{row.values.name}</span> );
      }
    } as Column<InventoryTableData>
  ], []);

  const getSubRows = (originalRow: InventoryTableData, index: number) => {
    return originalRow?.items?.list || [];
  }

  const tableInstance = useTable({ columns, data, getSubRows }, useExpanded);

  return (
    <div className="Inventory window">
      <h1>INVENTORY</h1>
      <hr/>
      <div className="inventory-container">
        { getTable(tableInstance) }
      </div>
    </div>
  );
}

export default Inventory;
