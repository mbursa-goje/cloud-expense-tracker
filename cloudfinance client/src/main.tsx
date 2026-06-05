import "antd/dist/reset.css";
import { ConfigProvider, App as AntdApp } from "antd";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ScreenProvider } from "./context/ScreenSize.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
            controlOutline: "var(--primary)",
            // colorBgContainer: "#f0fdf4"
          },
        }}
      >
        <AntdApp>
          <ScreenProvider>
            <App />
          </ScreenProvider>
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
