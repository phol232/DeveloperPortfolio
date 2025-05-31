import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Custom CSS variables for our theme
const styles = document.createElement('style');
styles.innerHTML = `
:root {
  --background: 257 30% 9%;
  --foreground: 210 40% 98%;

  --card: 256 23% 15%;
  --card-foreground: 210 40% 98%;

  --popover: 256 23% 15%;
  --popover-foreground: 210 40% 98%;

  --primary: 259 94% 51%;
  --primary-foreground: 0 0% 100%;

  --secondary: 262 83% 58%;
  --secondary-foreground: 0 0% 100%;

  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;

  --accent: 259 30% 85%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 62% 30%;
  --destructive-foreground: 0 0% 100%;

  --border: 257 10% 20%;
  --input: 257 10% 20%;
  --ring: 257 30% 50%;

  --radius: 0.5rem;

  --sidebar-background: 256 23% 15%;
  --sidebar-foreground: 210 40% 98%;
  --sidebar-accent: 259 30% 85%;
  --sidebar-accent-foreground: 210 40% 98%;
  --sidebar-border: 257 10% 20%;
  --sidebar-primary: 259 94% 51%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-ring: 257 30% 50%;

  --chart-1: 259, 94%, 51%;
  --chart-2: 259, 50%, 70%;
  --chart-3: 262, 83%, 58%;
  --chart-4: 259, 30%, 85%;
  --chart-5: 257, 30%, 30%; 
}

body {
  font-family: 'Inter', sans-serif;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
`;
document.head.appendChild(styles);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);