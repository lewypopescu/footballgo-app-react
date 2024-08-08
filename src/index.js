import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/my-pitch-app-react">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
