import MaterialTable, { MTableToolbar } from "@material-table/core";
import { CourseStudentList } from "components/innerTable";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent, tutorCourseDetailContent } from "locale";
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

const CourseList = () => {
  const { data } = useSWRAPI("tutor-dashboard/course-wise-student");
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
                {tutorCourseDetailContent(selectedLanguage).CourseDetails}
              </p>
              <CSVLink
                filename="course-details.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: studentArrType) => {
                      return {
                        ...item,
                        courseName: item?.courseName,
                        purchaseUserCount: item?.purchaseUserCount,
                        price: item?.salePrice,
                        totalSale: item?.totalSale,
                        createdAt: dayjs(item?.createdAt).format(
                          "ddd, MMM D, YYYY h:mm A"
                        ),
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
              title: tutorCourseDetailContent(selectedLanguage).courseName,
              field: "courseName",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).studentCount,
              field: "purchaseUserCount",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.purchaseUserCount}
                </p>
              ),
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).Price,
              field: "salePrice",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.salePrice}
                </p>
              ),
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).totalSale,
              field: "totalSale",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.totalSale}
                </p>
              ),
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).createDate,
              field: "createdAt",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: studentArrType) => (
                <p>
                  {dayjs(rowData?.createdAt || "Date not available").format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              ),
            },
          ]}
          detailPanel={({ rowData }) => {
            return <CourseStudentList rowData={rowData as any} />;
          }}
          data={data?.data?.data?.data?.map(
            (item: studentArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              courseName: item?.courseName,
              purchaseUserCount: item?.purchaseUserCount,
              price: item?.salePrice,
              totalSale: item?.totalSale,
              createdAt: dayjs(item?.createdAt).format(
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
  { label: "Course Name", key: "courseName" },
  { label: "Total Students", key: "purchaseUserCount" },
  { label: "Created On", key: "createdAt" },
  { label: "Price($)", key: "price" },
  { label: "Total Sale($)", key: "totalSale" },
];

export default CourseList;
