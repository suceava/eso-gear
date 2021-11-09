import { useRef, useState } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { EsoItem } from '../data/eso-sets';
import { ItemTooltip } from '../tooltips/Tooltips';

export interface InventoryItemProps {
  item: EsoItem;
}

export function InventoryItem({ item }: InventoryItemProps) {
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
          <img src={imgPath} alt={item.name}></img>
          <span className='item-legendary'>{item.name}</span>
        </div>
      </div>
      <ItemTooltip item={item} target={tooltipRef} show={showTip}></ItemTooltip>
    </>
  );
}
