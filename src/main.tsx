import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter, Routes, Route } from "react-router";
import Setup from "@/pages/auth/setup";
import Login from "@/pages/auth/login";
import AuthGuard from "@/components/AuthGuard";

import AppLayout from "@/components/layout/AppLayout";
import POSPage from "@/pages/pos";
import ItemsPage from "@/pages/inventory/items/index";
import CreateItemPage from "@/pages/inventory/items/create";
import CategoriesPage from "@/pages/inventory/categories";
import DiscountsPage from "@/pages/inventory/discounts";
import PaymentMethodsPage from "@/pages/inventory/payment-methods";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<App />} />
            <Route path="/pos" element={<POSPage />} />
            <Route path="/inventory/items" element={<ItemsPage />} />
            <Route path="/inventory/items/create" element={<CreateItemPage />} />
            <Route path="/inventory/categories" element={<CategoriesPage />} />
            <Route path="/inventory/discounts" element={<DiscountsPage />} />
            <Route path="/inventory/payment-methods" element={<PaymentMethodsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
