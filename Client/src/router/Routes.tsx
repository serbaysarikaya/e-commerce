import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import AboutPage from "../features/AboutPage";
import ContactPage from "../features/ContactPage";
import HomePage from "../features/HomePage";
import CatalogPage from "../features/catalog/CatalogPage";
import ProductDetail from "../features/catalog/ProductDetail";
import ErrorPage from "../features/ErrorPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../features/cart/ShoppingCartPage";
import LoginPage from "../features/account/LoginPage";
import RegisterPage from "../features/account/RegisterPage";
import CheckOutPage from "../features/checkout/CheckOutPage";
import AuthGuard from "./AuthGuard";
import OrderList from "../features/orders/OrderList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckOutPage /> },
          { path: "orders", element: <OrderList /> }

        ],
      },
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "cart", element: <ShoppingCartPage /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      { path: "error", element: <ErrorPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
]);
