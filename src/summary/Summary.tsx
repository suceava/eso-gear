import { EquipmentBuild } from '../equipment/EquipmentBuild';
import { GearSummary } from './GearSummary';

import './Summary.css';

export interface SummaryProps {
  build: EquipmentBuild;
  layout: string;
}

export function Summary({ build, layout }: SummaryProps) {
  return (
    <div className='Summary window'>
      <h1>SUMMARY</h1>
      <hr/>
      <h2>{build.name}</h2>
      <GearSummary build={build} showItem={layout === 'view'}></GearSummary>
    </div>
  );
}
