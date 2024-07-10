import { useAppContext } from "contexts";
import { heroContent } from "locale";

const HeroSection = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <article className="w-full bg-cover bg-no-repeat bg-[url('/Image/background-cover-image.png')] py-20">
      <aside className="main-container flex lg:flex-row flex-col-reverse items-center justify-between gap-6 md:gap-8">
        <div className="w-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <h1 className="title-styling md:text-6xl text-3xl capitalize lg:leading-[4rem]">
            {heroContent(selectedLanguage).heroTitle}
            <span className="text-primary text">
              {" "}
              {heroContent(selectedLanguage).highlightedText}
            </span>
          </h1>
          <p className="description-styling text-lg tracking-normal font-normal text-slate-500 pt-6">
            {heroContent(selectedLanguage).heroDescription}
          </p>
        </div>
        <div className="w-full">
          <img
            className="w-full"
            src="/Image/hero-section-image.png"
            alt="feature-provided"
          />
        </div>
      </aside>
    </article>
  );
};

export default HeroSection;
