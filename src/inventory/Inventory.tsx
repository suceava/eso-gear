
import { InventoryFilter } from './InventoryFilter';
import {
  InventorySettings,
  InventoryFilterType
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

  return (
    <div className='Inventory window'>
      <h1>INVENTORY</h1>
      <hr />
      <InventoryFilter filter={settings.inventoryFilter} filterOnChange={filterOnChange} />
      <hr />
      <InventoryTable filter={settings.inventoryFilter} />
    </div>
  );
}
