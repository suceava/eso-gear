import { useRef, useState } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { EquipmentBuild } from '../character/EquipmentBuild';
import { EsoItem, EsoSetType } from '../data/eso-sets';
import { getEsoSetByName } from '../data/esoSetDataLoader';
import { ItemTooltip } from '../tooltips/Tooltips';

export interface InventoryItemProps {
  build?: EquipmentBuild;
  // onDoubleClickRow: (item: EsoItem) => void;
  item: EsoItem;
}

export function InventoryItem({ build, onDoubleClickRow, item }: InventoryItemProps) {
  const [showTip, setShowTip] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: item.slot,
      item,
      collect: (monitor) => {
        return ({
          isDragging: !!monitor.isDragging(),
          opacity: monitor.isDragging() ? 1 : 1
        });
      }
    })
  );

  const onMouseEnterRow = () => {
    if (!isDragging) {
      setShowTip(true);
    }
  }
  if (isDragging && showTip) {
    // hide tooltip when dragging
    setShowTip(false);
  }

  const tooltipRef = useRef<HTMLDivElement>(null);
  const imgPath = `../images/gear/${item.image}`;
  const set = getEsoSetByName(item.setName);
  const itemClass = (set && set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';

  return (
    <>
      <DragPreviewImage connect={preview} src={imgPath} />
      <div
        ref={tooltipRef}
        className='inventory-item-cell inventory-item'
        onMouseEnter={onMouseEnterRow}
        onMouseLeave={() => setShowTip(false)}
      >
        <div ref={drag}>
          <img id={item.id.toString()} src={imgPath} alt={item.name}></img>
          <span id={item.id.toString()} className={itemClass}>{item.name}</span>
        </div>
      </div>
      <ItemTooltip item={item} set={set} target={tooltipRef} show={showTip}></ItemTooltip>
    </>
  );
}
