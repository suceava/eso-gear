import { useDrop } from 'react-dnd'

import { EsoItem, EsoSlot } from '../data/eso-sets';

export interface EquipmentSlotProps {
  slot: EsoSlot,
  onItemDrop: (item: EsoItem) => void
}

export function EquipmentSlot({ slot, onItemDrop }: EquipmentSlotProps) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: slot,
    drop: onItemDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let className = `gear-slot-${slot}`;
  if (canDrop) {
    className += ' drop-target';
  }

  return (
    <div ref={drop} className={className}></div>
  );
}
