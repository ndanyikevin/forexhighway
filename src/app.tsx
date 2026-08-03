import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Navbar } from "./components/Nav";
import "./app.css";

import "@fontsource/inter"

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Navbar />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
