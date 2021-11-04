import { DragPreviewImage, useDrag } from 'react-dnd';

import { EsoItem } from '../data/eso-sets';
import { ItemTooltip } from '../tooltips/Tooltips';

export function InventoryItem(props: { item: EsoItem }) {
  const { item } = props;

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: item.slot,
      item,
      collect: (monitor) => ({
        //isDragging: !!monitor.isDragging()
        opacity: monitor.isDragging() ? 1 : 1
      })
    })
  );

  const imgPath = `../images/gear/${item.image}`;

  return (
    <>
      <DragPreviewImage connect={preview} src={imgPath} />
      <ItemTooltip row={item}>
        <div ref={drag} className='inventory-item-row'>
          <img src={imgPath} alt={item.name}></img>
          <span className='item-legendary'>{item.name}</span>
        </div>
      </ItemTooltip>
    </>
  );
}
