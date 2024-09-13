import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
