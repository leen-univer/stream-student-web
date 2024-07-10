import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useAppContext } from "contexts";
import { useEffect } from "react";
import { LanguageType } from "types";
type Props = {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  ogImage?: string;
  footerBgColor?: string;
};
const PublicLayout = ({
  children = <></>,
  title = "STREAM-STUDENT",
  description,
  ogImage,
  footerBgColor = "bg-white",
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
      <main>
        <Navbar />
        {children}
        <Footer footerBgColor={footerBgColor} />
      </main>
    </>
  );
};

export default PublicLayout;
