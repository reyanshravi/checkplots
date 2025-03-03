import React, { useContext } from "react";
import { PropertyDataContext } from "../Context/PropertyDataProvider";

function PList() {
  const { data, loading, error } = useContext(PropertyDataContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((property) => (
          <div key={property.id}>
            <h2>{property.name}</h2>
            <p>{property.description}</p>
          </div>
        ))
      ) : (
        <p>No properties found</p>
      )}
    </div>
  );
}

export default PList;
