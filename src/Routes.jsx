import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/home";
import Products from "./screens/products";
import Layout from './components/layouts/layouts.js';
import AuthGuard from './guards/authGuard';
import HeaderContextProvider from "./context/header-context";

const Router = () => {
  return (
    <BrowserRouter>
    <HeaderContextProvider>
      <Layout>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<AuthGuard><Products /></AuthGuard>} />
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
        </Routes>
        </Layout>
    </HeaderContextProvider>
    </BrowserRouter>
  );
};

export default Router;