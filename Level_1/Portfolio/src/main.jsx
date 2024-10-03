import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/outfit";
import "@fontsource/roboto";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/Spinner.jsx";

// Lazy load your App component
const App = lazy(() => import("./App.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <App />
      <Toaster />
    </Suspense>
  </BrowserRouter>
);
