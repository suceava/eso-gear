import { useCallback } from 'react';

import { EquipmentSlot } from './EquipmentSlot';
import { EsoItem, EsoSlot } from '../data/eso-sets';

import './Equipment.css';

function Equipment() {
  const onEquip = useCallback(
    (item: EsoItem) => {
      console.log(item);
    },
    []
  );

  return (
    <div className='Equipment window'>
      <h1>EQUIPMENT</h1>
      <hr/>
      <h2>APPAREL</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.shoulders} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.hands} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.legs} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.head} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-3 gear-slot-dummy'></div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.chest} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.waist} onItemDrop={onEquip} />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.feet} onItemDrop={onEquip} />
          </div>
        </div>
      </div>
      <hr/>
      <h2>ACCESSORIES</h2>
      <hr/>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.neck} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.ring} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.ring} onItemDrop={onEquip} />
          </div>
        </div>
      </div>
      <h2>WEAPONS</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.oneHand} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentSlot slot={EsoSlot.offHand} onItemDrop={onEquip} />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;
