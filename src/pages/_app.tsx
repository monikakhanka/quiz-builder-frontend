import type { AppProps } from "next/app";

import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import AppLayout from "@/components/layouts/AppLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <AppLayout>
        {" "}
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </AppLayout>
    </>
  );
}
