import React from 'react';
import './Equipment.css';

function Equipment() {
  return (
    <div className="Equipment window">
      <h1>EQUIPMENT</h1>
      <hr/>
      <h2>APPAREL</h2>
      <div className="gear-slots-grid">
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-empty"></div>
          <div className="gear-slots-row-1 gear-slot-shoulders"></div>
          <div className="gear-slots-row-1 gear-slot-hands"></div>
          <div className="gear-slots-row-1 gear-slot-legs"></div>
        </div>
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-head"></div>
          <div className="gear-slots-row-3 gear-slot-dummy"></div>
        </div>
        <div className="gear-slots-col">
        <div className="gear-slots-row-1"></div>
          <div className="gear-slots-row-1 gear-slot-chest"></div>
          <div className="gear-slots-row-1 gear-slot-belt"></div>
          <div className="gear-slots-row-1 gear-slot-feet"></div>
        </div>
      </div>
      <hr/>
      <h2>ACCESSORIES</h2>
      <hr/>
      <div className="gear-slots-grid">
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-neck"></div>
        </div>
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-ring"></div>
        </div>
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-ring"></div>
        </div>
      </div>
      <h2>WEAPONS</h2>
      <div className="gear-slots-grid">
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-mainhand"></div>
        </div>
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-offhand"></div>
        </div>
        <div className="gear-slots-col">
          <div className="gear-slots-row-1 gear-slot-empty"></div>
        </div>
      </div>
    </div>
  );
}

export default Equipment;
