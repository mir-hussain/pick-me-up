import React, { useEffect, useState } from "react";
//css
import "./SearchResult.css";
//data `
import bikeData from "../../fakeData/Bike";
import carData from "../../fakeData/Car";
import busData from "../../fakeData/Bus";
import trainData from "../../fakeData/Train";

const SearchResults = (props) => {
  const { method, destination } = props;
  const { from, to, date } = destination;

  let data = carData;

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
      <div className='destination-info'>
        <p>From: {from}</p>
        <p>To: {to}</p>
        <p>On: {date}</p>
      </div>
      {transportation.map((tp) => (
        <div className='vehicle-card'>
          <img src={tp.imageUrl} alt='' />
          <div>
            <p>Pick up: {tp.vehicleName}</p>
            <p>Available Seat: {tp.seat} </p>
            <p>Fare: {tp.fare}$</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
