import ContactUs from "./pages/ContactUs";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchList from "./pages/SeacrhList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Hotels from "./pages/category/Hotels";
import Property from "./pages/category/Property";
import InteriorPage from "./pages/category/InteriorPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/property" element={<Property />} />
          <Route path="/interior" element={<InteriorPage />} />
          <Route path="/hotel" element={<Hotels />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
