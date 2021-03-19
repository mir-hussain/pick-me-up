import React from "react";
import { Link } from "react-router-dom";
//css
import "./Main.css";

const Main = () => {
  return (
    <main>
      <div className='ride-selector-container'>
        <Link to='/destination/bike'>
          <div className='ride-selector'>
            <div className='selector-image-container'></div>
            <h2>Bike</h2>
          </div>
        </Link>
        <Link to='/destination/car'>
          <div className='ride-selector'>
            <div className='selector-image-container'></div>
            <h2>Car</h2>
          </div>
        </Link>
        <Link to='/destination/bus'>
          <div className='ride-selector'>
            <div className='selector-image-container'></div>
            <h2>Bus</h2>
          </div>
        </Link>
        <Link to='/destination/train'>
          <div className='ride-selector'>
            <div className='selector-image-container'></div>
            <h2>Train</h2>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Main;
