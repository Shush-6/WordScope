import "../popup/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { CreateContentElement } from "./common";
import Header from "./common/header";
import PostModal from "./post";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    

    chrome.runtime.onMessage.addListener(async(message) => {
      if (message.action === "post" || message.action === "comment") {
        try {
          const ui = await createUi(ctx,message.text);
          ui.mount();
        } catch (err) {
          console.error("[WordScope] Failed to mount UI:", err);
        }
      }
    });
  },
});

const createUi = (ctx: any,message: string) => {
  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "inline",

    onMount: (uiContainer,shadow,shadowContainer) =>{
      return CreateContentElement(uiContainer, shadowContainer, (root,app) => {
        const onRemove = () => {
          root?.unmount();
          app.remove();
        }
        return <PostModal posts={[]} onRemove={onRemove} />
  }) as ReactDOM.Root;
  },
    onRemove: (root) => root?.unmount(),
  });
};