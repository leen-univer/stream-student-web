import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Call } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import IOSSwitch from "components/core/IOSSwitch";
import { StudentCourseList } from "components/innerTable";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminStudentDetailContent, dataContent, deleteContent } from "locale";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import { put } from "utils";
import { MuiTblOptions } from "utils/MuiTblOptions";

type studentArrType = {
  _id?: string;
  name?: string;
  email?: string;
  course?: string;
  country?: { label?: string };
  phone?: string;
  time?: string;
  date?: string;
  blockStatus?: string;
  createdAt?: string;
};

const StudentDetails = () => {
  const { data, isValidating, mutate } = useSWRAPI(
    "admin-dashboard/all-student"
  );

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Country", key: "country" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Date", key: "date" },
    { label: "Is Blocked", key: "isBlocked" },
  ];
  const handleBlock = async (rowData: any) => {
    Swal.fire({
      title: deleteContent(selectedLanguage).areyousure,
      text: `${
        rowData?.isBlocked === true
          ? deleteContent(selectedLanguage).Unblock
          : deleteContent(selectedLanguage).Block
      } ${deleteContent(selectedLanguage).thisstudent}`,
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
                rowData?.isBlocked === deleteContent(selectedLanguage).Block
                  ? deleteContent(selectedLanguage).Block
                  : deleteContent(selectedLanguage).Unblock,
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

  const { selectedLanguage } = useAppContext();
  return (
    <AdminPanelLayout title="Student List | StreamStudent">
      <section className="overflow-hidden overflow-x-scroll min-w-[45rem]">
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
            <div className="flex gap-2">
              <p className="md:text-2xl text-md text-primary md:font-bold font-semibold uppercase">
                {adminStudentDetailContent(selectedLanguage).StudentDetails}
              </p>
              <CSVLink
                filename="student-details.csv"
                headers={headers}
                data={
                  (data?.data?.allStudent?.data?.length &&
                    data?.data?.allStudent?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.name,
                        email: item?.email,
                        country: item?.country?.label,
                        phoneNumber: item?.phoneNumber,
                        createdAt: dayjs(item?.createdAt).format(
                          "ddd, MMM D, YYYY h:mm A"
                        ),
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
              height: "60px",
              whiteSpace: "nowrap",
              color: "white",
              top: 0,
              fontWeight: "bold",
              fontSize: "14px",
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
              title: adminStudentDetailContent(selectedLanguage).Name,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
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
                  </div>
                </div>
              ),
            },
            {
              title: adminStudentDetailContent(selectedLanguage).Email,
              field: "email",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <div
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  <Tooltip title={`${rowData?.email || "Not Given"}`}>
                    <p className="tracking-wide text-lg">
                      {String(rowData?.email).slice(0, 20)}
                      {String(rowData?.email)?.length > 20 ? "..." : null}
                    </p>
                  </Tooltip>
                </div>
              ),
            },
            {
              title: adminStudentDetailContent(selectedLanguage).Country,
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
              filtering: true,
            },

            // {
            //   title: adminStudentDetailContent(selectedLanguage).Time,
            //   field: "time",
            //   hideFilterIcon: true,
            //   filtering: true,
            // },
            {
              title: adminStudentDetailContent(selectedLanguage).Date,
              field: "createdAt",
              hideFilterIcon: true,
              filtering: true,
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
              title: adminStudentDetailContent(selectedLanguage).BlockUnblock,
              field: "isBlocked",
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
          ]}
          detailPanel={({ rowData }) => {
            return <StudentCourseList rowData={rowData} />;
          }}
          data={data?.data?.allStudent?.data?.map(
            (item: studentArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              createdAt: dayjs(item.createdAt).format("YYYY-MM-DD"),
              country: item?.country?.label,
            })
          )}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default StudentDetails;
