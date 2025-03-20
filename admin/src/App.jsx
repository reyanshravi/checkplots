import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Users from "./pages/Users";
import Vendors from "./pages/Vendors";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import CreateProperty from "./pages/CreateProperty";
import CreateHotel from "./pages/CreateHotel";
import Hotels from "./pages/Hotels";
import Interior from "./pages/Interior";
import CreateInterior from "./pages/CreateInterior";
import ForgotPassword from "./pages/ForgotPassword";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChnagePassword";
import ResetPassword from "./pages/ResetPassword";
import Package from "./pages/Package";
import Offers from "./pages/Offers";

// Check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// ProtectedRoute component to restrict access
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

// Layout wrapper for authenticated pages
const AppLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Properties />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotels"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Hotels />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interior"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Interior />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Users />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendors"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Vendors />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/package"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Package />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Offers />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/properties/CreateProperty"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreateProperty />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotels/CreateHotel"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreateHotel />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interior/CreateInterior"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreateInterior />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EditProfile />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ChangePassword />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
