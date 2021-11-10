import { ButtonToolbar, Button, FormControl } from 'react-bootstrap';

import {
  InventoryFilterType,
  InventoryWeaponSubFilterType,
  inventoryFilterTypeToString,
  inventoryWeaponSubFilterTypeToString
} from './InventorySettings';

import './Inventory.css';

export interface InventoryFilterProps {
  filter: InventoryFilterType;
  filterOnChange: (filter: InventoryFilterType) => void;
  search: string;
  searchOnChange: (search: string) => void;
}

export function InventoryFilter({ filter, filterOnChange, search, searchOnChange }: InventoryFilterProps) {
  const filterButtonOnClick = (e: any, newFilter: InventoryFilterType) => {
    filterOnChange(newFilter);
  }
  // const subFilterButtonOnClick = (e: any, newSubFilter: InventoryWeaponSubFilterType) => {
  // }

  const searchInputOnBlur = (e: any) => {
    searchOnChange(e.target.value);
  }
  const searchInputOnKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      searchOnChange(e.target.value);
    }
  }

  return (
    <>
      <ButtonToolbar className='inventory-filter-button-toolbar'>
        {
          Object.keys(InventoryFilterType).map(f => {
            const filterType = f as InventoryFilterType;
            let cls = `inventory-filter-button-${f}`;
            if (filter === f) {
              cls += ' selected';
            }

            return (
              <Button
                key={f}
                className={cls}
                onClick={(e) => filterButtonOnClick(e, filterType)}
                title={inventoryFilterTypeToString(filterType)}
              ></Button>
            );
          })
        }
      </ButtonToolbar>
      <ButtonToolbar className='inventory-filter-button-toolbar'>
        <Button
          key={InventoryFilterType.all}
          className='inventory-filter-button-all'
          title={inventoryFilterTypeToString(InventoryFilterType.all)}
        ></Button>
        {
          (filter === InventoryFilterType.all || filter === InventoryFilterType.weapons) &&
          Object.keys(InventoryWeaponSubFilterType).map(f => {
            const filterType = f as InventoryWeaponSubFilterType;
            if (filterType === InventoryWeaponSubFilterType.all) {
              return null;
            }
            return (
              <Button
                key={f}
                className={`inventory-filter-button-weapons-${f}`}
                title={inventoryWeaponSubFilterTypeToString(filterType)}
              ></Button>
            );
          })
        }
      </ButtonToolbar>
      <FormControl
        placeholder='Search'
        className='inventory-filter-search'
        defaultValue={search}
        onKeyPress={searchInputOnKeyPress}
        onBlur={searchInputOnBlur}
      />
    </>
  );
}
