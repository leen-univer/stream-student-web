import { useAppContext } from "contexts";
import { heroContent } from "locale";
import React from "react";
import QuizTestSection from "./QuizTestSection";

const TestKnowledgeHero = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <article className="w-full lg:mb-20 md:mb-16 mb-12">
      <aside className="main-container flex lg:flex-row flex-col-reverse items-center justify-between gap-6 md:gap-8">
        <div className="w-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <h1 className="title-styling md:text-6xl text-3xl capitalize lg:leading-[4rem]">
            {heroContent(selectedLanguage).testPageTitle}
            <span className="text-primary text">
              {heroContent(selectedLanguage).testPagehighlightedText}
            </span>
          </h1>
          <p className="description-styling text-lg tracking-normal font-normal text-slate-500 pt-6">
            {heroContent(selectedLanguage).testPageDesc}
          </p>
        </div>
        <div className="w-full">
          <img
            className="w-full"
            src="/home/quiz2.jpg"
            alt="feature-provided"
          />
        </div>
      </aside>
      <aside className="main-container text-center flex flex-col justify-center items-center mt-12">
        <h2 className="text-2xl font-semibold text-primary">
          {heroContent(selectedLanguage).testPageQuizSecTitle}
        </h2>
        <p className="text-lg text-gray-700 mt-4 w-[70%]">
          {heroContent(selectedLanguage).testPageQuizSecDesc}
        </p>
      </aside>
      <aside>
        <QuizTestSection />
      </aside>
    </article>
  );
};

export default TestKnowledgeHero;
