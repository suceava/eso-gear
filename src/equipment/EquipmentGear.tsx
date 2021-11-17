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
      build.equip(droppedItem, slot);
      buildOnChange(build);
    },
    [build, buildOnChange]
  );
  const onUnequip = useCallback(
    (slot: EquipmentSlot) => {
      build.unequip(slot);
      buildOnChange(build);
    },
    [build, buildOnChange]
  );
  const onToggleWeaponSet = useCallback(
    () => {
      build.toggleWeaponSet();
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
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.shoulders}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.hands}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.legs}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.head}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-3 gear-slot-dummy'></div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <div className='gear-slot-empty'></div>
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.chest}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.waist}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.feet}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
      </div>
      <hr/>
      <h2>ACCESSORIES</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.neck}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.ring1}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.ring2}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
      </div>
      <hr/>
      <h2>WEAPONS</h2>
      <div className='gear-slots-grid'>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.mainHand1}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.mainHand2}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.offHand1}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.offHand2}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
        </div>
        <div className='gear-slots-col'>
          <div className='gear-slots-row-2'>
            <div className='gear-slot-weapon-swap gear-slot' onClick={onToggleWeaponSet}>
              <span>{build.isMainWeaponSetActive ? 1 : 2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
