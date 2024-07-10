import MaterialTable, { MTableToolbar } from "@material-table/core";
import { CourseStudentList } from "components/innerTable";
import TutorStudentCourseList from "components/innerTable/TutorStudentCourseList";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import {
  dataContent,
  tutorCourseDetailContent,
  tutorStudentDetailContent,
} from "locale";
import { CSVLink } from "react-csv";
import { studentArrType } from "types";
import { MuiTblOptions } from "utils/MuiTblOptions";

interface Props {
  name?: string;
  email?: string;
  courseStatus?: string;
  purchaseDate?: string;
}
[];

const Student = () => {
  const { data } = useSWRAPI("tutor-dashboard/student-wise-course");
  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout title="StudentWise Courselist | StreamStudent">
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
                {tutorStudentDetailContent(selectedLanguage).StudentDetails}
              </p>
              <CSVLink
                filename="student-details.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        userName: item?.userDetails?.userName,
                        userEmail: item?.userDetails?.userEmail,
                        userPhoneNumber: item?.userDetails?.userPhoneNumber,
                        userCountry: item?.userDetails?.userCountry,
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
              title: tutorStudentDetailContent(selectedLanguage).Name,
              field: "userName",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: tutorStudentDetailContent(selectedLanguage).Email,
              field: "userEmail",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.userEmail}
                </p>
              ),
            },
            {
              title: tutorStudentDetailContent(selectedLanguage).Phone,
              field: "userPhoneNumber",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.userPhoneNumber}
                </p>
              ),
            },
            {
              title: tutorStudentDetailContent(selectedLanguage).Country,
              field: "userCountry",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.userCountry}
                </p>
              ),
            },
          ]}
          detailPanel={({ rowData }) => {
            return <TutorStudentCourseList rowData={rowData as any} />;
          }}
          data={data?.data?.data?.data?.map((item: any, i: number) => ({
            ...item,
            slNo: i + 1,
            userName: item?.userDetails?.userName,
            userEmail: item?.userDetails?.userEmail,
            userPhoneNumber: item?.userDetails?.userPhoneNumber,
            userCountry: item?.userDetails?.userCountry,
          }))}
        />
      </section>
    </TutorPanelLayout>
  );
};
const headers = [
  { label: "Name", key: "userName" },
  { label: "Email", key: "userEmail" },
  { label: "Phone Number", key: "userPhoneNumber" },
  { label: "Country", key: "userCountry" },
];

export default Student;
