import { Socket, io } from "socket.io-client";
import { useAuth, useIsMounted } from "hooks";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContextType, LanguageType } from "types";

const AppContext = createContext<AppContextType>({ selectedLanguage: "en" });

const SOCKET_BASEURL = "wss://stream-student.univertours.com";

const AppContextProvider = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const isMounted = useIsMounted();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>("en");
  const { user } = useAuth();

  const socketRef = useRef<Socket<any, any>>();

  const changeLanguage = useCallback((lang: LanguageType) => {
    isMounted.current && setSelectedLanguage(lang);
    localStorage.setItem("currentLanguage", lang);
  }, []);

  useEffect(() => {
    (() => {
      if (!isMounted) return;

      const token = localStorage.getItem("ACCESS_TOKEN");

      socketRef.current = io(`${SOCKET_BASEURL}`, {
        auth: {
          token: token,
        },
      });

      socketRef.current.onAny((event, data) => {
        console.log(
          "=========================================================================================================================================================================================",
          event,
          data
        );
      });

      // console.log({ socketRef });
    })();
  }, [user?._id, isMounted]);

  useEffect(() => {
    const langData: string | null = localStorage.getItem("currentLanguage");

    if (langData) setSelectedLanguage(langData as LanguageType);
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedLanguage,
        changeLanguage,
        socketRef: socketRef.current,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext<AppContextType>(AppContext);

export default AppContextProvider;
