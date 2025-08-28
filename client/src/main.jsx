import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<div>loading.....</div>} persistor={persistor}>
      <ToastContainer />
      <App />
    </PersistGate>
  </Provider>
);
