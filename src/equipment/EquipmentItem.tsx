import { useDrop } from 'react-dnd'

import { EquipmentSlot, equipmentSlotToEsoSlot } from './EquipmentBuild';
import { ItemTooltip } from '../tooltips/Tooltips';
import { EsoItem } from '../data/eso-sets';

export interface EquipmentSlotProps {
  slot: EquipmentSlot;
  item: EsoItem | undefined;
  onItemDrop: (droppedItem: EsoItem, slot: EquipmentSlot) => void;
}

export function EquipmentItem({ slot, item, onItemDrop }: EquipmentSlotProps) {
  const [{ canDrop }, drop] = useDrop({
    accept: equipmentSlotToEsoSlot(slot),
    drop: (droppedItem: EsoItem) => onItemDrop(droppedItem, slot),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let className = 'gear-slot';
  if (!item) {
    className = ` gear-slot-${slot}`;
  }
  if (canDrop) {
    className += ' drop-target';
  }

  return (
    <div ref={drop} className={className}>
      {item && 
        <ItemTooltip item={item}>
          <img src={`../images/gear/${item.image}`} alt={item.name} />
        </ItemTooltip>
    }
    </div>
  );
}
