import { useDrop } from 'react-dnd'

import { EquipmentBuild } from '../character/EquipmentBuild';
import { EquipmentSlot, equipmentSlotToEsoSlot } from '../character/EquipmentBuildSlot';
import { EquipmentItemTooltip } from '../tooltips/Tooltips';
import { EsoItem } from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';

export interface EquipmentSlotProps {
  build: EquipmentBuild;
  slot: EquipmentSlot;
  onEquip: (droppedItem: EsoItem, slot: EquipmentSlot) => void;
  onUnequip: (slot: EquipmentSlot) => void;
}

export function EquipmentItem({ build, slot, onEquip, onUnequip }: EquipmentSlotProps) {
  const [{ canDrop }, drop] = useDrop({
    accept: equipmentSlotToEsoSlot(slot),
    drop: (droppedItem: EsoItem) => onEquip(droppedItem, slot),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const buildItem = build.getEquipmentItem(slot);
  const item = buildItem ? buildItem.item : undefined;
  const set = item ? getEsoSetByName(item.setName) : undefined;

  let className = 'gear-slot';
  if (!item) {
    className = ` gear-slot-${slot}`;
  }
  if (canDrop) {
    className += ' drop-target';
  }
  if ((slot === EquipmentSlot.mainHand1 || slot === EquipmentSlot.offHand1) && build.isMainWeaponSetActive) {
    className += ' gear-slot-weapon-active';
  } else if ((slot === EquipmentSlot.mainHand2 || slot === EquipmentSlot.offHand2) && !build.isMainWeaponSetActive) {
    className += ' gear-slot-weapon-active';
  }

  return (
    <div ref={drop} className={className} onDoubleClick={() => onUnequip(slot)}>
      {item && 
        <EquipmentItemTooltip build={build} item={item} set={set}>
          <img src={`../images/gear/${item.image}`} alt={item.name} />
        </EquipmentItemTooltip>
    }
    </div>
  );
}
