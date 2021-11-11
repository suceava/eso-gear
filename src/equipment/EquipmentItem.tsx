import { useDrop } from 'react-dnd'

import { EquipmentBuild, EquipmentSlot, equipmentSlotToEsoSlot } from '../character/EquipmentBuild';
import { SimpleItemTooltip } from '../tooltips/Tooltips';
import { EsoItem } from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';

export interface EquipmentSlotProps {
  build: EquipmentBuild;
  slot: EquipmentSlot;
  item: EsoItem | undefined;
  onItemDrop: (droppedItem: EsoItem, slot: EquipmentSlot) => void;
}

export function EquipmentItem({ build, slot, item, onItemDrop }: EquipmentSlotProps) {
  const [{ canDrop }, drop] = useDrop({
    accept: equipmentSlotToEsoSlot(slot),
    drop: (droppedItem: EsoItem) => onItemDrop(droppedItem, slot),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const set = item ? getEsoSetByName(item.setName) : undefined;

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
        <SimpleItemTooltip build={build} item={item} set={set}>
          <img src={`../images/gear/${item.image}`} alt={item.name} />
        </SimpleItemTooltip>
    }
    </div>
  );
}
