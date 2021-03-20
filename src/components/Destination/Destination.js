import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchResults from "../SearchResults/SearchResults";
//css
import "./Destination.css";

const Destination = () => {
  const { method } = useParams();
  const [destination, setDestination] = useState({});
  const [searchResult, setSearchResult] = useState({
    showResult: false,
  });

  //to get data from user

  const handleBlur = (event) => {
    const currentDestination = { ...destination };
    currentDestination[event.target.name] = event.target.value;
    setDestination(currentDestination);
  };

  //to handle search

  const handleSearch = (event) => {
    const currentSearchResult = { ...searchResult };
    currentSearchResult.showResult = true;
    setSearchResult(currentSearchResult);
    event.preventDefault();
  };

  return (
    <section id='destination'>
      <div className='destination-search-area'>
        {!searchResult.showResult && (
          <form className='location-form'>
            <div className='input-field'>
              <label htmlFor='from'>Pick From</label>
              <input onBlur={handleBlur} type='text' id='from' name='from' />
            </div>
            <div className='input-field'>
              <label htmlFor='to'>Pick To</label>
              <input onBlur={handleBlur} type='text' id='to' name='to' />
            </div>
            <div className='input-field'>
              <label htmlFor='date'>Date</label>
              <input onBlur={handleBlur} type='date' id='date' name='date' />
            </div>
            <button onClick={handleSearch} className='search-btn'>
              Search
            </button>
          </form>
        )}
        {searchResult.showResult && <SearchResults method={method} destination={destination} />}
      </div>
      <div className='map-container'></div>
    </section>
  );
};

export default Destination;
