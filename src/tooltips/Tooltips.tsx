import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { EsoItem, EsoSet, EsoSetType } from '../data/eso-sets';
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
  const setClass = (set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      popperConfig={popperConfig}
      overlay={
        <Tooltip id={`tooltip_set_${set.name}`} className='tooltip'>
          <div className='tooltip-item-set'>
            <img src={'../images/gear/' + set.image} alt={set.name}></img>
            <h1 className={setClass}>{set.name}</h1>
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


function TooltipContent(props: { item: EsoItem, set?: EsoSet }) {
  const { item, set } = props;
  const itemClass = (set && set.type === EsoSetType.mythic) ? 'item-mythic' : 'item-legendary';

  return (
    <div className='tooltip-item'>
      <img src={'../images/gear/' + item.image} alt={item.name}></img>
      <h1 className={itemClass}>{item.name}</h1>
      <hr />
      <h3>{`Part of the ${item.setName} set`}</h3>
    </div>
  );
};

export interface ItemTooltipProps {
  item: EsoItem;
  set: EsoSet;
  show: boolean;
  target: any;
}

export function ItemTooltip({ item, set, show, target }: ItemTooltipProps) {
  return (
    <Overlay
      target={target.current}
      show={show}
      popperConfig={popperConfig}
      placement='left'
    >
      {(props) => (
        <Tooltip id="tooltip" className='tooltip' {...props}>
          <TooltipContent item={item} set={set} />
        </Tooltip>
      )}
    </Overlay>
  );
}

export function SimpleItemTooltip(props: { item: EsoItem, set?: EsoSet, children: any }) {
  const { item, set } = props;

  return (
    <OverlayTrigger
      placement='left'
      flip={true}
      overlay={
        <Tooltip id={`tooltip_item_${item.name}`} className='tooltip'>
          <TooltipContent item={item} set={set} />
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
