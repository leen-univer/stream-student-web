import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Edit, Visibility } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import IOSSwitch from "components/core/IOSSwitch";
import MethodSetForm from "components/forms/adminForms/MethodSetForm";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminAcceptedTutorContent, dataContent, deleteContent } from "locale";
import Link from "next/link";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { TutorDataType } from "types/tutorCard";
import { put } from "utils";
import { MuiTblOptions } from "utils/MuiTblOptions";

const TutorRequests = () => {
  const [openMethodDrawer, setOpenMethodDrawer] = useState(false);
  const [singleTutorData, setSingleTutorData] = useState(null);
  const { selectedLanguage } = useAppContext();
  const { data, isValidating, mutate } = useSWRAPI(
    `admin-dashboard/all-active-tutor`
  );
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: deleteContent(selectedLanguage).areyousure,
      text: `${
        rowData?.isBlocked === true
          ? deleteContent(selectedLanguage).Unblock
          : deleteContent(selectedLanguage).Block
      } ${deleteContent(selectedLanguage).thistutor}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${
        rowData?.isBlocked === true
          ? deleteContent(selectedLanguage).Unblock
          : deleteContent(selectedLanguage).Block
      }`,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // setLoading(true);
        try {
          const response = await put({
            headers: {
              "Content-Type": "application/json",
            },
            path: `/super-admin/block-user/${rowData?._id}`,
            body: JSON.stringify({
              isBlocked:
                rowData?.isBlocked === "Blocked" ? "Blocked" : "Unblocked",
            }),
            token: "ACCESS_TOKEN",
          });
          mutate();
        } catch (error) {
        } finally {
        }
      }
    });
  };
  const headers = [
    { label: "Name", key: "name" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Expertise In Subject", key: "expertiseInSubject" },
    { label: "Methods", key: "methods" },
    { label: "Value", key: "howMuch" },
    { label: "Is Blocked", key: "isBlocked" },
  ];

  const handleMethod = (rowData: any) => {
    setSingleTutorData(rowData);
    setOpenMethodDrawer(true);
  };

  return (
    <AdminPanelLayout title="Tutor Requests | StreamStudent">
      <section className="overflow-hidden overflow-x-scroll min-w-[45rem]">
        <div>
          <MethodSetForm
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
            <div className="flex md:gap-6 gap-1">
              <p className="md:text-2xl text-md text-primary md:font-bold font-semibold uppercase">
                {adminAcceptedTutorContent(selectedLanguage).AcceptedTutors}
              </p>
              <CSVLink
                filename="accepted-tutors.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.name,
                        phoneNumber: item?.phoneNumber,
                        expertiseInSubject: item?.expertiseInSubject,
                        methods: item?.methods,
                        howMuch: item?.howMuch,
                        isBlocked: item?.isBlocked,
                      };
                    })) ||
                  []
                }
              >
                <button className="rounded-md bg-whatsapp focus:outline-none text-white md:text-lg text-sm md:font-medium font-normal md:px-4 px-2 py-1 common-transition">
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
            //   field: "profile",
            //   hideFilterIcon: true,
            //   filtering: false,
            //   render: (rowData: any) => (
            //     <Avatar
            //       src={rowData?.image}
            //       variant="square"
            //       sx={{ width: 60, height: 60, borderRadius: "1rem" }}
            //     />
            //   ),
            // },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Name,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.name || "Name not available"}
                </p>
              ),
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Phone,
              field: "phoneNumber",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.phoneNumber || "Phone Number not available"}
                </p>
              ),
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Subject,
              field: "expertiseInSubject",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.expertiseInSubject || "Subject not available"}
                </p>
              ),
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Method,
              field: "method",
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <span
                    className={`mr-2
                    ${
                      rowData?.methods
                        ? "text-gray-800 font-medium capitalize"
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
                </p>
              ),
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).BlockUnblock,
              field: "isBlocked",
              filtering: false,
              hideFilterIcon: true,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <IOSSwitch
                    checked={rowData?.isBlocked === true}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
                </p>
              ),
            },
            {
              title: adminAcceptedTutorContent(selectedLanguage).Action,
              field: "",
              filtering: false,
              hideFilterIcon: true,
              render: (row, refreshData: any) => (
                <div className="flex gap-5">
                  {/* <Tooltip title="Delete Tutor Profile">
                    <button>
                      <Delete className="text-red-500" />
                    </button>
                  </Tooltip> */}
                  <Tooltip
                    title={
                      adminAcceptedTutorContent(selectedLanguage)
                        .ViewTutorProfile
                    }
                  >
                    {/* linked to view tutor profile card */}
                    <Link href={`/admin/tutors/${row?._id}`}>
                      <button>
                        <Visibility className="text-blue-500" />
                      </button>
                    </Link>
                  </Tooltip>
                  <Tooltip
                    title={
                      adminAcceptedTutorContent(selectedLanguage)
                        .SetPaymentMethod
                    }
                  >
                    <button onClick={() => handleMethod(row)}>
                      <Edit className="text-amber-400" />{" "}
                    </button>
                  </Tooltip>
                </div>
              ),
            },
          ]}
          data={data?.data?.data?.data?.map(
            (item: TutorDataType, i: number) => ({
              ...item,
              slNo: i + 1,
              method: item?.methods + " " + item?.howMuch + " %",
            })
          )}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default TutorRequests;
