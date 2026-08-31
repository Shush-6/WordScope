import "../popup/style.css";
import React from "react";
import { CreateContentElement } from "./common";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createUi(ctx);

    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "post" || message.action === "comment") {
        try {
          ui.mount();
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

    onMount: (uiContainer) =>
      CreateContentElement(uiContainer, uiContainer, (root) => (
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
      )),

    onRemove: (root) => root?.unmount(),
  });
};