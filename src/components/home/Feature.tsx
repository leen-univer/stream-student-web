import { useState, useEffect } from "react";
import { useAppContext } from "contexts";
import { featureContent } from "locale";

const Feature = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const { selectedLanguage } = useAppContext();
  const FEATURE_ARR = [
    {
      _id: "1",
      icon: "/home/feature_icon_1.png",
      title: featureContent(selectedLanguage).coursesLayout,
      img: "/home/feature_1.png",
    },
    {
      _id: "2",
      icon: "/home/feature_icon_2.png",
      title: featureContent(selectedLanguage).HeaderLayout,
      img: "/home/feature_2.png",
    },
    {
      _id: "3",
      icon: "/home/feature_icon_3.png",
      title: featureContent(selectedLanguage).toolkit,
      img: "/home/feature_3.png",
    },
    {
      _id: "4",
      icon: "/home/feature_icon_4.png",
      title: featureContent(selectedLanguage).infiniteFlexible,
      img: "/home/feature_4.png",
    },
  ];

  useEffect(() => {
    const time = setInterval(() => {
      if (FEATURE_ARR?.length - 1 === activeIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    }, 4000);
    return () => {
      clearInterval(time);
    };
  }, [activeIndex]);

  return (
    <article className="main-container grid place-items-center pb-10 md:pb-20">
      <section className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-5 bg-gradient-to-b from-primary/10 to-white p-4 lg:p-14 rounded-xl">
        <aside className="w-full lg:w-2/5 flex flex-col gap-5">
          <p className="w-fit uppercase text-sm text-primary bg-primary/10 rounded-[30px] px-5 py-2">
            {featureContent(selectedLanguage).oneForEducation}
          </p>
          <h1 className="capitalize title-styling">
            {featureContent(selectedLanguage).layoutReady}
          </h1>
          <div className="flex flex-col gap-4 pt-4">
            {FEATURE_ARR?.map((curElm, index) => (
              <div
                key={curElm?._id}
                className={`relative flex items-center gap-5 px-7 py-5 bg-gray-200 rounded-md`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span>
                  <img src={curElm?.icon} alt="icon" className="w-8" />
                </span>
                <span className="tracking-wide font-semibold">
                  {curElm?.title}
                </span>
                {index === activeIndex ? (
                  <>
                    <span className="absolute w-4 h-4 rotate-45 top-1/2 -translate-y-1/2 -right-2 bg-gray-200"></span>
                    <p className="absolute top-0 left-0 bg-animate bg-primary/10 w-full h-full z-10 rounded-md"></p>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </aside>
        <aside className="w-full lg:w-3/5 h-full lg:h-[35rem]">
          <img src={FEATURE_ARR[activeIndex]?.img} alt="features" />
        </aside>
      </section>
    </article>
  );
};

export default Feature;
