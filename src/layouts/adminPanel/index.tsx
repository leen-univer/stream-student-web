// import { useAppContext } from "contexts";
import Head from "next/head";
import Drawer from "./Drawer";
import AdminNavbar from "./AdminNavbar";
import { withProtectedRoute } from "hooks";
import { useAppContext } from "contexts";
import { useEffect } from "react";
import { LanguageType } from "types";
type Props = {
  title?: string;
  children: JSX.Element[] | JSX.Element;
  description?: string;
  ogImage?: string;
};
const AdminPanelLayout = ({
  title = "Welcome To Your Panel",
  children = <></>,
  description,
  ogImage,
}: Props) => {
  // const { selectedLanguage } = useAppContext();
  const { selectedLanguage, changeLanguage } = useAppContext();

  useEffect(() => {
    const langData: string | null = localStorage.getItem("currentLanguage");
    const lang = langData || "en";

    changeLanguage?.(lang as LanguageType);

    const changeEvent = () => {
      document.body.setAttribute(
        "dir",
        selectedLanguage === "en" ? "ltr" : "rtl"
      );
    };

    changeEvent();
  }, [selectedLanguage, changeLanguage]);
  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://stream-student-web.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:image" content={ogImage} />
      </Head>
      <main className="relative max-w-[1920px] w-full flex items-start justify-between gap-5 mx-auto p-5 bg-[url('/home/tutor_panel_bg.png')] bg-center bg-cover bg-no-repeat">
        <Drawer />

        <section className="w-full">
          <AdminNavbar />
          <article className="h-[calc(100vh-124px)] overflow-y-scroll">
            {children}
          </article>
        </section>
      </main>
    </>
  );
};

export default withProtectedRoute(AdminPanelLayout);
