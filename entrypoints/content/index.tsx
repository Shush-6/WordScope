import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    console.log("[WordScope] content script main() started");

    const ui = await createUi(ctx);

    chrome.runtime.onMessage.addListener((message) => {
      console.log("[WordScope] message received in content script:", message);

      if (message.action === "post" || message.action === "comment") {
        try {
          ui.mount();
          console.log("[WordScope] UI mounted after message:", message.action);
        } catch (err) {
          console.error("[WordScope] Failed to mount UI:", err);
        }
      }
    });
  },
});

const createUi = (ctx: any) => {
  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "overlay",
    anchor: "body",
    append: "last",

    onMount: (uiContainer) => {
      console.log("[WordScope] onMount fired, container:", uiContainer);

      const app = document.createElement("div");
      app.id = "app-root";

      Object.assign(app.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        zIndex: "2147483647",
        backgroundColor: "rgba(227, 27, 27, 0.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

      uiContainer.append(app);
      console.log("[WordScope] app div appended to shadow container");

      const root = ReactDOM.createRoot(app);
      root.render(
        <React.StrictMode>
          <div
            style={{
              padding: "24px 32px",
              backgroundColor: "#3ab13e",
              borderRadius: "12px",
              color: "#ffffff",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "24px" }}>Hello, World!</h1>
          </div>
        </React.StrictMode>
      );

      console.log("[WordScope] React render called");

      return root;
    },

    onRemove: (root) => {
      console.log("[WordScope] onRemove fired");
      root?.unmount();
    },
  });
};