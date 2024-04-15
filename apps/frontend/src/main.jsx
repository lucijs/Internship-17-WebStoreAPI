import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthorizationBearerProvider from "./providers/AuthorizationBearerProvider.jsx";

const secretKey = import.meta.env.VITE_SECRET_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.StrictMode>
        <AuthorizationBearerProvider secretKey={secretKey}>
          <App />
        </AuthorizationBearerProvider>
      </React.StrictMode>
    </BrowserRouter>
  </React.StrictMode>
);
