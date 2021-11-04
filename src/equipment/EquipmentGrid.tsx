import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Equipment from './Equipment';
import { Inventory } from '../inventory/Inventory';

function EquipmentGrid() {
  return (
    <div className="EquipmentGrid">
      <DndProvider backend={HTML5Backend}>
        <Equipment></Equipment>
        <Inventory></Inventory>
      </DndProvider>
    </div>
  );
}

export default EquipmentGrid;
