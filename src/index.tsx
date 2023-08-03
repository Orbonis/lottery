import React from "react";
import { createRoot } from "react-dom/client";

import "src/style.scss";

import { Application } from "./application";

const element = document.createElement("div");
element.id = "app";
document.body.appendChild(element);

createRoot(element).render(<Application />);