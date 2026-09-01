import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

export const CreateContentElement = (
  uiContainer: HTMLElement,
  callback: (
    root: ReactDOM.Root,
    app: HTMLElement
  ) => React.ReactNode
): ReactDOM.Root => {
  const app = document.createElement("div");

  Object.assign(app.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    zIndex: "2147483647",
  });

  uiContainer.appendChild(app);

  const root = ReactDOM.createRoot(app);

  root.render(
    <React.StrictMode>
      <Toaster />
      {callback(root, app)}
    </React.StrictMode>
  );

  return root;
};