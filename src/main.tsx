import "modern-normalize";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ModalFormPage from "./ModalFormPage";
import { OverlayProvider } from "overlay-kit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OverlayProvider>
      <ModalFormPage />
    </OverlayProvider>
  </StrictMode>
);
