import { RouterProvider } from "react-router-dom";

import { router } from "./routes/routes";
import { Provider } from "react-redux";
import { commonStore } from "components/common/common_state/common_store";

export const App = () => {
  return (
    <Provider store={commonStore}>
      <RouterProvider
        router={router}
        fallbackElement={<div className="loader"></div>}
      />
    </Provider>
  );
};
