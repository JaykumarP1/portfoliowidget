// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function mountWidget(containerId = "my-widget-container") {
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

export default {
  mountWidget,
};
