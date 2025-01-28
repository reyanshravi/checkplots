import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import AdminLogin from "./pages/AdminLogin";
import CreateProperty from "./pages/CreateProperty";
import CreateHotel from "./pages/CreateHotel";
import Hotels from "./pages/Hotels";
import Interior from "./pages/Interior";
import CreateInterior from "./pages/CreateInterior";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      </Router>

      <Router>
        <div className="flex ">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/interior" element={<Interior />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="properties/CreateProperty"
                element={<CreateProperty />}
              />
              <Route path="hotels/CreateHotel" element={<CreateHotel />} />
              <Route
                path="interior/CreateInterior"
                element={<CreateInterior />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
