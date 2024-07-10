import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminStudentDetailContent, dataContent } from "locale";
import { CSVLink } from "react-csv";
import { MuiTblOptions } from "utils/MuiTblOptions";

type tutorArrType = {
  _id: string;
  tutorName?: string;
  tutorEmail?: string;
  tutorCountry?: string;
  totalClasses?: number;
  totalFreeClasses?: number;
  totalPaidClasses?: number;
};

const TutorStatistics = () => {
  const { data } = useSWRAPI("admin-dashboard/get-tutor-class");

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
                filename="tutor-statistics.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: tutorArrType) => {
                      return {
                        ...item,
                        tutorName: item?.tutorName,
                        tutorEmail: item?.tutorEmail,
                        totalClasses: item?.totalClasses,
                        totalFreeClasses: item?.totalFreeClasses,
                        totalPaidClasses: item?.totalPaidClasses,
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
              field: "tutorName",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: tutorArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.tutorName}
                </p>
              ),
            },
            {
              title: adminStudentDetailContent(selectedLanguage).Email,
              field: "tutorEmail",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: tutorArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.tutorEmail}
                </p>
              ),
            },
            {
              title: adminStudentDetailContent(selectedLanguage).totalClasses,
              field: "totalClasses",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: tutorArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.totalClasses || 0}
                </p>
              ),
            },
            {
              title:
                adminStudentDetailContent(selectedLanguage).totalFreeClasses,
              field: "totalFreeClasses",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: tutorArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.totalFreeClasses || 0}
                </p>
              ),
            },
            {
              title:
                adminStudentDetailContent(selectedLanguage).totalPaidClasses,
              field: "totalPaidClasses",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: tutorArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.totalPaidClasses || 0}
                </p>
              ),
            },
          ]}
          data={data?.data?.data?.data.map((item: tutorArrType, i: number) => ({
            ...item,
            slNo: i + 1,
            tutorName: item?.tutorName,
            tutorEmail: item?.tutorEmail,
            totalClasses: item?.totalClasses,
            totalFreeClasses: item?.totalFreeClasses,
            totalPaidClasses: item?.totalPaidClasses,
          }))}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default TutorStatistics;

const headers = [
  { label: "Name", key: "tutorName" },
  { label: "Email", key: "tutorEmail" },
  { label: "Total Classes", key: "totalClasses" },
  { label: "Total Free Classes", key: "totalFreeClasses" },
  { label: "Total Paid Classes", key: "totalPaidClasses" },
];
