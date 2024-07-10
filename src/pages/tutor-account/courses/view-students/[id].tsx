import MaterialTable, { MTableToolbar } from "@material-table/core";
import { CourseStudentList } from "components/innerTable";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent, tutorCourseDetailContent } from "locale";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import { studentArrType } from "types";
import { MuiTblOptions } from "utils/MuiTblOptions";

const Viewstudents = () => {
  const router = useRouter();
  const { data } = useSWRAPI(
    `tutor-dashboard/particular-course-wise-student?courseId=${router.query.id}`
  );
  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout title="Coursewise Student | StreamStudent">
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
                {tutorCourseDetailContent(selectedLanguage).studentList}
              </p>
              <CSVLink
                filename="studentList.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data[0]?.userData?.length &&
                    data?.data?.data?.data[0]?.userData?.map(
                      (item: studentArrType) => {
                        return {
                          ...item,
                          name: item?.name,
                          email: item?.email,
                          courseStatus:
                            item?.courseStatus || "Not Completed Yet",
                          purchaseDate: dayjs(item?.purchaseDate).format(
                            "ddd, MMM D, YYYY h:mm A"
                          ),
                        };
                      }
                    )) ||
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
              title: tutorCourseDetailContent(selectedLanguage).Name,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).Email,
              field: "email",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).purchaseDate,
              field: "purchaseDate",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: studentArrType) => (
                <p>
                  {dayjs(rowData?.purchaseDate || "Date not available").format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              ),
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).status,
              field: "courseStatus",
              searchable: true,
            },
          ]}
          data={data?.data?.data?.data[0]?.userData?.map(
            (item: studentArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              name: item?.name,
              email: item?.email,
              courseStatus: item?.courseStatus || "Not Completed Yet",
              purchaseDate: dayjs(item?.purchaseDate).format(
                "ddd, MMM D, YYYY h:mm A"
              ),
            })
          )}
        />
      </section>
    </TutorPanelLayout>
  );
};
const headers = [
  { label: "Student Name", key: "name" },
  { label: "Student Email", key: "email" },
  { label: "Purchase Date", key: "purchaseDate" },
  { label: "Status", key: "courseStatus" },
];

export default Viewstudents;
