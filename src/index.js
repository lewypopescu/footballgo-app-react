import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import { store } from "./store/store";

// const basename =
//   process.env.NODE_ENV === "production" ? "/footballgo-app-react" : "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter basename={"/footballgo-app-react"}>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
