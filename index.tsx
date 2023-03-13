import React from "react";
import { createRoot } from "react-dom/client";
import "core-js";
import SearchTrees from "./pages/SearchTrees";

const container = document.querySelector("#app") as HTMLElement;
const root = createRoot(container);

root.render(
  <>
    <SearchTrees />
  </>,
);
