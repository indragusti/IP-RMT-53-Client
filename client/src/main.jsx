import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { store } from "./store";
// import { Provider } from "react-redux";

// ReactDOM.render(
//   //  add React Redux Provider to react app
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
