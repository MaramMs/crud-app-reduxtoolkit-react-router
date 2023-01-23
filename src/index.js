import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Provider} from 'react-redux';
import store from '../src/store/store'
import "./index.css";

import AddPost from "./routes/AddPost";
import Details from "./routes/Details";
import EditPost from "./routes/EditPost";
import Index from "./routes/Index";
import PageNotFound from "./routes/PageNotFound";
import RootLayout from "./routes/RootLayout";

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
        element: <AddPost />,
      },
      {
        path: "post/:id/edit",
        element: <EditPost />,
      },
      {
        path: "post/:id/details",
        element: <Details />,
        loader: ({ params: { id } }) => {
          if (isNaN(id)) {
            throw new Response("Bad Request", {
              statusText: "please insert id post",
              status: 400,
            });
          }
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider  store={store}>
    <RouterProvider router={routes} />

    </Provider>
  </React.StrictMode>
);
