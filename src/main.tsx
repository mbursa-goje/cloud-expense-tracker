import "antd/dist/reset.css";
import { ConfigProvider, App as AntdApp } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--primary)",
          colorPrimaryActive: "var(--hover)",
          colorPrimaryHover: "var(--hover)",
          colorText: "var(--secondary)",
          colorBgLayout: "var(--neutral)",
          colorLink: "var(--primary)",
          colorLinkHover: "var(--tertiary)",
          borderRadius: 6,
          controlOutline: "color-mix(in srgb, var(--primary) 20%, transparent)",
        },
      }}
    >
     <AntdApp>
       <App />
     </AntdApp>
    </ConfigProvider>
  </StrictMode>,
);
