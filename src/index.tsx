import ReactDOM from "react-dom/client";
import "./i18n";
import { App } from "./App";

import "styles/index.scss";
import "styles/loader.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
