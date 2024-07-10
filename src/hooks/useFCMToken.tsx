import { getToken, onMessage } from "@firebase/messaging";
import { messaging, VAPID_KEY } from "configs";
import { useEffect } from "react";
import { put } from "utils";
import useMutation from "./useMutataion";

const useFCMToken = (uid: string | undefined) => {
  const { mutation } = useMutation();
  useEffect(() => {
    const isSupported = () =>
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    if (isSupported()) {
      Notification.requestPermission(async function (permission) {
        const messagingResolver = await messaging;
        // If the user accepts, let's create a notification
        // console.log(messagingResolver)
        if (permission === "granted") {
          if (uid) {
            // Get FCM Token
            await getToken(messagingResolver, {
              vapidKey: VAPID_KEY,
            })
              .then(async (fcmToken) => {
                if (fcmToken) {
                  // console.log(fcmToken);
                  try {
                    const resData = { web: fcmToken };
                    // console.log("first resData", resData);
                    const result = await mutation(`gen/updateUser/${uid}`, {
                      method: "PUT",
                      body: { fcmTokens: resData },
                    });
                    // console.log("FCM results", result);
                  } catch (err) {
                    console.log(err);
                  }
                } else {
                }
              })
              .catch(console.log);
          }
        } else if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          console.log("Permission not granted");
          Notification.requestPermission();
        }
      });
    }
  }, [uid]);
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );

export default useFCMToken;
