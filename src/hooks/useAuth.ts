// type AuthState = {
//   isUserLoading: boolean;
//   user?: Partial<USER_TYPE>;
//   setUser: (user: Partial<USER_TYPE>) => Promise<void>;
//   logout: () => void;
//   getUser: () => void;
// };
// const useAuth: any = create<AuthState>((set) => ({
//   isUserLoading: true,
//   user: {},
//   setUser: async (user: Partial<USER_TYPE>) => {
//     set({ user: { ...user } });
//   },
// logout() {
//   set({ user: undefined });
//   typeof window !== "undefined" && removeFromLocalStorage("ACCESS_TOKEN");
// },
//   getUser: async () => {
//     const accessToken = getFromLocalStorage("ACCESS_TOKEN");

//     if (!accessToken) {
//       set({ user: {}, isUserLoading: false });
//       return;
//     }
//     try {
//       const res = await fetch(`${BASE_URL}auth/self`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (res?.status === 401) {
//         window?.localStorage?.removeItem("ACCESS_TOKEN");
//         set({ user: {}, isUserLoading: false });
//       }

//       if (res?.status === 200) {
//         const data = await res.json();
//         const userData = data?.success?.data;
//         set({ user: { ...userData }, isUserLoading: false });
//       }
//     } catch (error) {
//       set({ user: {} });
//     }
//   },
// }));

// export default useAuth;

import USER_TYPE from "types";
import {
  getFromLocalStorage,
  getFromSessionStorage,
  put,
  removeFromLocalStorage,
  removeSessionStorage,
} from "utils";
import { BASE_URL } from "utils/MuiTblOptions";
import { create } from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: Partial<USER_TYPE>;
  setUser: (user: Partial<USER_TYPE>) => Promise<void>;
  logOut: (params?: string) => Promise<void>;
  getUser: (user?: string) => Promise<void>;
};
const useAuth: any = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<USER_TYPE>) => {
    set({ user: { ...user } });
  },
  // userLogOut: async () => {
  //   await put({
  //     path: `/auth/logout`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   set({ user: {} });
  //   removeFromLocalStorage("ACCESS_TOKEN");
  //   window.location.replace("/");
  // },
  logOut: async (urlPath: any) => {
    await put({
      path: `${BASE_URL}auth/logout`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    set({ user: {} });
    removeSessionStorage("token");
    removeSessionStorage("bg-color");
    window.location.replace(urlPath || "login");
  },
  getUser: async (token?: string) => {
    const accessToken = getFromSessionStorage("ACCESS_TOKEN");
    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // const data = await res.json();

      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }

      // if (res?.status === 200) {
      const data = await res.json();
      set({ user: { ...data?.success?.data }, isUserLoading: false });
      // }
    } catch (error) {
      set({ user: {} });
    }
  },
}));

export default useAuth;
