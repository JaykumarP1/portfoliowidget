// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client"; // 👈 use client API for React 18+
import App from "./App";
import "./index.css";

// Define a mount function
export function mountWidget(containerId = "my-widget-container") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(
      `[ReactWidget] Container with ID "${containerId}" not found.`
    );
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
