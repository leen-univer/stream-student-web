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
    <article className="about-section main-container pb-10 md:pb-20">
      <section className="about-cards">
        <aside className="flex">
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
    <article className="cards-container group common-transition">
      <div className="about-card">
        <div className="img">
          <img className="w-12" src={item.image} alt="abstract-icon" />
        </div>
        <h4 className="font-semibold text-lg">{item.title}</h4>
        <p className="text-gray-100">{item.description}</p>
      </div>
    </article>
  );
};

export default AboutSection;
