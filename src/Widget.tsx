import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Inyectar estilos CSS directamente en el documento
function injectStyles() {
  const styleId = "ia-chat-widget-styles";
  if (document.getElementById(styleId)) return;

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    .ia-chat-widget * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
    }
    
    .ia-chat-widget-button {
      position: fixed !important;
      border-radius: 50% !important;
      width: 60px !important;
      height: 60px !important;
      border: none !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      z-index: 2147483647 !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 24px !important;
    }
    
    .ia-chat-widget-button:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 6px 16px rgba(0,0,0,0.2) !important;
    }
    
    .ia-chat-widget-window {
      position: fixed !important;
      width: 380px !important;
      height: 500px !important;
      background: white !important;
      border-radius: 16px !important;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 2147483647 !important;
      border: 1px solid rgba(0,0,0,0.1) !important;
      pointer-events: auto !important;
    }
    
    @media (max-width: 480px) {
      .ia-chat-widget-window {
        width: calc(100vw - 40px) !important;
        height: calc(100vh - 120px) !important;
        right: 20px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

interface WidgetConfig {
  company?: string;
  color?: string;
  apiUrl?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  theme?: "light" | "dark";
}

function initWidget(config: WidgetConfig = {}) {
  const containerId = "ia-chat-widget-container";

  if (document.getElementById(containerId)) {
    console.warn("IA Chat Widget ya está inicializado");
    return;
  }

  injectStyles();

  const container = document.createElement("div");
  container.id = containerId;
  container.className = "ia-chat-widget";
  document.body.appendChild(container);

  const script = document.currentScript as HTMLScriptElement | null;
  const finalConfig = {
    company: config.company || script?.dataset.company || "Tu Empresa",
    color: config.color || script?.dataset.color || "#0078ff",
    apiUrl: config.apiUrl || script?.dataset.apiUrl || undefined,
    position:
      config.position ||
      (script?.dataset.position as WidgetConfig["position"]) ||
      "bottom-right",
    theme:
      config.theme ||
      (script?.dataset.theme as WidgetConfig["theme"]) ||
      "light",
  };

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App {...finalConfig} />
    </React.StrictMode>
  );
}

declare global {
  interface Window {
    IAChatWidget: {
      init: (config?: WidgetConfig) => void;
      destroy: () => void;
    };
  }
}

window.IAChatWidget = {
  init: initWidget,
  destroy: () => {
    const container = document.getElementById("ia-chat-widget-container");
    const styles = document.getElementById("ia-chat-widget-styles");
    if (container) container.remove();
    if (styles) styles.remove();
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initWidget());
} else {
  initWidget();
}
