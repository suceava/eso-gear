import { useMemo } from 'react';
import { 
  useTable,
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableInstance
} from 'react-table';
import './Inventory.css';
import setsData from '../data/eso-sets.json';

interface InventoryTableData {
  image: string,
  name: string
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
  const data: InventoryTableData[] = useMemo(() => setsData.ESO_SETS.map((s) => ({ image: s.image, name: s.name })), []);
  const columns = useMemo(() => [
    {
      Header: '',
      accessor: 'image',
      Cell: ({ row }: { row: any }) => {
        return <img src={"../images/gear/" + row.values.image} title="AHA" alt="AHA"></img>
      }
    } as Column<InventoryTableData>,
    {
      Header: 'NAME',
      accessor: 'name'
    } as Column<InventoryTableData>
  ], []);
  const tableInstance = useTable({ columns, data });

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
