import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/reset.css";
import "./css/style.css";
import "./css/animations.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { OrientationProvider } from "./components/providers/OrientationProvider";
import { SelectedChatProvider } from "./components/providers/SelectedChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Setting providers
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <OrientationProvider>
          <SelectedChatProvider>
            <App />
          </SelectedChatProvider>
        </OrientationProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
