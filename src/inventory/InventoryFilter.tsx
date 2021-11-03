// import 'bootstrap/dist/css/bootstrap-grid.min.css';
// import { useState } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

import { InventoryFilterType } from './InventorySettings';

import './Inventory.css';

export function InventoryFilter(props: {
  inventoryFilter: InventoryFilterType,
  filterOnChange: (filter: InventoryFilterType) => void
}) {

  const filterButtonOnClick = (e: any, filter: InventoryFilterType) => {
    props.filterOnChange(filter);
  }

  return (
    <ButtonToolbar className='inventory-filter-button-toolbar'>
      {
        Object.keys(InventoryFilterType).map(f => {
          let cls = `inventory-filter-button-${f}`;
          if (props.inventoryFilter === f) {
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
