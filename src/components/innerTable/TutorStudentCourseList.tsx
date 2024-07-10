import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import {
  dataContent,
  tutorCourseDetailContent,
  tutorStudentDetailContent,
} from "locale";
import { CSVLink } from "react-csv";
import { studentArrType } from "types";
import { MuiTblOptions } from "utils/MuiTblOptions";
import ProgressStatus from "./ProgressStatus";

// interface Props {
//   rowData?: {
//     userData?: {
//       name?: string;
//       email?: string;
//       courseStatus?: string;
//       purchaseDate?: string;
//     }[];
//   };
// }

const TutorStudentCourseList = ({ rowData }: any) => {
  const { selectedLanguage } = useAppContext();

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
              {tutorCourseDetailContent(selectedLanguage).CourseDetails}
            </p>
            <CSVLink
              filename="course-list.csv"
              headers={headers}
              data={
                (rowData?.purchases &&
                  rowData?.purchases?.length > 0 &&
                  rowData?.purchases?.map((item: any) => {
                    return {
                      ...item,
                      courseName: item?.courseName
                        ? item?.courseName
                        : "Name not available",
                      coursePrice: item?.coursePrice,
                      transactionDate: dayjs(item?.transactionDate).format(
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
        data={
          rowData?.purchases?.map((item: any, i: any) => ({
            ...item,
            slNo: i + 1,
            courseName: item?.courseName
              ? item?.courseName
              : "Name not available",
            coursePrice: item?.coursePrice,
            transactionDate: dayjs(item?.transactionDate).format(
              "ddd, MMM D, YYYY h:mm A"
            ),
          })) || []
        }
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
            title: tutorStudentDetailContent(selectedLanguage).courseName,
            field: "courseName",
            searchable: true,
          },
          {
            title: tutorStudentDetailContent(selectedLanguage).Price,
            field: "coursePrice",
            searchable: true,
          },
          {
            title: tutorCourseDetailContent(selectedLanguage).purchaseDate,
            field: "transactionDate",
            editable: "never",
            render: (rowData: any) => (
              <p>
                {dayjs(rowData?.transactionDate || "Date not available").format(
                  "ddd, MMM D, YYYY h:mm A"
                )}
              </p>
            ),
          },
        ]}
      />
    </div>
  );
};

const headers = [
  { label: "Course Name", key: "courseName" },
  { label: "Course Price", key: "coursePrice" },
  { label: "Purchase Date", key: "transactionDate" },
];

export default TutorStudentCourseList;
