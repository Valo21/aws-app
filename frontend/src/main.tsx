import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import {router} from "./routes.tsx";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import {PrimeReactProvider} from "primereact/api";
import {DesignTheme} from "./design.theme.ts";
import {Provider} from "react-redux";
import {store} from "./store";


const root: HTMLElement | null = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <PrimeReactProvider value={{pt: DesignTheme}}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </PrimeReactProvider>
    </React.StrictMode>
  );
}
