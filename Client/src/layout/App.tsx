import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

import { CircularProgress, Container, CssBaseline } from "@mui/material";

import { useAppDispatch } from "../store/store";
import { getCart } from "../features/cart/cartSlice";
import Header from "./Header";
import { getUser } from "../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
