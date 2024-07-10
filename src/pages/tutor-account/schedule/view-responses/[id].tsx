import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { dataContent, tutorCourseDetailContent } from "locale";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import { studentArrType } from "types";
import { MuiTblOptions } from "utils/MuiTblOptions";

const Viewresponse = () => {
  const router = useRouter();
  const { data } = useSWRAPI(
    `studentResponse/class-wise-response?classId=${router.query.id}`
  );
  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout title="Class Wise Response  | StreamStudent">
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
                filename="responseList.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.[0]?.StudentResponse?.length &&
                    data?.data?.data?.data?.[0]?.StudentResponse?.map(
                      (item: any) => {
                        return {
                          ...item,
                          name: item?.User?.name,
                          email: item?.User?.email,
                          response:
                            item?.response === true
                              ? "Interested"
                              : "Not Interested" || "No Data Found",
                          createdAt: dayjs(item?.createdAt).format(
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
              title: tutorCourseDetailContent(selectedLanguage).createDate,
              field: "createdAt",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: any) => (
                <p>
                  {dayjs(rowData?.createdAt).format("ddd, MMM D, YYYY h:mm A")}
                </p>
              ),
            },
            {
              title: tutorCourseDetailContent(selectedLanguage).response,
              field: "response",
              searchable: true,
            },
          ]}
          data={data?.data?.data?.data?.[0]?.StudentResponse?.map(
            (item: any, i: number) => ({
              ...item,
              slNo: i + 1,
              name: item?.User?.name,
              email: item?.User?.email,
              response:
                item?.response === true
                  ? "Interested"
                  : "Not Interested" || "No Data Found",
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
  { label: "Student Name", key: "name" },
  { label: "Student Email", key: "email" },
  { label: "Student Response", key: "response" },
  { label: "Created Date", key: "createdAt" },
];

export default Viewresponse;
