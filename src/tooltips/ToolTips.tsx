import ReactTooltip from 'react-tooltip';

import './ToolTips.css';

export function ItemSetToolTip () {
  const getTipContent = (dataTip: string) => {
    return (
      <div className='tooltip-item-set'>
        {dataTip}
      </div>
    );
  }

  return (
    <ReactTooltip id='itemSetTooltip' getContent={getTipContent} className='tooltip' arrowColor='transparent' />
  );
}
