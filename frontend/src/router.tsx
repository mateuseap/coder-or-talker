import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/results", element: <Results /> },
  ],
  { basename: "/coder-or-talker/" }
);

export default router;
