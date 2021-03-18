import React from "react";
//css
import "./Main.css";

const Main = () => {
  return (
    <main>
      <div className='ride-selector-container'>
        <div className='ride-selector'>
          <div className='selector-image-container'>
            <img src='../../../src/images/Frame.png' alt='' />
          </div>
        </div>
        <div className='ride-selector'></div>
        <div className='ride-selector'></div>
        <div className='ride-selector'></div>
        <img src='../../images/Frame.png' alt='' />
      </div>
    </main>
  );
};

export default Main;
