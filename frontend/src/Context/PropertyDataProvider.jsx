// PropertyDataContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context with default value as an empty object
const PropertyDataContext = createContext({
  data: null,
  loading: true,
  error: null,
});

// Context provider component
export default function PropertyDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7002/api/vendor/properties");
        setData(res.data.properties); 
        console.log(res.data.properties);
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PropertyDataContext.Provider value={{ data, loading, error }}>
      {children}
    </PropertyDataContext.Provider>
  );
}

// Export the context for use in other components
export { PropertyDataContext };
