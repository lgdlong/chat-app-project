import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
