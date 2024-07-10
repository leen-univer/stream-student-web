import { useAppContext } from "contexts";
import { aboutContent } from "locale";
import React from "react";

type AboutFeatureArrType = {
  _id: string;
  image: string;
  title: string;
  description: string;
};

const AboutSection = () => {
  const { selectedLanguage } = useAppContext();
  const ABOUT_FEATURE_ARR: AboutFeatureArrType[] = [
    {
      _id: "1",
      image: "/home/icon_1.png",
      title: aboutContent(selectedLanguage).FastPerformance,
      description: aboutContent(selectedLanguage).FastPerformanceDescription,
    },
    {
      _id: "2",
      image: "/home/icon_2.png",
      title: aboutContent(selectedLanguage).PerfectResponsive,
      description: aboutContent(selectedLanguage).PerfectResponsiveDescription,
    },
    {
      _id: "3",
      image: "/home/icon_3.png",
      title: aboutContent(selectedLanguage).FriendlySupport,
      description: aboutContent(selectedLanguage).FriendlySupportDescription,
    },
    {
      _id: "4",
      image: "/home/icon_4.png",
      title: aboutContent(selectedLanguage).EasyToUse,
      description: aboutContent(selectedLanguage).EasyToUseDescription,
    },
  ];

  return (
    <article className="main-container pb-10 md:pb-20">
      <section className="bg-gradient-to-r from-primary to-primary/80 rounded-xl">
        <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {ABOUT_FEATURE_ARR.map((item: AboutFeatureArrType, index: number) => (
            <AboutCard
              key={item._id}
              item={item}
              isLastIndex={ABOUT_FEATURE_ARR?.length - 1 === index}
            />
          ))}
        </aside>
      </section>
    </article>
  );
};

const AboutCard = ({
  item,
  isLastIndex,
}: {
  item: AboutFeatureArrType;
  isLastIndex: boolean;
}) => {
  return (
    <article
      className={`group common-transition ${
        isLastIndex
          ? ""
          : "border-b md:border-b-0 lg:border-r border-gray-200 hover:border-transparent"
      }`}
    >
      <div className="h-full flex flex-col gap-4 text-white tracking-wide rounded-xl p-10 2xl:p-12 common-transition group-hover:bg-slate-900 group-hover:-translate-y-6 group-hover:scale-105 group-hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <img className="w-12" src={item.image} alt="abstract-icon" />
        <h4 className="font-semibold text-lg">{item.title}</h4>
        <p className="text-gray-100">{item.description}</p>
      </div>
    </article>
  );
};

export default AboutSection;
