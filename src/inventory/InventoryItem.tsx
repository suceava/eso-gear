import { DragPreviewImage, useDrag } from 'react-dnd';

import { EsoItem } from '../data/eso-sets';
import { ItemTooltip } from '../tooltips/Tooltips';

export interface InventoryItemProps {
  item: EsoItem;
}

export function InventoryItem({ item }: InventoryItemProps) {
  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: item.slot,
      item,
      collect: (monitor) => {
        // console.log(monitor);
        return ({
          //isDragging: !!monitor.isDragging()
          opacity: monitor.isDragging() ? 1 : 1
        });
      }
    })
  );

  const imgPath = `../images/gear/${item.image}`;

  return (
    <>
      <DragPreviewImage connect={preview} src={imgPath} />
      <ItemTooltip item={item}>
        <div ref={drag} className='inventory-item-row'>
          <img src={imgPath} alt={item.name}></img>
          <span className='item-legendary'>{item.name}</span>
        </div>
      </ItemTooltip>
    </>
  );
}
