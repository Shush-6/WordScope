import "../popup/style.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import { CreateContentElement } from "./common";
import PostModal from "./post";
import CommentModal from "./comment";

import type { ContentScriptContext } from "#imports";
import { extractRedditPostsFromDOM } from "./scripts/scrap";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    chrome.runtime.onMessage.addListener(async (message) => {
      if (
        message.action === "post" ||
        message.action === "comment"
      ) {
        try {
          const ui = await createUi(ctx, message.action);
          ui.mount();
        } catch (err) {
          console.error(
            "[WordScope] Failed to mount UI:",
            err
          );
        }
      }
    });
  },
});

const createUi = (
  ctx: ContentScriptContext,
  type: "post" | "comment"
) => {
  return createShadowRootUi(ctx, {
    name: "post-element",
    position: "inline",

    onMount: (
      uiContainer,
      shadow,
      shadowContainer
    ) => {
      return CreateContentElement(
        uiContainer,
        shadowContainer,
        (root, app) => {
          const onRemove = () => {
            root.unmount();
            app.remove();
          };

          const posts = extractRedditPostsFromDOM();

          switch (type) {
            case "post":
              return (
                <PostModal
                  posts={posts}
                  onRemove={onRemove}
                />
              );

            case "comment":
              return (
                <CommentModal
                  comments={[]}
                  posts={[]}
                  onRemove={onRemove}
                />
              );

            default:
              return null;
          }
        }
      );
    },

    onRemove: (root) => {
      root?.unmount();
    },
  });
};