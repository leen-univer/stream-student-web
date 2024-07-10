import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Call, EmailOutlined, Visibility } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import TutorPayoutDetails from "components/forms/adminForms/TutorPayoutDetails";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminAcceptedTutorContent, dataContent } from "locale";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { TutorDataType } from "types/tutorCard";
import { MuiTblOptions } from "utils/MuiTblOptions";

const Payouts = () => {
  const [openMethodDrawer, setOpenMethodDrawer] = useState(false);
  const [singleTutorData, setSingleTutorData] = useState(null);
  const { selectedLanguage } = useAppContext();
  const { data, isValidating, mutate } = useSWRAPI(`payOut/admin-tutor-payout`);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Total Course Sale", key: "totalCourseSale" },
    { label: "Live Class Sale", key: "totalClassSale" },
    { label: "Total Sales", key: "total" },
    { label: "Methods", key: "methods" },
    { label: "Value", key: "howMuch" },
  ];

  const handleMethod = (rowData: any) => {
    setSingleTutorData(rowData);
    setOpenMethodDrawer(true);
  };

  return (
    <AdminPanelLayout title="Tutor Requests | StreamStudent">
      <section className="overflow-hidden overflow-x-scroll min-w-[45rem]">
        <div>
          <TutorPayoutDetails
            mutate={mutate}
            data={singleTutorData}
            open={openMethodDrawer}
            onClose={() => {
              setOpenMethodDrawer(false);
              setSingleTutorData(null);
            }}
          />
        </div>
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
              <p className="lg:text-2xl md:text-md text-md text-primary font-bold uppercase">
                {adminAcceptedTutorContent(selectedLanguage).payouts}
              </p>
              <CSVLink
                filename="payouts.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.name,
                        email: item?.email,
                        phoneNumber: item?.phoneNumber,
                        totalCourseSale: item?.totalCourseSale,
                        totalClassSale: item?.totalClassSale,
                        total: item?.total,
                        methods: item?.methods,
                        howMuch: item?.howMuch,
                      };
                    })) ||
                  []
                }
              >
                <button className="rounded-md bg-green-500 hover:bg-green-600 inline-block focus:outline-none text-white lg:text-lg text-md font-medium lg:px-4 px-2 py-1 common-transition">
                  {dataContent(selectedLanguage).DownloadCSV}
                </button>
              </CSVLink>
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

            filtering: true,
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
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowdata?.slNo}
                </p>
              ),
            },
            // {
            //   title: adminAcceptedTutorContent(selectedLanguage).Profile,
            //   field: "image",
            //   hideFilterIcon: true,
            //   filtering: false,
            //   render: (rowData: any) => (
            //     <Avatar
            //       src={rowData?.image}
            //       variant="square"
            //       sx={{ width: 50, height: 50, borderRadius: "1rem" }}
            //     />
            //   ),
            // },
            {
              title: adminAcceptedTutorContent(selectedLanguage).contactInfo,
              field: "name",
              render: (rowData: any) => (
                <div
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-primary">
                      {rowData?.name}
                    </span>
                    <a
                      href={`tel:${rowData?.phoneNumber}`}
                      className="text-gray-500"
                    >
                      <span className="text-blue-700">
                        <Call className="text-sm" /> :{" "}
                      </span>{" "}
                      <span className="hover:underline">
                        {rowData?.phoneNumber}
                      </span>
                    </a>
                    <a
                      href={`mailto:${rowData?.email}`}
                      className="text-secondary"
                    >
                      <span className="text-orange-500">
                        <EmailOutlined className="text-sm" /> :{" "}
                      </span>
                      <span className="hover:underline">{rowData?.email}</span>
                    </a>
                  </div>
                </div>
              ),

              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).salesinfo,
              field: "salesInfo",
              render: (rowData: any) => (
                <div
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-lg text-primary">
                      {adminAcceptedTutorContent(selectedLanguage).TotalSales}:{" "}
                      <span className="text-green-500">{rowData?.total}</span>
                    </span>
                    <span className="font-medium text-md text-gray-700">
                      {adminAcceptedTutorContent(selectedLanguage).courseSale}:{" "}
                      <span className="text-amber-500">
                        {rowData?.totalCourseSale}
                      </span>
                    </span>
                    <span className="font-medium text-md text-gray-700">
                      {
                        adminAcceptedTutorContent(selectedLanguage)
                          .LiveClassSales
                      }
                      :{" "}
                      <span className="text-blue-500">
                        {rowData?.totalClassSale}
                      </span>
                    </span>
                  </div>
                </div>
              ),
              hideFilterIcon: true,
              filtering: false,
            },
            // {
            //   title: adminAcceptedTutorContent(selectedLanguage).courseSale,
            //   field: "totalCourseSale",
            //   hideFilterIcon: true,
            //   filtering: false,
            // },
            // {
            //   title: adminAcceptedTutorContent(selectedLanguage).LiveClassSales,
            //   field: "totalClassSale",
            //   hideFilterIcon: true,
            //   filtering: false,
            // },
            // {
            //   title: adminAcceptedTutorContent(selectedLanguage).TotalSales,
            //   field: "total",
            //   hideFilterIcon: true,
            //   filtering: false,
            // },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Method,
              field: "methods",
              render: (rowData: any) => (
                <div
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <span
                    className={`mr-2
                    ${
                      rowData?.methods
                        ? "text-gray-800 font-semibold capitalize"
                        : "text-red-500"
                    }
                      
                  `}
                  >
                    {rowData?.methods || "Not Set"}
                  </span>
                  {rowData?.howMuch === 0 &&
                  rowData?.methods === "CONTRACT" ? null : rowData?.howMuch !==
                      undefined && rowData?.methods === "PERCENTAGE" ? (
                    <span className="text-green-700">{`${rowData?.howMuch}%`}</span>
                  ) : (
                    ""
                  )}
                </div>
              ),
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Action,
              field: "",
              filtering: false,
              hideFilterIcon: true,
              render: (row, refreshData: any) => (
                <>
                  {row?.methods === "contract" ? (
                    ""
                  ) : (
                    <div className="flex gap-5">
                      <Tooltip title="View Details">
                        <button onClick={() => handleMethod(row)}>
                          <Visibility className="text-blue-400" />{" "}
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </>
              ),
            },
          ]}
          data={data?.data?.data?.data?.map(
            (item: TutorDataType, i: number) => ({
              ...item,
              slNo: i + 1,
              name: item?.name,
              email: item?.email,
              phoneNumber: item?.phoneNumber,
              totalCourseSale: item?.totalCourseSale,
              totalClassSale: item?.totalClassSale,
              total: item?.total,
              methods: item?.methods,
              howMuch: item?.howMuch,
            })
          )}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default Payouts;
