import React from "react";
import { Link } from "react-router-dom";
//css
import "./Main.css";

const Main = () => {
  return (
    <main>
      <div className='ride-selector-container'>
        <Link className='selector' to='/destination/bike'>
          <div className='ride-selector'>
            <div className='selector-image-container'>
              <img src={"https://live.staticflickr.com/65535/51052653342_bd74dd4001_m.jpg"} alt='' />
            </div>
            <h2 className='selector-title'>Bike</h2>
          </div>
        </Link>
        <Link className='selector' to='/destination/car'>
          <div className='ride-selector'>
            <div className='selector-image-container'>
              <img src={"https://live.staticflickr.com/65535/51051840148_a5550dd1c9_m.jpg"} alt='' />
            </div>
            <h2 className='selector-title'>Car</h2>
          </div>
        </Link>
        <Link className='selector' to='/destination/bus'>
          <div className='ride-selector'>
            <div className='selector-image-container'>
              <img src={"https://live.staticflickr.com/65535/51051840218_3ff1918efb_m.jpg"} alt='' />
            </div>
            <h2 className='selector-title'>Bus</h2>
          </div>
        </Link>
        <Link className='selector' to='/destination/train'>
          <div className='ride-selector'>
            <div className='selector-image-container'>
              <img src={"https://live.staticflickr.com/65535/51052569166_d91267cc90_m.jpg"} alt='' />
            </div>
            <h2 className='selector-title'>Train</h2>
          </div>
        </Link>
      </div>
      <img src='../../images/bike.jpg' alt='' />
    </main>
  );
};

export default Main;
