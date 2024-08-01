import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </Router>
  </React.StrictMode>
);
