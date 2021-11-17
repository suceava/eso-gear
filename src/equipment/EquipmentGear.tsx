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
              item={build.items[EquipmentSlot.shoulders]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.hands}
              item={build.items[EquipmentSlot.hands]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.legs}
              item={build.items[EquipmentSlot.legs]}
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
              item={build.items[EquipmentSlot.head]}
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
              item={build.items[EquipmentSlot.chest]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.waist}
              item={build.items[EquipmentSlot.waist]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.feet}
              item={build.items[EquipmentSlot.feet]}
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
              item={build.items[EquipmentSlot.neck]}
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
              item={build.items[EquipmentSlot.ring1]}
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
              item={build.items[EquipmentSlot.ring2]}
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
              item={build.items[EquipmentSlot.mainHand1]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.mainHand2}
              item={build.items[EquipmentSlot.mainHand2]}
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
              item={build.items[EquipmentSlot.offHand1]}
              onEquip={onEquip}
              onUnequip={onUnequip}
            />
          </div>
          <div className='gear-slots-row-1'>
            <EquipmentItem
              build={build}
              slot={EquipmentSlot.offHand2}
              item={build.items[EquipmentSlot.offHand2]}
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
