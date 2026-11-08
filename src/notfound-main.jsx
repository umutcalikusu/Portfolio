import React from "react";
import { createRoot } from "react-dom/client";
import NotFound from "./NotFound.jsx";
import "./fonts.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotFound />
  </React.StrictMode>
);
