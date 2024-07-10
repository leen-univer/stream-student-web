import { Close, Payment } from "@mui/icons-material";
import { Button, CircularProgress, Container, Drawer } from "@mui/material";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { adminAcceptedTutorContent, dataContent, payoutdata } from "locale";
import { useState } from "react";
import { CSVLink } from "react-csv";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  data: any;
  mutate: () => void;
};

const TutorPayoutDetails = ({ open, onClose, data, mutate }: Props) => {
  const { selectedLanguage } = useAppContext();
  const [payoutAmount, setPayoutAmount] = useState<number | null>(0);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { mutation } = useMutation();

  const { data: tutorPayouts, mutate: tutorPayoutsMutate } = useSWRAPI(
    `payOut/get-tutor-payOut?tutorId=${data?._id}`
  );

  const { data: tutorBalance, mutate: tutorBalanceMutate } = useSWRAPI(
    `payOut/tutor-total-balance?tutorId=${data?._id}`
  );

  const { data: tutorAllSales, mutate: tutorAllSalesMutate } = useSWRAPI(
    `payOut/tutor-total-sale-amount?tutorId=${data?._id}`
  );

  const handlePayout = async () => {
    try {
      setIsLoading(true);
      const res = await mutation(`payOut/create-payOut?tutorId=${data?._id}`, {
        method: "POST",
        body: {
          totalSalesAfterPayOut: tutorAllSales?.data?.data?.total,
          ssCommission: data?.howMuch,
          tutorPayOut: payoutAmount,
          // pay: true,
        },
      });

      if (res?.status === 200) {
        setPaymentMessage(payoutdata(selectedLanguage).PayoutSuccessful);
        tutorPayoutsMutate();
        tutorBalanceMutate();
        tutorAllSalesMutate();

        setTimeout(() => {
          setPayoutAmount(null);
          setPaymentMessage("");
        }, 4000);
      } else {
        setPaymentMessage(payoutdata(selectedLanguage).PayoutFailed);
      }
      setIsLoading(false);
    } catch (error) {
      setPaymentMessage(payoutdata(selectedLanguage).error);
    }
  };

  const filteredData =
    tutorPayouts?.data?.data?.data[0]?.data?.filter((item: any) => {
      const formattedDate = dayjs(item?.createdAt)
        .format("ddd, MMM D, YYYY h:mm A")
        .toLowerCase();
      return formattedDate.includes(searchQuery.toLowerCase());
    }) || [];

  const ssAmount = (tutorAllSales?.data?.data?.total * data?.howMuch) / 100;
  const displaySsAmount = isNaN(ssAmount) ? 0 : ssAmount;
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "lg",
          marginTop: "1vh",
        }}
      >
        {/* its close btn  and heading */}
        <div className="flex items-center p-5">
          <div
            className="basis-[20%] cursor-pointer"
            onClick={() => onClose && onClose()}
          >
            <Close className="text-3xl" />
          </div>
          <div className="basis-[80%] text-center mr-20">
            <h1 className="text-3xl font-bold text-primary">
              {adminAcceptedTutorContent(selectedLanguage).Details}
            </h1>
          </div>
        </div>

        {/* details Sections */}
        <section className="border border-blue-300 p-7 rounded-lg text-xl">
          <div className="mb-4 text-green-600 font-semibold">
            <span className="text-blue-600/80 te font-semibold">
              {payoutdata(selectedLanguage).TotalSales}:
            </span>{" "}
            <span className="text-2xl">$</span>
            {tutorAllSales?.data?.data?.total}{" "}
            <span className="text-lg text-gray-500 font-medium">
              ({payoutdata(selectedLanguage).FromLastPayout})
            </span>
          </div>
          <div className="mb-4 text-yellow-800 font-semibold ">
            <span className="text-blue-600/80 font-semibold">
              {payoutdata(selectedLanguage).SS}:{" "}
            </span>{" "}
            {data?.howMuch}
          </div>
          <div className="mb-4  text-yellow-800 font-semibold">
            <span className="text-blue-600/80 font-semibold">
              {payoutdata(selectedLanguage).SSAmount}:{" "}
            </span>{" "}
            <span className="text-2xl">$</span>
            {displaySsAmount}
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-blue-600/80 font-semibold">
                {payoutdata(selectedLanguage).TutorPayout}:
              </span>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="number"
                className="flex-1 mr-2 p-2 rounded border border-blue-400"
                placeholder="Enter payout amount"
                value={payoutAmount === null ? "" : payoutAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  const parsedValue = parseFloat(value);

                  if (
                    !isNaN(parsedValue) &&
                    parsedValue >= 0 &&
                    parsedValue <= tutorAllSales?.data?.data?.total
                  ) {
                    setPayoutAmount(parsedValue);
                  } else {
                    setPayoutAmount(null);
                  }
                }}
              />
              <button
                className={`rounded px-4 py-2  ${
                  tutorAllSales?.data?.data === 0
                    ? "bg-red-500/20 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700 text-white cursor-pointer"
                }`}
                onClick={handlePayout}
                disabled={Boolean(tutorAllSales?.data?.data === 0)}
              >
                {isLoading ? (
                  <div className="flex flex-row items-center gap-1">
                    <CircularProgress size={24} color="inherit" />
                    <span className="text-white">
                      {" "}
                      {payoutdata(selectedLanguage).paying}
                    </span>
                  </div>
                ) : (
                  <span> {payoutdata(selectedLanguage).pay}</span>
                )}
              </button>
            </div>
            {paymentMessage && (
              <div
                className={
                  paymentMessage?.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {paymentMessage}
              </div>
            )}
          </div>
          {/* <div className="font-semibold text-gray-600">
            <span className="text-gray-800/80 font-semibold">
              {payoutdata(selectedLanguage).TutorTotalPending}:
            </span>{" "}
            <span className="text-orange-600">
              <span className="text-2xl">$</span>
              {tutorPayouts?.data?.data?.data[0]?.totalRemainingBalance || 0}
            </span>
          </div> */}
          <div className="font-semibold text-gray-600">
            <span className="text-gray-800/80 font-semibold">
              {payoutdata(selectedLanguage).TutorTotalBalance}:
            </span>{" "}
            <span className="text-teal-600">
              <span className="text-2xl">$</span>
              {tutorBalance?.data?.data}
            </span>
          </div>
        </section>

        {/* all Payout List  */}
        <div className="m-4 mt-10 min-w-full overflow-x-scroll">
          {/* csv and heading */}
          <div className="flex flex-row gap-5 mb-7">
            <h2 className="text-2xl font-semibold text-darkblue-600">
              {payoutdata(selectedLanguage).PayoutList}
            </h2>
            <CSVLink
              filename={`${data?.name} payout-list.csv`}
              headers={[
                { label: "Sl No.", key: "slNo" },
                { label: "Amount", key: "amount" },
                { label: "SS %", key: "ss" },
                { label: "Remaining Balance", key: "reamingBalance" },
                { label: "Date", key: "date" },
              ]}
              data={filteredData?.map(
                (item: any, index: any) =>
                  ({
                    ...item,
                    slNo: `${index + 1}`,
                    amount: `$${item?.payingAmount}`,
                    ss: `${item?.ssCommission}`,
                    reamingBalance: `$${item?.reamingBalance}`,
                    date: dayjs(item?.createdAt).format(
                      "ddd, MMM D, YYYY h:mm A"
                    ),
                  } || [])
              )}
            >
              <button className="rounded-md bg-green-500 hover:bg-green-600 focus:outline-none text-white text-md font-medium px-4 py-1 common-transition">
                {dataContent(selectedLanguage).DownloadCSV}
              </button>
            </CSVLink>
          </div>

          {/* search input  */}
          {/* <div className="mb-4 w-full px-4">
            <input
              type="text"
              placeholder="Search by Date (e.g. MM DD, YYYY)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-blue-400 p-2 rounded w-full"
            />
          </div> */}

          {/* all list */}
          {filteredData?.length === 0 ? (
            <p className="text-2xl text-gray-600 font-semibold text-center my-12">
              {payoutdata(selectedLanguage).Nopayout}
            </p>
          ) : (
            <div className="flex flex-col divide-y min-w-[20rem] overflow-x-auto bg-slate-100/60 rounded-lg p-2">
              <div className="grid-cols-10 grid py-3 text-xl font-semibold text-gray-900 rounded-lg">
                <h3 className="col-span-1">
                  {payoutdata(selectedLanguage).Slno}
                </h3>
                <h3 className="col-span-2 ">
                  {payoutdata(selectedLanguage).Amount}
                </h3>
                <h3 className="col-span-2">
                  {payoutdata(selectedLanguage).SS}
                </h3>
                <h3 className="col-span-2">
                  {payoutdata(selectedLanguage).Remainbalance}
                </h3>
                <h3 className="col-span-3">
                  {payoutdata(selectedLanguage).Date}
                </h3>
              </div>

              {filteredData?.map((item: any, index: number) => {
                const bgColor = index % 2 === 0 ? "bg-gray-100" : "";
                return (
                  <div
                    key={index}
                    className={`grid-cols-10 grid py-2 ${bgColor}`}
                  >
                    <div className="col-span-1">{index + 1}</div>
                    <div className=" text-red-950 col-span-2">
                      <span className="text-xl font-medium">$</span>
                      {item?.payingAmount}
                    </div>
                    <div className="text-blue-950 col-span-2">
                      {item?.ssCommission} %
                    </div>
                    <div className=" text-green-950 col-span-2">
                      <span className="text-xl font-medium">$</span>
                      {(item?.reamingBalance || 0)?.toFixed(2)}
                    </div>
                    <div className="col-span-3 text-gray-600">
                      {dayjs(item?.createdAt).format("ddd, MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </Drawer>
  );
};

export default TutorPayoutDetails;
