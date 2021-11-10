import { EquipmentBuild } from './EquipmentBuild';
import { EquipmentGear } from './EquipmentGear';
import { EquipmentStats } from './EquipmentStats';

import './Equipment.css';

export interface EquipmentProps {
  build: EquipmentBuild;
  buildOnChange: (newBuild: EquipmentBuild) => void;
}

export function Equipment({ build, buildOnChange }: EquipmentProps) {
  return (
    <div className='Equipment window'>
      <h1>EQUIPMENT</h1>
      <hr/>
      <div className='equipment-grid'>
        <div>
          <EquipmentStats build={build} />
        </div>
        <div>
          <EquipmentGear build={build} buildOnChange={buildOnChange} />
        </div>
      </div>
    </div>
  );
}
