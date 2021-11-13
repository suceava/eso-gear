
import { InventoryFilter } from './InventoryFilter';
import { InventoryList } from './InventoryList';
import {
  InventorySettings,
  InventoryFilterType,
  InventorySubFilterType
} from './InventorySettings';
import { useStickyState } from '../stickyState';
import { EquipmentBuild } from '../character/EquipmentBuild';

import './Inventory.css';

export interface InventoryProps {
  build: EquipmentBuild;
  buildOnChange: (newBuild: EquipmentBuild) => void;
};

export function Inventory({ build, buildOnChange }: InventoryProps) {
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
        search={settings.inventorySearch} searchOnChange={searchOnChange}
      />
      <hr />
      <InventoryList
        build={build}
        buildOnChange={buildOnChange}
        filter={settings.inventoryFilter}
        subFilter={settings.inventorySubFilter}
        search={settings.inventorySearch}
      />
    </div>
  );
}
