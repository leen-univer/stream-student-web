import nProgress from "nprogress";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import { AppContextProvider } from "contexts";
import { useAuth } from "hooks";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getFromSessionStorage,
  removeSessionStorage,
  saveToSessionStorage,
} from "utils";
import { BASE_URL } from "utils/MuiTblOptions";
import { getAccessToken } from "hooks/useMutataion";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const { getUser, user } = useAuth();
  const { asPath } = useRouter();

  useEffect(() => {
    (async () => {
      const token = getAccessToken();
      const isExplicitLogout =
        getFromSessionStorage("explicitLogout") === "true";

      const handleBeforeUnload = async () => {
        if (isExplicitLogout) {
          await fetch(`${BASE_URL}/screenTime/update-timeOfOut/${user?._id}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          removeSessionStorage("ACCESS_TOKEN");
          saveToSessionStorage("explicitLogout", "true");
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    })();
  }, [user?._id]);

  useEffect(() => {
    (async () => {
      getUser();
    })();
  }, [getUser, asPath]);
  return (
    <AppContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
