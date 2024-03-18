import Layout from "../layout/layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../reduxStore/store";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo, useEffect, useState } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("../components/loader"), { ssr: false });

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);
  const [isLoading, setIsLoading] = useState(false);

  const AppLoadingOverlay = () => {
    if (isLoading) {
      return (
        <div className="bg-gray-800 bg-opacity-30 top-0 bottom-0 fixed w-screen z-30 min-h-screen">
          <div className="text-center min-h-screen min-w-screen-xl flex justify-center items-center">
            <Loader />
          </div>
        </div>
      );
    }
    return null;
  };

  const AppComponent = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  const MemoizedAppComponent = memo(AppComponent);

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setIsLoading(true);
    };

    const handleRouteChangeComplete = (url) => {
      setIsLoading(false);
    };

    const handleRouteChangeError = (url) => {
      setIsLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <SessionProvider session={pageProps?.session}>
        <Provider store={store}>
          <MemoizedAppComponent {...pageProps} />
          <AppLoadingOverlay />
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
