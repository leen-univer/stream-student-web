import { CheckCircleRounded } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button } from "@mui/material";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { studentPanel } from "locale";
import { useRouter } from "next/router";
import { set } from "nprogress";
import { LectureDataType } from "pages/courses";
import { useState } from "react";
import { currencyFormatter } from "utils";
import showError from "utils/error";
import { sliceSentence } from "utils/SliceSentence";

const PlaylistCard = ({
  item,
  isbundle,
  filterCourseMutate,
}: {
  item: LectureDataType;
  isbundle?: boolean;
  filterCourseMutate?: () => void;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { selectedLanguage } = useAppContext();
  const { mutation } = useMutation();

  const handleAddToCart = async (courseId: any) => {
    try {
      const res = await mutation(`cart/create-cart`, {
        method: "POST",
        body: {
          courseId: courseId,
        },
      });
      filterCourseMutate?.();
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  const showLogin = (id: any) => {
    if (user?._id && !item?.isInCart) {
      handleAddToCart(id);
    } else if (user?._id && item?.isInCart) {
      router?.push(`/my-account/my-cart`);
    } else {
      router?.push(`login`);
    }
  };

  return (
    <section className="bg-white border group border-teal-500 hover:border-primary/60 hover:translate-y-1 common-transition rounded-lg overflow-hidden shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <aside className="relative">
        <img
          className="w-full h-40 object-cover object-center"
          src={item?.thumbnailUrl || "/Image/Placeholder.png"}
          alt="course-thumbnail"
        />
      </aside>
      <aside className="p-4 space-y-3">
        <div className="h-14">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {sliceSentence(
              item?.courseName || studentPanel(selectedLanguage).notgiven,
              7
            )}
          </h3>
        </div>
        <div className="h-14">
          <p className="text-gray-600">
            {sliceSentence(
              item?.description || studentPanel(selectedLanguage).notgiven,
              10
            )}
          </p>
        </div>
        <div className="flex justify-between p-4 ">
          <span className=" font-semibold text-xl">
            {currencyFormatter(item?.salePrice as number)}
          </span>
          <span className="text-red-500 font-semibold text-xl line-through">
            {currencyFormatter(item?.mrpPrice as number)}
          </span>
        </div>
        <div className="text-center w-full">
          <button
            onClick={() => router.push(`courses/${item?._id}`)}
            className="w-full rounded px-5 py-2.5 overflow-hidden bg-gray-200 hover:shadow-lg hover:bg-gradient-to-r group-hover:from-gray-400 hover:to-gray-800  transition-all ease-out duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-black font-semibold text-xl">
              {studentPanel(selectedLanguage).viewCourse}
            </span>
          </button>
        </div>
        {isbundle ? (
          " "
        ) : (
          <div className="text-center w-full">
            {!item?.isInCart && item?.isPurchased ? (
              <button className="w-full rounded px-5 py-2.5 overflow-hidden bg-green-400/20">
                <span className="mr-1">
                  {" "}
                  <CheckCircleRounded
                    fontSize="medium"
                    className="text-green-500"
                  />
                </span>
                <span className="text-green-800 font-semibold text-xl">
                  {studentPanel(selectedLanguage).Enrolled}
                </span>
              </button>
            ) : (
              <button
                onClick={() => showLogin(item?._id)}
                className={`w-full rounded px-5 py-2.5 overflow-hidden group ${
                  item?.isInCart
                    ? "bg-emerald-700/60 hover:bg-gradient-to-r group-hover:from-green-400/60 hover:to-green-800/20 text-green-950"
                    : "text-white  bg-primary/80 relative hover:bg-gradient-to-r group-hover:from-secondary hover:to-primary/50"
                }   hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 flex items-center justify-center gap-2`}
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-semibold text-xl">
                  {item?.isInCart ? (
                    <ShoppingCartCheckoutIcon />
                  ) : (
                    <AddShoppingCartIcon />
                  )}
                </span>
                <span className="relative font-semibold text-xl">
                  {item?.isInCart
                    ? studentPanel(selectedLanguage).Gotocart
                    : studentPanel(selectedLanguage).Addtocart}
                </span>
              </button>
            )}
          </div>
        )}
      </aside>
    </section>
  );
};

export default PlaylistCard;
