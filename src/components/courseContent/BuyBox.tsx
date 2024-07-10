import { AllInclusive, EmojiEvents, PhoneIphone } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useState } from "react";
import { coursesIdContent, studentPanel } from "locale";
import { useRouter } from "next/router";
import { useRef } from "react";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { currencyFormatter, getDiscountValue } from "utils";
import showError from "utils/error";

const BuyBox = ({
  getCourse,
  courseMutate,
}: {
  getCourse: any;
  courseMutate: () => void;
}) => {
  const router = useRouter();
  const stripe = useRef<any>(null);
  const { user } = useAuth();
  const { selectedLanguage, changeLanguage } = useAppContext();

  const { mutation, isLoading } = useMutation();
  const handleAddToCart = async (courseId: any) => {
    try {
      const res = await mutation(`cart/create-cart`, {
        method: "POST",
        body: {
          courseId: courseId,
        },
      });
      courseMutate();
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  const showLogin = (id: any) => {
    if (user?._id && !getCourse?.isInCart) {
      handleAddToCart(id);
    } else if (user?._id && getCourse?.isInCart) {
      router?.push(`/my-account/my-cart`);
    } else {
      router?.push(`/login`);
    }
  };
  return (
    <>
      <div className="hidden">
        <StripeCheckout
          currency="USD"
          ref={stripe}
          stripeKey={
            "pk_test_51MSfb7AYca0qJ0qztPjeMucdFFD03Hmnjrmbf71wlDGxxQ0GBf6Yrei25aEGOPO2gLkEGkiOlTIoMAamIKzXILoQ00fZEGh1w2"
          }
          token={async (token: any) => {
            try {
              Swal.fire(
                studentPanel(selectedLanguage).pleasewait,
                studentPanel(selectedLanguage).validatingtransaction,
                "info"
              );
              //api here------------

              const output = await mutation(`transaction/create-transaction`, {
                method: "POST",
                body: {
                  token: token,
                  amount: getCourse?.salePrice,
                  email: token?.email,
                  courseId: router?.query?.courseID,
                },
              });
              router.reload();
              courseMutate?.();
              if (output?.status === 200) {
                Swal.fire({
                  title: studentPanel(selectedLanguage).success,
                  text: studentPanel(selectedLanguage).transactionsuccessfull,
                  icon: "success",
                  allowOutsideClick: false,
                  didClose() {
                    courseMutate();
                    // router.push(`${asPath}`);
                  },
                });
              } else {
                Swal.fire(
                  studentPanel(selectedLanguage).transactionUnsuccessfull
                );
              }
            } catch (error) {}
          }}
          amount={getCourse?.salePrice * 100}
          // email={"xyz.com"}
          name={`Purchase For ${getCourse?.courseName}`}
          alipay={true}
        />
      </div>

      <article className="py-2 space-y-5">
        <section className="w-full h-fit flex flex-col gap-6 z-[50] bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-3xl p-6 relative">
          <div className="flex items-center gap-2">
            <span className="md:text-4xl text-3xl lg:text-2xl 2xl:text-4xl font-semibold">
              {currencyFormatter(getCourse?.salePrice || 0)}
            </span>
            <span className="text-gray-400 text-base line-through">
              {currencyFormatter(getCourse?.mrpPrice || 0)}
            </span>
            <div
              className={`absolute top-2  bg-primary z-[40] inline-block py-2 px-4  text-center text-white text-lg  rounded-3xl ${
                selectedLanguage === "ar" ? "-left-3" : "-right-3"
              }`}
            >
              <p className="ml-1">
                {coursesIdContent(selectedLanguage).sale}{" "}
                {getDiscountValue(getCourse?.mrpPrice, getCourse?.salePrice)}%{" "}
                {coursesIdContent(selectedLanguage).off}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="tracking-wide font-semibold text-xl">
              {coursesIdContent(selectedLanguage).CourseIncludes}:
            </p>
            <p className="flex items-center gap-2 text-lg">
              <AllInclusive className="!text-base !text-blue-500" />
              {coursesIdContent(selectedLanguage).lifetimeAccess}
            </p>
            <p className="flex items-center gap-2 text-lg">
              <PhoneIphone className="!text-base" />
              {coursesIdContent(selectedLanguage).AccessonmobileandTV}
            </p>
            <p className="flex items-center gap-2 text-lg">
              <EmojiEvents className="!text-base !text-yellow-400" />
              {coursesIdContent(selectedLanguage).completionCertificate}
            </p>
          </div>
          <div className="flex lg:justify-between md:flex-row flex-col gap-2 w-full">
            <button
              onClick={() => {
                if (!user?._id)
                  return Swal.fire({
                    title: studentPanel(selectedLanguage).error,
                    text: studentPanel(selectedLanguage).Loginfirst,
                    icon: "error",
                    allowOutsideClick: false,
                    didClose() {
                      router.push("/login");
                    },
                  });

                stripe?.current?.onClick();
              }}
              className="btn-primary cursor-pointer h-11 md:w-1/2 w-full rounded-xl flex flex-row  items-center justify-center px-4"
            >
              <ShoppingCartIcon />
              <span className="lg:font-semibold font-medium lg:text-xs 2xl:text-sm text-lg">
                {coursesIdContent(selectedLanguage).BuythisCourse}
              </span>
            </button>
            {/* <button className="btn-primary cursor-pointer h-11 w-64 rounded-xl flex flex-row gap-2 items-center justify-center">
              <AddShoppingCartIcon />
              <span className="lg:font-semibold font-medium text-sm">
                {coursesIdContent(selectedLanguage).AddToCart}
              </span>
            </button> */}
            <button
              onClick={() => showLogin(getCourse?._id)}
              className={`md:w-1/2 w-full rounded px-3 py-2.5 overflow-hidden group ${
                getCourse?.isInCart
                  ? "bg-emerald-700/50 hover:bg-gradient-to-r group-hover:from-green-400/60 hover:to-green-800/20 text-black "
                  : "text-white bg-primary/80 relative hover:bg-gradient-to-r group-hover:from-secondary"
              }  cursor-pointer h-11  rounded-xl flex flex-row gap-2 items-center justify-center 
              hover:to-primary/50  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300`}
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold text-xl">
                {getCourse?.isInCart ? (
                  <ShoppingCartCheckoutIcon />
                ) : (
                  <AddShoppingCartIcon />
                )}
              </span>
              <span className="relative font-semibold text-sm">
                {getCourse?.isInCart
                  ? studentPanel(selectedLanguage).Gotocart
                  : studentPanel(selectedLanguage).Addtocart}
              </span>
            </button>
          </div>
        </section>
      </article>
    </>
  );
};

export default BuyBox;
