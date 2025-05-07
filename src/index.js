// index.js
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { ConfigProvider, App as AntdApp, theme } from "antd";
import { Provider, useSelector } from "react-redux";
import store from "./Store/index";
import "antd/dist/reset.css";

// ✅ This component will be inside <Provider>
const ThemedApp = () => {
  const mode = useSelector((state) => state.theme?.mode || "light");

  return (
    <ConfigProvider
      theme={{
        algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp /> {/* ✅ useSelector now works */}
    </Provider>
  </React.StrictMode>
);
