import React, { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataProvider";

export default function ExampleComponent() {
  const { interiorData, propertyData, hotelData, loading, error } =
    useContext(DataContext);

  useEffect(() => {
    // You can log the data when the component mounts or changes
    console.log("Loading State:", loading);
    console.log("Loading State:", propertyData);
    console.log("Loading State:", interiorData);
  }, [propertyData, interiorData, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data Loaded:</h1>
      <pre>{JSON.stringify(propertyData.properties[1], null, 2)}</pre>
      <pre>{JSON.stringify(interiorData.interiors, null, 2)}</pre>
      <pre>{JSON.stringify(hotelData, null, 2)}</pre>
    </div>
  );
}
