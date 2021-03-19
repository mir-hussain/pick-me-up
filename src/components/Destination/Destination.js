import React from "react";
import { useParams } from "react-router";

const Destination = () => {
  const { method } = useParams();
  console.log(method);
  return (
    <div>
      <h1>this is using {method}</h1>
    </div>
  );
};

export default Destination;
