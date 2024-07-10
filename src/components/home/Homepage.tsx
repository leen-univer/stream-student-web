import HeroSection from "./HeroSection";
import ProfileSection from "./ProfileSection";
import CareerSection from "./CareerSection";
import LecturesSection from "./LecturesSection";
import AboutSection from "./AboutSection";
import FormSection from "./FormSection";
import Feature from "./Feature";
import { useEffect } from "react";
import { UAParser } from "ua-parser-js";
import useMutation from "hooks/useMutataion";

const Homepage = () => {
  const parser = new UAParser();
  const { mutation, isLoading } = useMutation();

  useEffect(() => {
    (async () => {
      const userAgent = window.navigator.userAgent;
      const hash = window.btoa(userAgent).replace(/=/g, "");
      const result: any = parser.setUA(userAgent).getResult();

      // if (result?.os?.name?.toUpperCase() === "WINDOWS") /
      const deviceType =
        result?.os?.name?.toUpperCase() === "WINDOWS"
          ? "DESKTOP"
          : "ANDROID"
          ? "MOBILE"
          : "IPHONE"
          ? "MOBILE"
          : "IPAD"
          ? "TABLET"
          : "OTHER";

      const data = await mutation("visitor/create-visitor", {
        method: "POST",
        body: { deviceType: `${deviceType}` },
        isFormData: false,
        isAlert: false,
      });
    })();
  }, []);
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Feature />
      <ProfileSection />
      <CareerSection />
      <LecturesSection />
      <FormSection />
    </>
  );
};

export default Homepage;
