import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Card, CardContent, Typography } from "@mui/material";
import RevenueDetails from "components/forms/tutorForms/ReveneuDetails";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useAuth, useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent, tutorRevenueContent } from "locale";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { TutorDataType } from "types/tutorCard";
import { MuiTblOptions } from "utils/MuiTblOptions";

const Revenue = () => {
  const { user } = useAuth();
  const { data } = useSWRAPI(`payOut/my-payOut`);

  const headers = [
    { label: "Total Sales", key: "totalSales" },
    { label: "SS%", key: "ssCommission" },
    { label: "SS Amount", key: "ssCommissionNumber" },
    { label: "Receiving Amount", key: "payingAmount" },
    { label: "My Due Balance", key: "reamingBalance" },
    { label: "Date", key: "createdAt" },
  ];
  const { selectedLanguage } = useAppContext();

  // const handleMethod = (rowData: any) => {
  //   setSingleTutorData(rowData);
  //   setOpenMethodDrawer(true);
  // };
  return (
    <TutorPanelLayout>
      {/* <div>
        <RevenueDetails
          //   mutate={mutate}
          //   data={singleTutorData}
          open={openMethodDrawer}
          onClose={() => {
            setOpenMethodDrawer(false);
            setSingleTutorData(null);
          }}
        />
      </div> */}
      <section className="overflow-hidden overflow-x-scroll">
        <div>
          {data?.data?.data && data?.data?.data?.methods === "CONTRACT" ? (
            <Card variant="outlined" style={{ border: "2px solid blue" }}>
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {tutorRevenueContent(selectedLanguage).ContractMode}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <aside className="overflow-hidden overflow-x-scroll">
              <div className="m-auto px-4 py-4 min-w-[45rem]">
                <MaterialTable
                  components={{
                    Toolbar: (props) => (
                      <div className="flex w-full items-center">
                        <MTableToolbar
                          {...props}
                          className="w-full min-h-[4rem] h-full"
                        />
                      </div>
                    ),
                  }}
                  isLoading={false}
                  title={
                    <div className="flex gap-6">
                      <p className="2xl:text-2xl text-xl text-primary font-bold uppercase ">
                        {tutorRevenueContent(selectedLanguage).Revenue}
                      </p>
                      {data?.data?.data?.payoutData &&
                        data?.data?.data?.payoutData?.length > 0 && (
                          <CSVLink
                            filename="my-payments.csv"
                            headers={headers}
                            data={data?.data?.data?.payoutData?.map(
                              (item: TutorDataType) => ({
                                totalSales: item?.totalSales,
                                ssCommissionNumber: item?.ssCommissionNumber,
                                ssCommission: item?.ssCommission,
                                reamingBalance: item?.reamingBalance,
                                payingAmount: item?.payingAmount,
                                createdAt: dayjs(item?.createdAt).format(
                                  "ddd, MMM D, YYYY h:mm A"
                                ),
                              })
                            )}
                          >
                            <button className="rounded-md border bg-whatsapp md:text-xl text-md py-1 text-white font-medium px-3">
                              {dataContent(selectedLanguage).DownloadCSV}
                            </button>
                          </CSVLink>
                        )}
                    </div>
                  }
                  options={{
                    ...(MuiTblOptions() as any),
                    headerStyle: {
                      position: "sticky",
                      zIndex: 1,
                      backgroundColor: "#0e0e66",
                      height: "70px",
                      whiteSpace: "nowrap",
                      color: "white",
                      top: 0,
                      fontWeight: "bold",
                      fontSize: "18px",
                    },

                    pageSize: 10,
                    selection: false,

                    filtering: false,
                  }}
                  style={{
                    ...(MuiTblOptions as any),
                  }}
                  columns={[
                    {
                      title: "#",
                      field: "slNo",
                      hideFilterIcon: true,
                      filtering: false,
                      width: "2%",
                      render: (rowdata: any) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          {rowdata?.slNo}
                        </p>
                      ),
                    },
                    {
                      title: tutorRevenueContent(selectedLanguage).TotalEarns,
                      field: "totalSales",
                      // cellStyle: {
                      //   textAlign: "center",
                      // },
                      // width: "10%",
                      render: (rowData: TutorDataType) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          <span className="text-xl">$</span>
                          {rowData?.totalSales}
                        </p>
                      ),
                      hideFilterIcon: true,
                      filtering: true,
                    },
                    {
                      title: tutorRevenueContent(selectedLanguage).ssCommission,
                      field: "ssCommission",
                      // render: (rowData: any) => (
                      // <>{data?.data?.data?.data[0]?.howMuch}</>
                      // ),
                      hideFilterIcon: true,
                      filtering: true,
                      render: (rowdata: any) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          {rowdata?.ssCommission}
                        </p>
                      ),
                    },
                    {
                      title: tutorRevenueContent(selectedLanguage).ssAmount,
                      field: "ssCommissionNumber",
                      hideFilterIcon: true,
                      filtering: true,
                      render: (rowData: TutorDataType) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          <span className="text-xl">$</span>
                          {rowData?.ssCommissionNumber}
                        </p>
                      ),
                    },
                    {
                      title:
                        tutorRevenueContent(selectedLanguage).ReceiveingAmount,
                      field: "payingAmount",
                      hideFilterIcon: true,
                      filtering: true,
                      render: (rowData: TutorDataType) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          <span className="text-xl">$</span>
                          {rowData?.payingAmount}
                        </p>
                      ),
                    },
                    {
                      title: tutorRevenueContent(selectedLanguage).MyDueBalance,
                      field: "reamingBalance",
                      render: (rowData: TutorDataType) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          <span className="text-xl">$</span>
                          {/* {rowData?.reamingBalance} */}
                          {(rowData?.reamingBalance || 0)?.toFixed(2)}
                        </p>
                      ),
                      hideFilterIcon: true,
                      filtering: false,
                    },
                    {
                      title: tutorRevenueContent(selectedLanguage).Date,
                      field: "createdAt",
                      hideFilterIcon: true,
                      filtering: true,
                      render: (rowData: TutorDataType) => (
                        <p
                          className={
                            selectedLanguage === "en"
                              ? "text-left"
                              : "text-right"
                          }
                        >
                          {dayjs(rowData?.createdAt).format(
                            "ddd, MMM D, YYYY h:mm A"
                          )}
                        </p>
                      ),
                    },
                  ]}
                  data={
                    data?.data?.data?.payoutData?.length &&
                    data?.data?.data?.payoutData?.map(
                      (item: TutorDataType, i: number) =>
                        ({
                          ...item,
                          slNo: i + 1,
                          totalSales: item?.totalSales,
                          ssCommissionNumber: item?.ssCommissionNumber,
                          ssCommission: item?.ssCommission,
                          reamingBalance: item?.reamingBalance,
                          payingAmount: item?.payingAmount,
                          createdAt: dayjs(item?.createdAt).format(
                            "ddd, MMM D, YYYY h:mm A"
                          ),
                        } || [])
                    )
                  }
                />
              </div>
            </aside>
          )}
        </div>
      </section>
    </TutorPanelLayout>
  );
};

export default Revenue;
