// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import { useState } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

import { InventoryFilterType } from './InventorySettings';

import './Inventory.css';

export interface InventoryFilterProps {
  filter: InventoryFilterType;
  filterOnChange: (filter: InventoryFilterType) => void;
}

export function InventoryFilter({ filter, filterOnChange }: InventoryFilterProps) {
  const filterButtonOnClick = (e: any, newFilter: InventoryFilterType) => {
    filterOnChange(newFilter);
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
            ></Button>
          );
        })
      }
    </ButtonToolbar>
  );
}
