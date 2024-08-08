import { useAppContext } from "contexts";
import { heroContent } from "locale";
import Link from "next/link";

const HeroSection = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <article className="hero-content-container w-full bg-cover bg-no-repeat py-20">
      <aside className="main-container flex lg:flex-row flex-col-reverse items-center justify-between gap-6 md:gap-8">
        <div className="hero-content z-10 w-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <h1 className="hero-title title-styling md:text-6xl text-3xl capitalize lg:leading-[4rem]">
            {heroContent(selectedLanguage).heroTitle}
            <span className="">
              {" "}
              {heroContent(selectedLanguage).highlightedText}
            </span>
          </h1>
          <p className="hero-subline ">
            {heroContent(selectedLanguage).heroDescription}
          </p>
          <Link href="/register">
            <button className="btn btn-secondary w-[297px] h-[32px] mt-[40px]">
              {heroContent(selectedLanguage).getStarted}
            </button>
          </Link>
        </div>
        <div className="hero-video-container">
          <video autoPlay loop muted className="hero-video">
            <source src="/streamStudnetHero.mp4" type="video/mp4"/>
          </video>
        </div>
      </aside>
    </article>
  );
};

export default HeroSection;
