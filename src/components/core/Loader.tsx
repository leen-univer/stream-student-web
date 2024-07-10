import { LOADING } from "assets/animations";
import React from "react";
import Lottie from "react-lottie";

const Loader = ({ visible = true }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LOADING,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white ${
        visible ? "block" : "hidden"
      }`}
    >
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid"></div> */}
      <Lottie options={defaultOptions} height={500} width={550} />
    </section>
  );
};

export default Loader;
