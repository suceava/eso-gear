import { ButtonToolbar, Button, FormControl } from 'react-bootstrap';

import {
  InventoryFilterType,
  InventorySubFilterType,
  isSubFilterOfFilterType
} from './inventorySettings';
import {
  Strings_InventoryFilterType,
  Strings_InventorySubFilterType,
} from '../strings/inventory';

import './Inventory.css';

export interface InventoryFilterProps {
  filter: InventoryFilterType;
  filterOnChange: (filter: InventoryFilterType) => void;
  subFilter: InventorySubFilterType;
  subFilterOnChange: (subFilter: InventorySubFilterType) => void;
  search: string;
  searchOnChange: (search: string) => void;
}

export function InventoryFilter({
  filter,
  filterOnChange,
  subFilter,
  subFilterOnChange,
  search,
  searchOnChange
}: InventoryFilterProps) {
  const filterButtonOnClick = (e: any, newFilter: InventoryFilterType) => {
    filterOnChange(newFilter);
  }
  const subFilterButtonOnClick = (e: any, newSubFilter: InventorySubFilterType) => {
    subFilterOnChange(newSubFilter);
  }

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
                title={Strings_InventoryFilterType[filterType]}
              ></Button>
            );
          })
        }
      </ButtonToolbar>
      <ButtonToolbar className='inventory-filter-button-toolbar inventory-subfilter-button-toolbar'>
        {
          Object.keys(InventorySubFilterType).map(f => {
            const subFilterType = f as InventorySubFilterType;
            if (!isSubFilterOfFilterType(filter, subFilterType)) {
              if (subFilter === f) {
                // selected subfilter not visible => select
                subFilterOnChange(InventorySubFilterType.all);
              }
              return null;
            }
            let cls = `inventory-subfilter-button-${f}`;
            if (subFilter === f) {
              cls += ' selected';
            }

            return (
              <Button
                key={f}
                className={cls}
                onClick={(e) => subFilterButtonOnClick(e, subFilterType)}
                title={Strings_InventorySubFilterType[subFilterType]}
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
