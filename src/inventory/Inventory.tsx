
import { InventoryFilter } from './InventoryFilter';
import {
  InventorySettings,
  InventoryFilterType,
  InventorySubFilterType
} from './InventorySettings';
import { InventoryTable } from './InventoryTable';
import { useStickyState } from '../stickyState';

import './Inventory.css';


export function Inventory() {
  const [settings, setSettings] = useStickyState<InventorySettings>(new InventorySettings(), 'InventorySettings');
  const filterOnChange = (filter: InventoryFilterType) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      inventoryFilter: filter
    }));
  };
  const subFilterOnChange = (subFilter: InventorySubFilterType) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      inventorySubFilter: subFilter
    }));
  };
  const searchOnChange = (search: string) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      inventorySearch: search
    }));
  };

  return (
    <div className='Inventory window'>
      <h1>INVENTORY</h1>
      <hr />
      <InventoryFilter
        filter={settings.inventoryFilter} filterOnChange={filterOnChange}
        subFilter={settings.inventorySubFilter} subFilterOnChange={subFilterOnChange}
        search={settings.inventorySearch} searchOnChange={searchOnChange} />
      <hr />
      <InventoryTable
        filter={settings.inventoryFilter}
        subFilter={settings.inventorySubFilter}
        search={settings.inventorySearch} />
    </div>
  );
}
