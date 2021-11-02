import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import './Tooltips.css';

export function ItemSetTooltip(props: any) {
  const row = props.row;

  return (
    <OverlayTrigger placement='left' delay={500} overlay={
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

export function ItemTooltip(props: any) {
  const row = props.row;

  return (
    <OverlayTrigger placement='left' delay={500} overlay={
      <Tooltip id={`tooltip_item_${row.name}`} className='tooltip'>
        <div className='tooltip-item'>
        </div>
      </Tooltip>
    }>
      {props.children}
    </OverlayTrigger>
  );
}
