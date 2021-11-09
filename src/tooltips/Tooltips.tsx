import Overlay from 'react-bootstrap/Overlay';
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
  const set = props.set;

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      popperConfig={popperConfig}
      overlay={
        <Tooltip id={`tooltip_set_${set.name}`} className='tooltip'>
          <div className='tooltip-item-set'>
            <img src={'../images/gear/' + set.image} alt={set.name}></img>
            <h1 className='item-legendary'>{set.name}</h1>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: set.htmlDescription }} />
            <hr />
            <div className='tooltip-item-set-type'>{set.type}</div>
            {
              set.location && set.location.length ?
                <div className='tooltip-item-set-location'>{set.location[0].name}</div>
                :
                undefined
            }
          </div>
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}


function TooltipContent(props: { item: EsoItem }) {
  const item = props.item;

  return (
    <div className='tooltip-item'>
      <img src={'../images/gear/' + item.image} alt={item.name}></img>
      <h1 className='item-legendary'>{item.name}</h1>
      <hr />
      <h3>{`Part of the ${item.setName} set`}</h3>
    </div>
  );
};

export interface ItemTooltipProps {
  item: EsoItem;
  show: boolean;
  target: any;
}

export function ItemTooltip({ item, show, target }: ItemTooltipProps) {
  return (
    <Overlay
      target={target.current}
      show={show}
      popperConfig={popperConfig}
      placement='left'
    >
      {(props) => (
        <Tooltip id="tooltip" className='tooltip' {...props}>
          <TooltipContent item={item} />
        </Tooltip>
      )}
    </Overlay>
  );
}

export function SimpleItemTooltip(props: { item: EsoItem, children: any }) {
  const item = props.item;

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      overlay={
        <Tooltip id={`tooltip_item_${item.name}`} className='tooltip'>
          <TooltipContent item={item} />
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
