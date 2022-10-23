import Navbar from "../components/Navbar";
import { AuthContextProvider } from "../context/AuthContext";
import { GeneralContextProvider } from "../context/GeneralContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <GeneralContextProvider>
          <Component {...pageProps} />
        </GeneralContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
