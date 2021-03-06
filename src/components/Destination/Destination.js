import React, { useState } from "react";
import { useParams } from "react-router";
import SearchResults from "../SearchResults/SearchResults";

//css
import "./Destination.css";

//map
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Destination = () => {
  const { method } = useParams();
  const [destination, setDestination] = useState({});
  const [searchResult, setSearchResult] = useState({
    showResult: false,
  });

  const mapApiToken = "pk.eyJ1IjoibWlyNjk5NiIsImEiOiJja21oeDJxeXcwYnBpMm9zMXpjczYxZGFuIn0.J-trINrat8oALtmJ_uswaA";

  // for map
  const [viewport, setViewport] = React.useState({
    longitude: 90.399452,
    latitude: 23.777176,
    zoom: 12,
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
          <form className='location-form' onSubmit={handleSearch}>
            <div className='input-field'>
              <label htmlFor='from'>Pick From</label>
              <input onBlur={handleBlur} type='text' id='from' name='from' required />
            </div>
            <div className='input-field'>
              <label htmlFor='to'>Pick To</label>
              <input onBlur={handleBlur} type='text' id='to' name='to' required />
            </div>
            <div className='input-field'>
              <label htmlFor='date'>Date</label>
              <input onBlur={handleBlur} type='date' id='date' name='date' required />
            </div>
            <input type='submit' value='Search' className='search-btn' />
          </form>
        )}
        {searchResult.showResult && <SearchResults destination={destination} method={method} />}
      </div>
      <div className='map-container'>
        <div id='map'>
          <ReactMapGL mapboxApiAccessToken={mapApiToken} {...viewport} width='100%' height='100%' onViewportChange={(viewport) => setViewport(viewport)} />
        </div>
      </div>
    </section>
  );
};

export default Destination;
