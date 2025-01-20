import { useState } from "react";
import "./App.css";
import Hotels from "./pages.jsx/Hotels";
import HotelCard from "./components/HotelCard";
import Footer from "./pages.jsx/footer";
import NewsLetter from "./components/NewsLetter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hotels />
      {/* <NewsLetter /> */}
      <Footer />
    </>
  );
}

export default App;
