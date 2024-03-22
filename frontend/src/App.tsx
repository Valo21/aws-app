import {store} from "./store";
import { RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import {Provider} from "react-redux";
import * as React from "react";

function App(): React.ReactElement {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
