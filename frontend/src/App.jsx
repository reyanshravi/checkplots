import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./pages/ContactUs";
import LandingPage from "./pages/LandingPage";
import SearchList from "./pages/SeacrhList";
import AboutUs from "./pages/AboutUs";
import UserSignin from "./Authentication/User/UserSignIn";
import VendorSignup from "./Authentication/Vendor/VendorSignup";
import UserSignup from "./Authentication/User/UserSignup";
import VendorSignin from "./Authentication/Vendor/VendorSignIn";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import UserDashboard from "./pages/user/UserDashboard";
import ExploreSection from "./components/ExploreSection";
import PropertyPost from "./components/PropertyPost";

// Product pages
import InteriorPage from "./pages/ProductPages/InteriorPage";
import HotelPage from "./pages/ProductPages/HotelPage";
import PropertyPage from "./pages/ProductPages/PropertyPage";

// Category pages
import HotelCategory from "./pages/category/HotelCategory";
import PropertyCategory from "./pages/category/PropertyCategory";
import InteriorCategory from "./pages/category/InteriorCategory";

import ProtectedRoute from "./Router/ProtectedRoute";
// Import Layouts
import { MainLayout, NoLayout } from "./Router/Layout";
import ForgotPassword from "./Authentication/Vendor/ForgotPassword";
import ResetPassword from "./Authentication/Vendor/RestPassword";
import ExampleComponent from "./Data/InteriorData";
import DataProvider from "./Context/DataProvider";

function App() {
  return (
    <DataProvider>
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

          {/* category routes */}
          <Route
            path="/category/property"
            element={
              <MainLayout>
                <PropertyCategory />
              </MainLayout>
            }
          />
          <Route
            path="/category/interior"
            element={
              <MainLayout>
                <InteriorCategory />
              </MainLayout>
            }
          />
          <Route
            path="/category/hotel"
            element={
              <MainLayout>
                <HotelCategory />
              </MainLayout>
            }
          />

          {/* auth routes */}
          <Route
            path="/user/signup"
            element={
              <NoLayout>
                <UserSignup />
              </NoLayout>
            }
          />

          {/* Product page */}
          <Route
            path="/Interior/page"
            element={
              <MainLayout>
                <InteriorPage />
              </MainLayout>
            }
          />
          <Route
            path="/hotel/page"
            element={
              <MainLayout>
                <HotelPage />
              </MainLayout>
            }
          />
          <Route
            path="/property/page"
            element={
              <MainLayout>
                <PropertyPage />
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
              <ProtectedRoute
                component={UserDashboard}
                role="user"
                redirectTo="/user/signin"
              />
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
            path="/vendor/forgotpassword"
            element={
              <NoLayout>
                <ForgotPassword />
              </NoLayout>
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute
                component={VendorDashboard}
                role="vendor"
                redirectTo="/vendor/signin"
              />
            }
          />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
