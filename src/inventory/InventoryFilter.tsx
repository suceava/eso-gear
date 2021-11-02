// import 'bootstrap/dist/css/bootstrap-grid.min.css';
import { ButtonToolbar, Button } from 'react-bootstrap';
import './Inventory.css';

export function InventoryFilter(props: any) {
  return (
    <ButtonToolbar className='inventory-filter-button-toolbar'>
      <Button className='inventory-filter-button-all selected'></Button>
      <Button className='inventory-filter-button-weapons'></Button>
      <Button className='inventory-filter-button-armor'></Button>
      <Button className='inventory-filter-button-jewelry'></Button>
    </ButtonToolbar>
  );
}
