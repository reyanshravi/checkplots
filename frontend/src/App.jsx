import ContactUs from "./pages/ContactUs";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchList from "./pages/SeacrhList";
import AboutUs from "./pages/AboutUs";
import Hotels from "./pages/category/Hotels";
import Property from "./pages/category/Property";
import InteriorPage from "./pages/category/InteriorPage";
import UserSignin from "./Authentication/User/UserSignIn";
import VendorSignup from "./Authentication/Vendor/VendorSignup";
import UserSignup from "./Authentication/User/UserSignup";
import VendorSignin from "./Authentication/Vendor/VendorSignIn";
import ProductPage from "./pages/ProductPage";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ExploreSection from "./components/ExploreSection";
import TestGrid from "./components/TestGrid";
import PropertyPost from "./components/PropertyPost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // Main Layout (with Navbar and Footer)
  const MainLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );

  // No Layout (no Navbar or Footer)
  const NoLayout = ({ children }) => <>{children}</>;
  return (
    <Router>
      <Routes>
        {/* Routes with Main Layout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/Contact"
          element={
            <MainLayout>
              <ContactUs />
            </MainLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchList />
            </MainLayout>
          }
        />
        <Route
          path="/property"
          element={
            <MainLayout>
              <Property />
            </MainLayout>
          }
        />
        <Route
          path="/interior"
          element={
            <MainLayout>
              <InteriorPage />
            </MainLayout>
          }
        />
        <Route
          path="/hotel"
          element={
            <MainLayout>
              <Hotels />
            </MainLayout>
          }
        />
        
        <Route
          path="/user/signup"
          element={
            <NoLayout>
              <UserSignup />
            </NoLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <MainLayout>
              <ExploreSection />
            </MainLayout>
          }
        />
        <Route
          path="/testgrid"
          element={
            <NoLayout>
              <TestGrid />
            </NoLayout>
          }
        />
        <Route
          path="/property/post"
          element={
            <MainLayout>
              <PropertyPost />
            </MainLayout>
          }
        />

        {/* Routes without Layout (no Navbar or Footer) */}
        <Route
          path="/user/dashboard"
          element={
            <NoLayout>
              <UserDashboard />
            </NoLayout>
          }
        />
        <Route
          path="/user/signin"
          element={
            <NoLayout>
              <UserSignin />
            </NoLayout>
          }
        />
        <Route
          path="/vendor/signin"
          element={
            <NoLayout>
              <VendorSignin />
            </NoLayout>
          }
        />
        <Route
          path="/vendor/signup"
          element={
            <NoLayout>
              <VendorSignup />
            </NoLayout>
          }
        />
        <Route
          path="/vendor/dashboard"
          element={
            <NoLayout>
              <VendorDashboard />
            </NoLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
