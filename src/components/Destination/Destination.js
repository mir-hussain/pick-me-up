import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
//css
import "./Destination.css";

const Destination = () => {
  return (
    <section id='destination'>
      <div className='destination-search-area'>
        <form className='location-form'>
          <div className='input-field'>
            <label htmlFor='from'>Pick From</label>
            <input type='text' id='from' name='from' />
          </div>
          <div className='input-field'>
            <label htmlFor='to'>Pick To</label>
            <input type='text' id='to' name='to' />
          </div>
          <button className='search-btn'>Search</button>
        </form>
      </div>
      <div className='map-container'></div>
    </section>
  );
};

export default Destination;
