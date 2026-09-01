import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

export const CreateContentElement = (
  uiContainer: HTMLElement,
  shadowContainer: HTMLElement,
  callback: (
    root: ReactDOM.Root,
    app: HTMLElement
  ) => React.ReactNode
): ReactDOM.Root => {
  const app = document.createElement("div");

  uiContainer.append(app);

  Object.assign(app.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",

    zIndex: "2147483647",

    visibility: "visible",
    pointerEvents: "auto",
  });

  const root = ReactDOM.createRoot(app);

  root.render(
    <React.StrictMode>
      <Toaster />
      {callback(root, app)}
    </React.StrictMode>
  );

  return root;
};