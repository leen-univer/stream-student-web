import { CART } from "assets/animations";
import { CartCard } from "components/cards";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { AccountLayout, PublicLayout } from "layouts";
import { myCartContent, studentPanel } from "locale";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

const MyCart = () => {
  const [courseIds, setCourseIds] = useState([]);
  const [bundleIds, setBundleIds] = useState([]);

  const stripe = useRef<any>(null);

  const { data, mutate } = useSWRAPI("cart/my-cart");

  const { data: cartTotalPrice, mutate: checkOutMutate } =
    useSWRAPI("cart/my-checkout");

  useEffect(() => {
    const reqCourseIds = cartTotalPrice?.data?.allData?.filter(
      (data: any) => data?.courseId
    );
    setCourseIds(
      reqCourseIds?.length
        ? reqCourseIds?.map((item: { courseId?: string }) => item?.courseId)
        : []
    );

    const reqBundleIds = cartTotalPrice?.data?.allData?.filter(
      (data: any) => data?.bundleId
    );
    setBundleIds(
      reqBundleIds?.length
        ? reqBundleIds?.map((item: { bundleId?: string }) => item?.bundleId)
        : []
    );
  }, [cartTotalPrice?.data?.allData?.length]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CART,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const router = useRouter();

  return (
    <PublicLayout title="My Cart | StreamStudent" footerBgColor="bg-primary/20">
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

              const output = await mutation(`transaction/cart-payment`, {
                method: "POST",
                body: {
                  token: token,
                  // amount: getCourse?.salePrice,
                  courseId: courseIds,
                  bundleId: bundleIds,
                  email: token?.email,
                },
              });
              router.reload();
              // courseMutate?.();
              if (output?.status === 200) {
                Swal.fire({
                  title: studentPanel(selectedLanguage).success,
                  text: studentPanel(selectedLanguage).transactionsuccessfull,
                  icon: "success",
                  allowOutsideClick: false,
                  didClose() {
                    // courseMutate();
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
          amount={cartTotalPrice?.data?.PriceData * 100}
          // email={"xyz.com"}
          name={`Purchase For`}
          alipay={true}
        />
      </div>

      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-y-scroll">
          <h1 className="title-styling text-center pb-6 lg:pb-12">
            {myCartContent(selectedLanguage).My}{" "}
            <span className="text-primary">
              {myCartContent(selectedLanguage).Cart}
            </span>
          </h1>

          <aside className="">
            {data?.data?.data?.length ? (
              <div className="flex flex-col rounded-lg md:p-3 p-1 shadow-lg border border-gray-200">
                <CartCard
                  cartData={data?.data?.data}
                  checkOutMutate={checkOutMutate}
                  mutate={mutate}
                />
                <div className=" grid grid-cols-12 text-2xl md:px-6 px-2 md:py-3 py-4 bg-gray-100">
                  <h3 className="text-gray-900 font-semibold md:col-span-8 col-span-3">
                    {myCartContent(selectedLanguage).Total}:
                  </h3>
                  <p className="text-red-600 font-semibold md:col-span-2 col-span-4">
                    ${cartTotalPrice?.data?.PriceData}
                  </p>
                  <button
                    onClick={() => stripe?.current?.onClick()}
                    className="md:py-2 md:px-4 py-1 px-4 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-md md:col-span-2 col-span-5"
                  >
                    {myCartContent(selectedLanguage).Checkout}
                  </button>
                </div>
              </div>
            ) : (
              <Lottie options={defaultOptions} height={400} width={400} />
            )}
          </aside>
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export default MyCart;
