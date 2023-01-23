import "bootstrap/dist/css/bootstrap.min.css";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store/store";
import "./index.css";
import Index from "./routes/Index";
import PageNotFound from "./routes/PageNotFound";
import RootLayout from "./routes/RootLayout";

const AddPost = lazy(() => import("./routes/AddPost"));
const EditPost = lazy(() => import("./routes/EditPost"));
const Details = lazy(() => import("./routes/Details"));

const loaderHandler = ({ params: { id } }) => {
  if (isNaN(id)) {
    throw new Response("Bad Request", {
      statusText: "please insert id post",
      status: 400,
    });
  }
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "post/add",
        element: (
          <Suspense fallback="please wait">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback="please wait">
            {" "}
            <EditPost />
          </Suspense>
        ),
        loader: loaderHandler,
      },
      {
        path: "post/:id/details",
        element: (
          <Suspense fallback="please wait">
            {" "}
            <Details />{" "}
          </Suspense>
        ),
        loader: loaderHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
