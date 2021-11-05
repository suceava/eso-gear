import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { EsoItem } from '../data/eso-sets';
import './Tooltips.css';

const popperConfig = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 64]
      }
    }
  ]
}

export function ItemSetTooltip(props: any) {
  const row = props.row;

  return (
    <OverlayTrigger placement='bottom' flip={true} popperConfig={popperConfig} overlay={
      <Tooltip id={`tooltip_set_${row.name}`} className='tooltip'>
        <div className='tooltip-item-set'>
          <img src={'../images/gear/' + row.image} alt={row.name}></img>
          <h1 className='item-legendary'>{row.name}</h1>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: row.htmlDescription }} />
          <hr />
          <div className='tooltip-item-set-type'>{row.type}</div>
          {
            row.location && row.location.length ?
              <div className='tooltip-item-set-location'>{row.location[0].name}</div>
              :
              undefined
          }
        </div>
      </Tooltip>
    }>
      {props.children}
    </OverlayTrigger>
  );
}

export interface ItemTooltipProps {
  item: EsoItem;
}

//export const ItemTooltip: FunctionComponent<ItemTooltipProps> = (props) =>{
export function ItemTooltip(props: any) {
  const item = props.item;

  return (
    <OverlayTrigger
      placement='bottom'
      flip={true}
      popperConfig={popperConfig}
      overlay={
        <Tooltip id={`tooltip_item_${item.name}`} className='tooltip'>
          <div className='tooltip-item'>
            <img src={'../images/gear/' + item.image} alt={item.name}></img>
            <h1 className='item-legendary'>{item.name}</h1>
            <hr />
            <h3>{`Part of the ${item.setName} set`}</h3>
          </div>
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
