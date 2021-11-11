import { useCallback } from 'react';

import { EquipmentItem } from './EquipmentItem';
import { EquipmentBuild, EquipmentSlot } from '../character/EquipmentBuild';
import { EsoItem } from '../data/eso-sets';

export interface EquipmentProps {
  build: EquipmentBuild;
  buildOnChange: (newBuild: EquipmentBuild) => void;
}

export function EquipmentGear({ build, buildOnChange }: EquipmentProps) {
  const onEquip = useCallback(
    (droppedItem: EsoItem, slot: EquipmentSlot) => {
      console.log('equipped', droppedItem, slot);
      build.equip(droppedItem, slot);
      buildOnChange(build);
    },
    [build, buildOnChange]
  );

  return (
    <div className="equipment-gear">
      <h2>APPAREL</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.shoulders} item={build.items[EquipmentSlot.shoulders]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.hands} item={build.items[EquipmentSlot.hands]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.legs} item={build.items[EquipmentSlot.legs]} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.head} item={build.items[EquipmentSlot.head]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-3 gear-slot-dummy'></div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.chest} item={build.items[EquipmentSlot.chest]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.waist} item={build.items[EquipmentSlot.waist]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.feet} item={build.items[EquipmentSlot.feet]} onItemDrop={onEquip} />
          </div>
        </div>
      </div>
      <hr/>
      <h2>ACCESSORIES</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.neck} item={build.items[EquipmentSlot.neck]} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.ring1} item={build.items[EquipmentSlot.ring1]} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.ring2} item={build.items[EquipmentSlot.ring2]} onItemDrop={onEquip} />
          </div>
        </div>
      </div>
      <hr/>
      <h2>WEAPONS</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.mainHand1} item={build.items[EquipmentSlot.mainHand1]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.mainHand2} item={build.items[EquipmentSlot.mainHand2]} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.offHand1} item={build.items[EquipmentSlot.offHand1]} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem build={build} slot={EquipmentSlot.offHand2} item={build.items[EquipmentSlot.offHand2]} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
        </div>
      </div>
    </div>
  )
}
