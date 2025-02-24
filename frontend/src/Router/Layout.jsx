// src/components/Layouts.jsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Main Layout (with Navbar and Footer)
export const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// No Layout (no Navbar or Footer)
export const NoLayout = ({ children }) => <>{children}</>;
