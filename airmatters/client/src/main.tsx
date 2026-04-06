import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Suppress THREE.Clock deprecation warning from newer Three.js versions (0.183+)
// until dependencies (R3F, three-globe) are updated.
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args[0] && 
    typeof args[0] === 'string' && 
    (args[0].includes('THREE.Clock: This module has been deprecated') || 
     args[0].includes('THREE.THREE.Clock: This module has been deprecated'))
  ) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")!).render(<App />);
