// import 'bootstrap/dist/css/bootstrap-grid.min.css';
import debounce from 'lodash.debounce';
import { ButtonToolbar, Button, FormControl } from 'react-bootstrap';

import { InventoryFilterType } from './InventorySettings';

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

  const searchInputOnChange = (e: any) => {
    debounce(searchOnChange, 500)(e.target.value);
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
    <ButtonToolbar className='inventory-filter-button-toolbar'>
      {
        Object.keys(InventoryFilterType).map(f => {
          let cls = `inventory-filter-button-${f}`;
          if (filter === f) {
            cls += ' selected';
          }
          return (
            <Button
              key={f}
              className={cls}
              onClick={(e) => filterButtonOnClick(e, f as InventoryFilterType)}
              title={f}
            ></Button>
          );
        })
      }
      <FormControl placeholder='Search' className='inventory-filter-search' defaultValue={search}
        onKeyPress={searchInputOnKeyPress}
        onBlur={searchInputOnBlur}
      />
    </ButtonToolbar>
  );
}
