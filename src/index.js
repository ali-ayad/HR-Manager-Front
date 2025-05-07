import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { ConfigProvider, App as AntdApp, theme } from "antd"; // Import 'App' separately
import { Provider } from "react-redux";
import store from "./Store/index";
import "antd/dist/reset.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: "#1677ff",
          },
        }}
      >
        <AntdApp> {/* ⬅️ Wrap your App with AntdApp */}
          <App />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
