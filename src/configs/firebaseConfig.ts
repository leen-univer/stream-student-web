import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEb8a3iMPXkZ9daG8NAzGlaxiJmiUTNxE",
  authDomain: "trualty-ventures.firebaseapp.com",
  databaseURL: "https://trualty-ventures-default-rtdb.firebaseio.com",
  projectId: "trualty-ventures",
  storageBucket: "trualty-ventures.appspot.com",
  messagingSenderId: "486031408886",
  appId: "1:486031408886:web:1ed5fb5a3749cfbdcff6d7",
  measurementId: "G-8624TMCKPD",
};
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const messaging: any = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    console.log("Firebase not supported this browser");
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
})();
