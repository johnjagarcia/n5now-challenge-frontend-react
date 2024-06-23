import React from "react";
import { Provider } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { store } from "../store";
import "../styles/main.scss";

export default function Root() {
  return (
    <Provider store={store}>
      <div>
        {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
        <nav>
          <ul>
            <li>
              <Link to="/">Tienda</Link>
            </li>
            <li>
              <Link to="/product">Alta de productos</Link>
            </li>
          </ul>
        </nav>

        <hr />

        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </div>
    </Provider>
  );
}
