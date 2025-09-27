import type { AppProps } from "next/app";
import "../mocks"; // enable axios-mock-adapter
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
