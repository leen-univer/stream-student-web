import { ICONS } from "assets";
import { useAppContext } from "contexts";
import { careerContent } from "locale";
import Link from "next/link";
import React from "react";

const CareerSection = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <article className="bg-cover bg-[url('/Image/bg1.png')] pb-10">
      <aside className="main-container  flex justify-center items-center ">
        <div className="md:w-full w-3/5 flex md:flex-row flex-col justify-between items-center md:gap-20 pt-10">
          <img
            className="md:w-1/3 1/2 w-64"
            src="./Image/readingGirl(1).png"
            alt="Reading-Girl"
          />
          <section className="md:w-2/3 w-full text-white text-center md:p-10 pb-5 flex flex-col items-center justify-center">
            <h1 className="md:title-styling md:text-5xl text-2xl font-bold p-2">
              {careerContent(selectedLanguage).careerTitle}
            </h1>
            <p className=" description-styling tracking-normal md:text-xl text-normal">
              {careerContent(selectedLanguage).careerDescription}
            </p>
            <Link href="/register">
              <button className="group w-52 flex justify-center items-center gap-2 py-2 text-xl my-3 bg-white text-secondary font-semibold border-2 rounded-xl">
                {careerContent(selectedLanguage).GetStartedButton}
                <ICONS.RightArrow className="mt-1 text-2xl group-hover:!translate-x-2 common-transition" />
              </button>
            </Link>
          </section>
        </div>
      </aside>
    </article>
  );
};

export default CareerSection;
