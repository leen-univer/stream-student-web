import { ICONS } from "assets";
import { useAppContext } from "contexts";
import { careerContent } from "locale";
import Link from "next/link";
import React from "react";

const CareerSection = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <div className="section-container reserve-your-spot">
      <div className="section-video">
        <video autoPlay loop muted>
          <source src="./section-vid.mp4"/>
        </video>

      </div>
      <div className="section-para">
        <div>
          <h1 className="section-title text-primary">
            {careerContent(selectedLanguage).reserveYourSpot}
          </h1>
          <p>{careerContent(selectedLanguage).reserveYourSpotDescription}</p>
        </div>

        <div>
          <a href="/register">
            <button className="btn btn-primary py-[10px] px-[15px]" >
              {careerContent(selectedLanguage).joinTheFamily}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;
