import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { adminCourseDetailContent, dataContent } from "locale";
import { CSVLink } from "react-csv";
import { MuiTblOptions } from "utils/MuiTblOptions";
import { studentArrType } from "pages/admin/courses/course-details";
import ProgressStatus from "./ProgressStatus";

const StudentList = ({ rowData }: any) => {
  const { selectedLanguage } = useAppContext();
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Purchase Date", key: "purchaseDate" },
    { label: "Status", key: "courseStatus" },
  ];

  const courseId = rowData?._id;
  return (
    <div className="m-auto px-4 py-4">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={
          <div className="flex gap-2">
            <p className="text-lg text-primary font-semibold uppercase ">
              {adminCourseDetailContent(selectedLanguage).studentList}
            </p>
            <CSVLink
              filename="student-list.csv"
              headers={headers}
              data={
                (rowData?.userData?.length &&
                  rowData?.userData?.map((item: studentArrType) => {
                    return {
                      ...item,
                      name: item?.name,
                      email: item?.email,
                      courseStatus: item?.courseStatus || "Not Completed Yet",
                      purchaseDate: dayjs(item?.purchaseDate).format(
                        "ddd, MMM D, YYYY h:mm A"
                      ),
                    };
                  })) ||
                []
              }
            >
              <button className="rounded-md border bg-whatsapp text-lg text-white font-medium px-3">
                {dataContent(selectedLanguage).DownloadCSV}
              </button>
            </CSVLink>
          </div>
        }
        data={rowData?.userData?.map((item: studentArrType, i: number) => ({
          ...item,
          slNo: i + 1,
          name: item?.name ? item?.name : "Name not available",
          email: item?.email,
          courseStatus: item?.courseStatus || "Not Completed Yet",
          purchaseDate: dayjs(item?.purchaseDate).format(
            "ddd, MMM D, YYYY h:mm A"
          ),
        }))}
        options={{
          ...(MuiTblOptions() as any),
          headerStyle: {
            position: "sticky",
            zIndex: 1,
            backgroundColor: "#00ADEC",
            height: "70px",
            whiteSpace: "nowrap",
            color: "white",
            top: 0,
            fontWeight: "bold",
            fontSize: "18px",
          },
          draggable: false,
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
            editable: "never",
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
            title: adminCourseDetailContent(selectedLanguage).Name,
            field: "name",
            searchable: true,
          },
          {
            title: adminCourseDetailContent(selectedLanguage).Email,
            field: "email",
            searchable: true,
            render: (rowData: studentArrType) =>
              rowData?.email || "Email not available",
          },
          {
            title: adminCourseDetailContent(selectedLanguage).purchaseDate,
            field: "purchaseDate",
            editable: "never",
            render: (rowData: studentArrType) => (
              <p>
                {dayjs(rowData?.purchaseDate || "Date not available").format(
                  "ddd, MMM D, YYYY h:mm A"
                )}
              </p>
            ),
          },
          {
            title: adminCourseDetailContent(selectedLanguage).status,
            field: "courseStatus",
            searchable: true,
            render: (rowData: studentArrType) => (
              <ProgressStatus userId={rowData?.id} courseId={courseId} />
            ),
          },
        ]}
      />
    </div>
  );
};

export default StudentList;
