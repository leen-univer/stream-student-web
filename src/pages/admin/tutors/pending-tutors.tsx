import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Edit, Visibility } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import IOSSwitch from "components/core/IOSSwitch";
import MethodSetForm from "components/forms/adminForms/MethodSetForm";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { AdminPanelLayout } from "layouts";
import { adminPendingTutorContent, dataContent, deleteContent } from "locale";
import Link from "next/link";
import { useState } from "react";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { put } from "utils";
import { MuiTblOptions } from "utils/MuiTblOptions";

type adminTutorArrType = {
  _id: string;
  name: string;
  image: string;
  email: string;
  expertise: string;
  experience: string;
  time: string;
  country: string;
  date: string;
  counts: number;
  tag: string;
  status: string;
  phone: number;
};

const TutorRequests = () => {
  const [openMethodDrawer, setOpenMethodDrawer] = useState(false);
  const [singleTutorData, setSingleTutorData] = useState(null);
  const { selectedLanguage } = useAppContext();
  const {
    data: PendingTutors,
    isValidating,
    mutate,
  } = useSWRAPI("admin-dashboard/all-pending-tutor");

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Expertise", key: "expertiseInSubject" },
    { label: "Experience", key: "yearOfExperience" },
    { label: "Country", key: "country" },
    { label: "Date", key: "createdAt" },
    { label: "Status", key: "status" },
    { label: "Methods", key: "methods" },
    { label: "Value", key: "howMuch" },
  ];
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: deleteContent(selectedLanguage).areyousure,
      text: `${
        rowData?.status === "INACTIVE"
          ? deleteContent(selectedLanguage).Active
          : deleteContent(selectedLanguage).inactive
      } ${deleteContent(selectedLanguage).thistutor}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${
        rowData?.status === "INACTIVE"
          ? deleteContent(selectedLanguage).Active
          : deleteContent(selectedLanguage).inactive
      }`,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await put({
            headers: {
              "Content-Type": "application/json",
            },
            path: `/super-admin/active-tutor/${rowData?._id}`,
            body: JSON.stringify({
              status: rowData?.status === "INACTIVE" ? "ACTIVE" : "INACTIVE",
            }),
          });

          mutate();
          if (response?.status !== 200)
            throw new Error(response?.error?.message);
          Swal.fire({
            text: `${response?.success?.message}`,
            icon: "success",
          });
        } catch (error: any) {
          Swal.fire({
            text: `${error}`,
            icon: "error",
            // iconColor: "#d9117b",
          });
        } finally {
          mutate();
        }
      }
    });
  };

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
            <div className="flex gap-6">
              <p className="md:text-2xl text-md text-primary md:font-bold font-semibold uppercase">
                {adminPendingTutorContent(selectedLanguage).PendingRequests}
              </p>
              <CSVLink
                filename="pending-tutors.csv"
                headers={headers}
                data={
                  (PendingTutors?.data?.data?.data?.length &&
                    PendingTutors?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.name,
                        email: item?.email,
                        phoneNumber: item?.phoneNumber,
                        expertiseInSubject: item?.expertiseInSubject,
                        yearOfExperience: item?.yearOfExperience,
                        country: item?.country?.label,
                        methods: item?.methods,
                        howMuch: item?.howMuch,
                        createdAt: dayjs(item?.createdAt).format(
                          "ddd, MMM D, YYYY h:mm A"
                        ),
                        status: item?.status,
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
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowdata?.slNo}
                </p>
              ),
            },
            {
              title: adminPendingTutorContent(selectedLanguage).Profile,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <div
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <div className="flex gap-2">
                    <Avatar
                      src={rowData?.image}
                      variant="square"
                      sx={{ width: 50, height: 50, borderRadius: "1rem" }}
                    />
                    <div>
                      <p>{rowData?.name}</p>
                      <p>{rowData?.email}</p>
                      <p>{rowData?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              ),
            },
            // {
            //   title: adminPendingTutorContent(selectedLanguage).Expertise,
            //   field: "expertiseInSubject",
            //   hideFilterIcon: true,
            //   filtering: true,
            // },
            // {
            //   title: adminPendingTutorContent(selectedLanguage).Experience,
            //   field: "yearOfExperience",
            //   hideFilterIcon: true,
            //   filtering: false,
            // },
            {
              title: adminPendingTutorContent(selectedLanguage).country,
              field: "country",
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.country}
                </p>
              ),
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminPendingTutorContent(selectedLanguage).Method,
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
              title: adminPendingTutorContent(selectedLanguage).Date,
              field: "createdAt",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {dayjs(rowData?.createdAt || "In time not available").format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              ),
            },
            {
              title: adminPendingTutorContent(selectedLanguage).AcceptReject,
              field: "status",
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <IOSSwitch
                    checked={rowData?.status !== "INACTIVE"}
                    onChange={() => {
                      handleBlock(rowData);
                    }}
                  />
                </p>
              ),
            },

            {
              title: adminPendingTutorContent(selectedLanguage).Action,
              field: "",
              filtering: false,
              hideFilterIcon: true,

              render: (row, refreshData: any) => (
                <div className="flex gap-4">
                  <Tooltip title="View Details">
                    <Link href={`/admin/tutors/${row?._id}`}>
                      <button>
                        <Visibility className="text-blue-500" />
                      </button>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Set Payment Method">
                    <button onClick={() => handleMethod(row)}>
                      <Edit className="text-amber-400" />{" "}
                    </button>
                  </Tooltip>
                </div>
              ),
            },
          ]}
          data={
            PendingTutors?.data?.data?.data?.length
              ? PendingTutors?.data?.data?.data?.map(
                  (item: any, i: number) => ({
                    ...item,
                    slNo: i + 1,
                    name: item?.name,
                    email: item?.email,
                    phoneNumber: item?.phoneNumber,
                    expertiseInSubject: item?.expertiseInSubject,
                    yearOfExperience: item?.yearOfExperience,
                    country: item?.country?.label,
                    methods: item?.methods,
                    howMuch: item?.howMuch,
                    createdAt: dayjs(item?.createdAt).format(
                      "ddd, MMM D, YYYY h:mm A"
                    ),
                    status: item?.status,
                  })
                )
              : []
          }
        />
      </section>
    </AdminPanelLayout>
  );
};

export default TutorRequests;
