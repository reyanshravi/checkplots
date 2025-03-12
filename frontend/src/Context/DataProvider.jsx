import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context with default value as an empty object
const DataContext = createContext({
  interiorData: null,
  propertyData: null,
  // hotelData: null,
  loading: true,
  error: null,
});

// Context provider component
export default function DataProvider({ children }) {
  const [interiorData, setInteriorData] = useState(null);
  const [propertyData, setPropertyData] = useState(null);
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from multiple APIs in parallel
    const fetchData = async () => {
      setLoading(true); // Ensure loading starts as true

      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get("http://localhost:7002/api/vendor/interiors"),
          axios.get("http://localhost:7002/api/vendor/properties"),
          axios.get("http://localhost:7002/api/vendor/hotels"),
        ]);

        // Handle successful API responses
        setInteriorData(response1.data); // Save data for interiors
        setPropertyData(response2.data); // Save data for properties
        setHotelData(response3.data); // Save data for hotels

        // Set loading to false after data is fetched
        setLoading(false);
      } catch (err) {
        // Handle errors from API calls
        setError("Failed to load data from one or more APIs");
        setLoading(false); // Ensure loading is set to false even on error
        console.log("Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ interiorData, propertyData, hotelData, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Export the context for use in other components
export { DataContext };
