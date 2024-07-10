import { Button } from "@mui/base";
import {
  AccessTimeOutlined,
  CheckCircleOutline,
  Close,
  Edit,
  HelpOutline,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { CLASS2 } from "assets/animations";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { AccountLayout, PublicLayout } from "layouts";
import { onlineClassContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { Student_Class_DataType } from "types";
import showError from "utils/error";
import QuizIcon from "@mui/icons-material/Quiz";

const OnlineClasses = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: CLASS2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const { data, mutate } = useSWRAPI(`class/get-my-class`);
  const { data: ClassCardData } = useSWRAPI(`student/current-day-class`);

  return (
    <PublicLayout
      title="Online Classes | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-y-auto ">
          <div className="md:p-4 p-2">
            {ClassCardData?.data?.data?.data?.length ? (
              <aside className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {ClassCardData?.data?.data?.data?.map(
                  (item: Student_Class_DataType) => (
                    <OnlineClassCard item={item} key={item._id} />
                  )
                )}
              </aside>
            ) : (
              <Lottie options={defaultOptions} height={500} width={700} />
            )}
          </div>
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

const OnlineClassCard = ({ item }: { item: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isJoinEnabled, setIsJoinEnabled] = useState(true);
  const [animateButton, setAnimateButton] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [startTime, setStartTime] = useState(
    dayjs(item?.Class?.timeOfEnter || "Not Given")
  );
  const [selectValueType, setSelectValueType] = useState<"Yes" | "No" | string>(
    ""
  );
  const [endTime, setEndTime] = useState(dayjs(item?.Class?.timeOfExit));

  const { mutation } = useMutation();
  const stripe = useRef<any>(null);
  const router = useRouter();

  const [openResModal, setOpenResModal] = useState(false);

  const handleJoin = async () => {
    try {
      const res = await mutation(
        `attendance/create-attendance?courseId=${item?.Class?.courseId}&classId=${item?.Class._id}`,
        {
          method: "POST",
          body: {
            // timeOfIn: item?.Class?.timeOfEnter,
            // timeOfOut: item?.Class?.timeOfExit,
            // isPresent: true,
          },
        }
      );
    } catch (error) {
      showError(error);
    } finally {
      console.error();
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const closeDialog = () => {
    setOpenModal(false);
  };
  const [couponCode, setCouponCode] = useState("");

  const { data, error, mutate } = useSWRAPI(
    `class/get-particular-class?classId=${item?.Class?._id}&couponCode=${couponCode}`
  );

  const { data: purchaseKey, mutate: purchaseMutate } = useSWRAPI(
    `class/class-purchase-status?classId=${item?.Class?._id}`
  );

  //  Update the times in response to changes in the 'item'

  useEffect(() => {
    setStartTime(dayjs(item?.Class?.timeOfEnter || "Not Given"));
    setEndTime(dayjs(item?.Class?.timeOfExit));
  }, [item]);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
      setIsJoinEnabled(true);
      setAnimateButton(true);
    } else if (currentTime.isAfter(endTime)) {
      setIsJoinEnabled(false);
    }
  }, [currentTime, startTime, endTime]);
  const { data: myresponse, mutate: ResponseMutate } = useSWRAPI(
    `studentResponse/get-own-response?classId=${item?.Class?._id}`
  );
  const handleResposeOfClass = async (type: string) => {
    try {
      const res = await mutation(
        `studentResponse/create-response?classId=${item?.Class?._id}`,
        {
          method: "POST",
          body: {
            response: type === "Yes",
          },
        }
      );
      if (res?.status == 200) {
        Swal.fire(
          onlineClassContent(selectedLanguage).Success,
          onlineClassContent(selectedLanguage).SuccessfullyResponded,
          // "Successfully Responded",
          "success"
        );
      }
      ResponseMutate();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const { selectedLanguage } = useAppContext();

  return (
    <article className="relative bg-primary/10 h-full p-8 rounded-t-[53px] rounded-br-[53px] gap-1 flex flex-col">
      <div className="flex flex-row justify-between">
        <p className="text-xl md:text-lg font-semibold">
          {" "}
          {onlineClassContent(selectedLanguage).LiveClassOn}
        </p>
        {/* <div className="text-white bg-primary/60 rounded-xl font-semibold mb-2 px-3 py-1">
          {onlineClassContent(selectedLanguage).Price}
          <span className="text-xl">$</span> {item.Class.price}
        </div> */}
        <div className="">
          {item.Class.price === 0 ? (
            <div className="bg-green-400 font-semibold text-white  rounded-lg  mb-2 px-3 py-1">
              <span className="text-xl">
                {onlineClassContent(selectedLanguage).free}
              </span>
            </div>
          ) : (
            <div className="bg-primary/60 font-semibold text-white  rounded-lg  mb-2 px-3 py-1">
              {onlineClassContent(selectedLanguage).Price}
              <span className="text-xl">$</span> {item?.Class?.price}
            </div>
          )}
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-primary pb-1">
        {item?.Class?.classTitle || "Not Given"}
      </h2>
      <p className="font-medium tracking-wide">
        {onlineClassContent(selectedLanguage).Course}
        <span className="font-semibold">
          {item?.Class?.Course?.courseName || "Not Given"}
        </span>
      </p>
      <p className="font-medium tracking-wide">
        {onlineClassContent(selectedLanguage).Tutor}{" "}
        <span className="font-semibold">
          {item?.Class?.Tutor?.name || "Not Given"}
        </span>
      </p>
      <p className="font-medium tracking-wide">
        {onlineClassContent(selectedLanguage).StartTime}
        <span className="font-semibold">
          {dayjs(item?.Class?.timeOfEnter || "Not Given").format(
            " ddd, MMM D, YYYY h:mm A"
          )}
        </span>
      </p>
      <p className="font-medium tracking-wide pb-1">
        {onlineClassContent(selectedLanguage).EndTime}
        <span className="font-semibold">
          {dayjs(item?.Class?.timeOfExit).format(" ddd, MMM D, YYYY h:mm A")}
        </span>
      </p>
      {item?.Class?.paymentMethod === "PAID" && item?.Class?.price > 0 ? (
        purchaseKey?.data?.isPurchase ? (
          <div className="flex items-center justify-center">
            <div
              className="rounded-2xl px-3 py-1
                  bg-green-600/60"
            >
              <span className="text-xl text-white font-medium">
                <>{onlineClassContent(selectedLanguage).Interested}</>
              </span>
            </div>
          </div>
        ) : (
          " "
        )
      ) : item?.Class?.price === 0 ? (
        <div className="flex items-center justify-center gap-2">
          <button
            disabled={
              myresponse?.data?.data?.length > 0 ||
              (myresponse?.data?.data?.length > 0 &&
                currentTime.isAfter(endTime))
            }
            className={`rounded-2xl px-3 py-1 cursor-not-allowed ${
              myresponse?.data?.data?.[0]?.response === false
                ? "bg-red-600"
                : "bg-green-600/60"
            }  ${
              myresponse?.data?.data?.length > 0
                ? "bg-green-600/60"
                : currentTime.isAfter(endTime)
                ? "bg-red-500/30 text-white cursor-not-allowed"
                : "bg-blue-400"
            }`}
          >
            <span className="text-xl text-white font-medium">
              {myresponse?.data?.data?.length > 0 ? (
                <>
                  {myresponse?.data?.data?.[0]?.response === true ? (
                    <>{onlineClassContent(selectedLanguage).Interested}</>
                  ) : (
                    <>{onlineClassContent(selectedLanguage).NotInterested}</>
                  )}
                </>
              ) : (
                <>
                  {currentTime.isAfter(endTime)
                    ? onlineClassContent(selectedLanguage).responseTimeOut
                    : onlineClassContent(selectedLanguage).Response}
                  <span>
                    {currentTime.isAfter(endTime) ? (
                      <AccessTimeOutlined className="mr-1" />
                    ) : (
                      <HelpOutline className="mr-1" />
                    )}
                  </span>
                </>
              )}
            </span>
          </button>
          <div
            onClick={() => setOpenResModal(true)}
            className="p-1 rounded-full border-2 border-yellow-400 cursor-pointer"
          >
            <Edit fontSize="medium" />
          </div>
        </div>
      ) : (
        ""
      )}
      {item?.Class?.paymentMethod === "PAID" && item?.Class?.price > 0 ? (
        <>
          {/* stripe  */}
          <div className="hidden">
            <StripeCheckout
              currency="USD"
              ref={stripe}
              stripeKey={
                "pk_test_51MSfb7AYca0qJ0qztPjeMucdFFD03Hmnjrmbf71wlDGxxQ0GBf6Yrei25aEGOPO2gLkEGkiOlTIoMAamIKzXILoQ00fZEGh1w2"
              }
              token={async (token: any) => {
                closeDialog();
                try {
                  Swal.fire(
                    "Please wait...",
                    "We are validating your transaction",
                    "info"
                  );
                  //api here------------

                  const output = await mutation(
                    `transaction/class-transaction`,
                    {
                      method: "POST",
                      body: {
                        token: token,
                        amount: item?.Class?.price,
                        email: token?.email,
                        classId: item?.Class?._id,
                        couponCode: couponCode,
                      },
                    }
                  );
                  router.reload();
                  // courseMutate?.();
                  if (output?.status === 200) {
                    await mutation(
                      `studentResponse/create-response?classId=${item?.Class?._id}`,
                      {
                        method: "POST",
                        body: {
                          response: true,
                        },
                      }
                    );
                    ResponseMutate();
                    Swal.fire({
                      title: "Success",
                      text: "TRANSACTION SUCCESS",
                      icon: "success",
                      allowOutsideClick: false,
                      timer: 3000,
                      didClose() {
                        // router.push(`${asPath}`);
                      },
                    });
                  } else {
                    Swal.fire({
                      title: "Error",
                      text: "TRANSACTION UNSUCCESSFUL",
                      icon: "error",
                      timer: 3000,
                    });
                  }
                } catch (error) {}
              }}
              amount={data?.data?.data * 100 || item?.Class?.price * 100}
              // email={"xyz.com"}
              name={`Buy ${item?.Class?.classTitle}`}
              alipay={true}
            />
          </div>

          {/* coupon modal */}
          <div>
            <Dialog
              open={openModal}
              onClose={closeDialog}
              fullWidth
              maxWidth="sm"
              className="overflow-hidden h-full"
              PaperProps={{
                style: {
                  borderRadius: "1rem",
                },
              }}
            >
              <section className="relative h-full">
                <span className="absolute top-2 right-2">
                  <IconButton onClick={handleClose}>
                    <Close fontSize="large" className="!text-red-600" />
                  </IconButton>
                </span>
                <aside className="flex flex-col justify-center items-center p-10">
                  <DialogTitle className="text-3xl font-bold text-gray-800 text-center">
                    {onlineClassContent(selectedLanguage).PayNow}
                  </DialogTitle>
                  <DialogContent className="p-4">
                    <div className="mb-4">
                      <input
                        className="w-full border rounded-lg px-3 py-2 outline-none"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      {/* <Button
                        className="mt-2 bg-secondary/70 hover:bg-secondary/90 text-white font-semibold px-4 py-2 rounded w-full"
                        onClick={applyCoupon}
                      >
                        Apply Coupon
                      </Button> */}
                      {data?.data?.message && (
                        <div className={`text-center mt-1 text-green-500`}>
                          {data?.data?.message}
                        </div>
                      )}
                      {data?.data?.error?.message && (
                        <div className={`text-center mt-1 text-red-500`}>
                          {data?.data?.error?.message}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center mt-8">
                      <Button
                        disabled={data?.data?.error?.message}
                        className="bg-primary/80 hover:bg-primary text-white font-semibold px-8 py-2 rounded-lg common-transition"
                        onClick={() => stripe?.current?.onClick()}
                      >
                        {onlineClassContent(selectedLanguage).Pay}
                        <span className="text-2xl">$</span>
                        {data?.data?.data || item?.Class?.price}
                      </Button>
                    </div>
                  </DialogContent>
                </aside>
              </section>
            </Dialog>
          </div>

          {currentTime.isBefore(startTime) ? (
            // Class is paid, not started
            <>
              <>
                {purchaseKey?.data?.isPurchase ? (
                  <div className="btn-primary !bg-orange-500/50 cursor-pointer flex justify-center py-2 mt-3">
                    <p> {onlineClassContent(selectedLanguage).NotYetStarted}</p>
                  </div>
                ) : (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="btn-primary hover:bg-primary/80 text-primary/80 hover:text-white font-semibold px-4 py-1.5 capitalize"
                    >
                      {onlineClassContent(selectedLanguage).Pay}
                      <span className="text-xl">$</span>
                      {item.Class.price}
                    </button>
                  </div>
                )}
              </>
            </>
          ) : currentTime.isAfter(endTime) ? (
            // Class is paid, time over
            <div className="flex justify-center items-center bg-red-500/50 py-2 md:px-0 px-3 text-sm mt-4 rounded-xl">
              <p className="text-white font-semibold">
                {onlineClassContent(selectedLanguage).NotAvailable}
              </p>
            </div>
          ) : (
            // User has purchased the class
            <>
              {purchaseKey?.data?.isPurchase ? (
                <div className="flex justify-center pt-4">
                  <Link
                    href={`/class/${item?.Class?._id}?courseId=${item?.Class?.courseId}`}
                  >
                    <button
                      id="joinButton"
                      disabled={!isJoinEnabled}
                      onClick={() => handleJoin()}
                      className={`btn-primary ${
                        isJoinEnabled
                          ? animateButton
                            ? "custom-animate-pulse"
                            : "bg-green-500/20 border hover:border-white"
                          : "bg-red-500/30 cursor-not-allowed"
                      } px-4 py-1.5 capitalize`}
                    >
                      {isJoinEnabled ? "Join now" : "Not Available"}
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center pt-4">
                  <button
                    id="joinButton"
                    disabled={!isJoinEnabled}
                    onClick={() => setOpenModal(true)}
                    className={`btn-primary ${
                      isJoinEnabled
                        ? animateButton
                          ? "custom-animate-pulse"
                          : "bg-green-500/20 border hover:border-white"
                        : "bg-red-500/30 cursor-not-allowed"
                    } px-4 py-1.5 capitalize`}
                  >
                    {isJoinEnabled ? "Join now" : "Not Available"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {currentTime.isBefore(startTime) ? (
            // Class is free, not started
            <div className="btn-primary !bg-orange-500/50 cursor-pointer flex justify-center py-2 mt-3">
              <p> {onlineClassContent(selectedLanguage).NotYetStarted}</p>
            </div>
          ) : currentTime.isAfter(endTime) ? (
            // Class is free, time over
            <div className="flex justify-center items-center bg-red-500/50 py-2  md:px-0 px-3 text-sm mt-4 rounded-xl">
              <p className="text-white font-semibold">
                {onlineClassContent(selectedLanguage).NotAvailable}
              </p>
            </div>
          ) : (
            // Class is free, started
            <div className="flex justify-center pt-4">
              <Link
                href={`/class/${item?.Class?._id}?courseId=${item?.Class?.courseId}`}
              >
                <button
                  id="joinButton"
                  disabled={!isJoinEnabled}
                  onClick={() => handleJoin()}
                  className={`btn-primary ${
                    isJoinEnabled
                      ? animateButton
                        ? "custom-animate-pulse"
                        : "bg-green-500/20 border hover:border-white"
                      : "bg-red-500/30 cursor-not-allowed"
                  } px-4 py-1.5 capitalize`}
                >
                  {isJoinEnabled ? "Join now (Free)" : "Not Available"}
                </button>
              </Link>
            </div>
          )}
        </>
      )}

      {/* Response modal */}
      <div>
        <Dialog
          open={openResModal}
          onClose={() => setOpenResModal(false)}
          fullWidth
          maxWidth="sm"
          className="overflow-hidden h-full"
          PaperProps={{
            style: {
              borderRadius: "1rem",
              // maxHeight: "70%", // Updated max height for better responsiveness
              // width: "80%", // Updated width for better responsiveness
            },
          }}
        >
          <section className="relative h-full">
            <span className="absolute top-2 right-2">
              <IconButton onClick={() => setOpenResModal(false)}>
                <Close fontSize="large" className="!text-red-600" />
              </IconButton>
            </span>
            <aside className="flex flex-col justify-center items-center p-5">
              <DialogTitle className="text-3xl font-bold text-gray-800 text-center">
                {onlineClassContent(selectedLanguage).Willjoinclass}
              </DialogTitle>
              <DialogContent className="p-8 w-full">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => {
                      setSelectValueType("Yes"),
                        setOpenResModal(false),
                        handleResposeOfClass("Yes");
                    }}
                    className="mt-4 bg-green-400 hover:bg-green-600 text-white font-semibold rounded-xl  mb-2 px-3 py-1 w-full sm:w-1/2 text-2xl sm:text-3xl"
                  >
                    {onlineClassContent(selectedLanguage).Interested}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectValueType("No"),
                        setOpenResModal(false),
                        handleResposeOfClass("No");
                    }}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl  mb-2 px-3 py-1 w-full sm:w-1/2 text-2xl sm:text-3xl"
                  >
                    {onlineClassContent(selectedLanguage).NotInterested}
                  </Button>
                </div>
              </DialogContent>
            </aside>
          </section>
        </Dialog>
      </div>

      <span className="absolute bottom-0 right-full border-t-[16px] border-t-primary/10 border-l-[16px] border-l-white rotate-90"></span>
    </article>
  );
};

export default OnlineClasses;
