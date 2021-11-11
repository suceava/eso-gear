
import { InventoryFilter } from './InventoryFilter';
import {
  InventorySettings,
  InventoryFilterType,
  InventorySubFilterType
} from './InventorySettings';
import { InventoryTable } from './InventoryTable';
import { useStickyState } from '../stickyState';

import './Inventory.css';
import { EquipmentBuild } from '../equipment/EquipmentBuild';

export interface InventoryProps {
  build: EquipmentBuild;
};

export function Inventory({ build }: InventoryProps) {
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
        build={build}
        filter={settings.inventoryFilter}
        subFilter={settings.inventorySubFilter}
        search={settings.inventorySearch} />
    </div>
  );
}
