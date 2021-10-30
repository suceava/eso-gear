import React from 'react';
import './Inventory.css';
import setsData from '../data/eso-sets';


function Inventory() {
  return (
    <div className="Inventory window">
      <h1>INVENTORY</h1>
      <hr/>
      <div>
        <ul>
          {setsData.map(s => <li key={s.name}>{s.name}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
