import { Inventory } from '../inventory/Inventory';
import Equipment from './Equipment';

function EquipmentGrid() {
  return (
    <div className="EquipmentGrid">
      <Equipment></Equipment>
      <Inventory></Inventory>
    </div>
  );
}

export default EquipmentGrid;
