import MaterialTable, { MTableToolbar } from "@material-table/core";
import { StudentList } from "components/innerTable";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminCourseDetailContent, tutorCourseDetailContent } from "locale";
import { CSVLink } from "react-csv";
import { MuiTblOptions } from "utils/MuiTblOptions";

export type studentArrType = {
  _id?: string;
  courseName?: string;
  tutorName?: { name?: string };
  purchaseUserCount?: number;
  salePrice?: number;
  createdAt?: string;
  email?: string;
  id?: string;
  name?: string;
  purchaseDate?: string;
  courseStatus?: string;
};

const CourseDetails = () => {
  const { data } = useSWRAPI("admin-dashboard/each-course-student");
  console.log(data);

  const headers = [
    { label: "Course Name", key: "courseName" },
    { label: "Tutor Name", key: "tutorName" },
    { label: "Total Students", key: "purchaseUserCount" },
    { label: "Created On", key: "createdAt" },
    { label: "Price", key: "price" },
    { label: "Total Sale($)", key: "totalSales" },
  ];

  const { selectedLanguage } = useAppContext();
  return (
    <AdminPanelLayout title="Coursewise Student | StreamStudent">
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
              <p className="text-2xl text-primary font-bold uppercase ">
                {adminCourseDetailContent(selectedLanguage).CourseDetails}
              </p>
              <CSVLink
                filename="course-details.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        courseName: item?.courseName,
                        tutorName: item?.tutorName?.name,
                        purchaseUserCount: item?.purchaseUserCount,
                        price: item?.salePrice,
                        totalSales: item?.totalSales,
                        createdAt: dayjs(item?.createdAt).format(
                          "ddd, MMM D, YYYY h:mm A"
                        ),
                      };
                    })) ||
                  []
                }
              >
                <button className="rounded-md border bg-whatsapp text-xl text-white font-medium px-3">
                  Download CSV
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
              title: adminCourseDetailContent(selectedLanguage).courseName,
              field: "courseName",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminCourseDetailContent(selectedLanguage).tutorName,
              field: "tutorName",
              hideFilterIcon: true,
              filtering: false,
            },
            {
              title: adminCourseDetailContent(selectedLanguage).studentCount,
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
              title: adminCourseDetailContent(selectedLanguage).Price,
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
              field: "totalSales",
              hideFilterIcon: true,
              filtering: true,
              render: (rowdata: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-center"
                  }
                >
                  {rowdata?.totalSales}
                </p>
              ),
            },
            {
              title: adminCourseDetailContent(selectedLanguage).createDate,
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
            return <StudentList rowData={rowData} />;
          }}
          data={data?.data?.data?.data?.map((item: any, i: number) => ({
            ...item,
            slNo: i + 1,
            courseName: item?.courseName,
            tutorName: item?.tutorName?.name,
            purchaseUserCount: item?.purchaseUserCount,
            price: item?.salePrice,
            totalSales: item?.totalSales,
            createdAt: dayjs(item?.createdAt).format("ddd, MMM D, YYYY h:mm A"),
          }))}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default CourseDetails;
