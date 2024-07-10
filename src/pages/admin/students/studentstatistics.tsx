import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminStudentDetailContent, dataContent } from "locale";
import { CSVLink } from "react-csv";
import { MuiTblOptions } from "utils/MuiTblOptions";

type studentArrType = {
  _id: string;
  name?: string;
  email?: string;
  timeOfIn?: string;
  timeOfOut?: string;
  interval?: string;
};

const StudentStatistics = () => {
  const { data } = useSWRAPI("screenTime/get-interval");
  const { selectedLanguage } = useAppContext();
  return (
    <AdminPanelLayout>
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
                {adminStudentDetailContent(selectedLanguage).statistics}
              </p>
              <CSVLink
                filename="student-statistics.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.name,
                        email: item?.email,
                        timeOfIn: dayjs(item?.timeOfIn).format(
                          "ddd, MMM D, YYYY h:mm A"
                        ),
                        // timeOfOut: dayjs(item?.timeOfOut).format(
                        //   "ddd, MMM D, YYYY h:mm A"
                        // ),
                        interval: item?.interval,
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
              title: adminStudentDetailContent(selectedLanguage).Name,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: studentArrType) => (
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
              title: adminStudentDetailContent(selectedLanguage).Email,
              field: "email",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.email || "Email not available"}
                </p>
              ),
            },
            {
              title: adminStudentDetailContent(selectedLanguage).inTime,
              field: "timeOfIn",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {dayjs(rowData?.timeOfIn || "In time not available").format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              ),
            },
            // {
            //   title: adminStudentDetailContent(selectedLanguage).outTime,
            //   field: "",
            //   hideFilterIcon: true,
            //   filtering: true,
            //   render: (rowData: studentArrType) => (
            //     <p>
            //       {dayjs(rowData?.timeOfOut || "Out time not available").format(
            //         "ddd, MMM D, YYYY h:mm A"
            //       )}
            //     </p>
            //   ),
            // },
            {
              title: adminStudentDetailContent(selectedLanguage).averageTime,
              field: "interval",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.interval
                    ? rowData?.interval
                    : "No information available"}
                </p>
              ),
            },
          ]}
          data={data?.data?.data?.data.map(
            (item: studentArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              name: item?.name,
              email: item?.email,
              timeOfIn: dayjs(
                item?.timeOfIn || "Out time not available"
              ).format("ddd, MMM D, YYYY h:mm A"),

              // timeOfOut: item?.timeOfOut,
              interval: item?.interval,
            })
          )}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default StudentStatistics;

const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  { label: "Last Login", key: "timeOfIn" },
  // { label: "Time of Exit", key: "timeOfOut" },
  { label: "Average Time on website", key: "interval" },
];
