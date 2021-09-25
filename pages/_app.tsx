import type { AppProps } from "next/app";
import "styles/tailwind.css";
import "styles/ia-light.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default App;
