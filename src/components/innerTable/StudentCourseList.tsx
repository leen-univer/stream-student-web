import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import {
  adminCourseDetailContent,
  adminStudentDetailContent,
  dataContent,
} from "locale";
import { CSVLink } from "react-csv";
import { currencyFormatter } from "utils";
import { MuiTblOptions } from "utils/MuiTblOptions";
import ProgressStatus from "./ProgressStatus";

const StudentCourseList = ({ rowData }: any) => {
  const { selectedLanguage } = useAppContext();
  const headers = [
    { label: "Course Name", key: "courseName" },
    { label: "Sale Price", key: "salePrice" },
    { label: "Date", key: "createdAt" },
    { label: "Status", key: "courseStatus" },
  ];
  const userId = rowData?._id;

  return (
    <div className="m-auto px-4 py-4">
      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={
          <div className="flex gap-2">
            <p className="text-lg text-primary font-semibold uppercase ">
              {
                adminStudentDetailContent(selectedLanguage)
                  .AllCoursesPurchasedByTheStudent
              }
            </p>
            <CSVLink
              filename="purchased-course.csv"
              headers={headers}
              data={
                (rowData?.PurchaseCourse?.length &&
                  rowData?.PurchaseCourse?.map((item: any) => {
                    return {
                      ...item,
                      courseName: item?.Courses?.courseName,
                      salePrice: item?.Courses?.salePrice,
                      courseId: item?.Courses?._id,
                      createdAt: dayjs(item?.createdAt).format(
                        "ddd, MMM D, YYYY h:mm A"
                      ),
                      courseStatus:
                        item?.courseStatus?.status || "Not Completed Yet",
                    };
                  })) ||
                []
              }
            >
              <button className="rounded-md border bg-whatsapp text-xl text-white font-medium px-3">
                {dataContent(selectedLanguage).DownloadCSV}
              </button>
            </CSVLink>
          </div>
        }
        data={rowData?.PurchaseCourse?.map((item: any, i: number) => ({
          ...item,
          slNo: i + 1,
          CourseName: item?.Courses?.courseName,
          courseStatus: item?.courseStatus?.status || "Not Completed Yet",
          salePrice: item?.Courses?.salePrice,
          createdAt: dayjs(item?.createdAt).format("ddd, MMM D, YYYY h:mm A"),
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
            title: adminStudentDetailContent(selectedLanguage).courseName,
            field: "CourseName",
            searchable: true,
            render: (rowData: any) => (
              <p
                className={
                  selectedLanguage === "en" ? "text-left" : "text-right"
                }
              >
                {rowData?.Courses?.courseName}
              </p>
            ),
          },
          {
            title: adminStudentDetailContent(selectedLanguage).price,
            field: "salePrice",
            searchable: true,
            render: (rowData: any) => (
              <p
                className={
                  selectedLanguage === "en" ? "text-left" : "text-right"
                }
              >
                {currencyFormatter(rowData?.Courses?.salePrice as number)}
              </p>
            ),
            // render: (rowData: any) => rowData?.Courses?.salePrice,
          },
          {
            title: adminStudentDetailContent(selectedLanguage).Timestamp,
            field: "createdAt",
            editable: "never",
            render: ({ createdAt }) => (
              <p
                className={
                  selectedLanguage === "en" ? "text-left" : "text-right"
                }
              >
                {dayjs(new Date(createdAt)).format("ddd, MMM D, YYYY h:mm A")}
              </p>
            ),
          },
          {
            title: adminCourseDetailContent(selectedLanguage).status,
            searchable: true,
            render: (rowData: any) => (
              <p
                className={
                  selectedLanguage === "en" ? "text-left" : "text-right"
                }
              >
                <ProgressStatus
                  userId={userId}
                  courseId={rowData?.Courses?._id}
                />
              </p>
            ),
          },
        ]}
      />
    </div>
  );
};

export default StudentCourseList;
