// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// function mountWidget(containerId = "my-widget-container") {
//   const container = document.getElementById(containerId);
//   // if (!container) {
//     console.error(
//       `[ReactWidget] Container with ID "${containerId}" not found.`
//     );
//     return;
//   }

//   const root = ReactDOM.createRoot(container);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

// import React from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Find all widget divs
const widgetDivs = document.querySelectorAll(".widget-portfolio");

// Inject our React App into each class
const root = ReactDOM.createRoot(widgetDivs);
root.render(
  <React.StrictMode>
    <App symbol={root.dataset.symbol} />
  </React.StrictMode>,
  root
);
