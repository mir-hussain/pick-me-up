import React, { useEffect, useState } from "react";
//css
import "./SearchResult.css";
//data `
import bikeData from "../../fakeData/Bike";
import carData from "../../fakeData/Car";
import busData from "../../fakeData/Bus";
import trainData from "../../fakeData/Train";

const SearchResults = (props) => {
  const { method } = props;

  let data;

  if (method === "bike") {
    data = bikeData;
  } else if (method === "car") {
    data = carData;
  } else if (method === "bus") {
    data = busData;
  } else if (method === "train") {
    data = trainData;
  }

  const [transportation, setTransportation] = useState([]);
  useEffect(() => {
    setTransportation(data);
  }, [data]);

  console.log(transportation);

  return (
    <div className='search-result-container'>
      {transportation.map((tp) => (
        <div>
          <h1>{tp.vehicleName}</h1>
          <p> {tp.seat} </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
