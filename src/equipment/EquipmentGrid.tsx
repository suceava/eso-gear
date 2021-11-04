import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Equipment from './Equipment';
import { EquipmentBuild } from './EquipmentBuild';
import { Inventory } from '../inventory/Inventory';
import { Summary } from '../summary/Summary';
import { useStickyState } from '../stickyState';


function EquipmentGrid() {
  // buildObj will be deserialized as a plain object
  const [buildObj, setBuild] = useStickyState<EquipmentBuild>(new EquipmentBuild(), 'EquipmentBuild');
  // instantiate build from buildObj
  const build = EquipmentBuild.fromPlainBuild(buildObj);

  const buildOnChange = (newBuild: EquipmentBuild) => {
    setBuild(prevBuild => newBuild);
  };

  return (
    <div className="EquipmentGrid">
      <DndProvider backend={HTML5Backend}>
        <Summary build={build}></Summary>
        <Equipment build={build} buildOnChange={buildOnChange}></Equipment>
        <Inventory></Inventory>
      </DndProvider>
    </div>
  );
}

export default EquipmentGrid;
