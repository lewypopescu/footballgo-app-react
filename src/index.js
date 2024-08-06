import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/my-pitch-app-react">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
