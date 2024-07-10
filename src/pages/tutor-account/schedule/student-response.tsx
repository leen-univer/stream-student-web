import MaterialTable, { MTableToolbar } from "@material-table/core";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { MuiTblOptions } from "utils/MuiTblOptions";
import { CSVLink } from "react-csv";
import {
  dataContent,
  studentResponse,
  tutorStudentDetailContent,
} from "locale";

type studentArrType = {
  _id: string;
  User?: {
    name?: string;
    email?: string;
    phoneNumber?: number;
  };
  classTitle?: string;
  StudentResponse?: { createdAt?: string; response?: string };
};

const StudentResponse = () => {
  const { data } = useSWRAPI("studentResponse/response-outPut");

  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout>
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
                filename="student-response.csv"
                headers={headers}
                data={
                  (data?.data?.data?.data?.length &&
                    data?.data?.data?.data?.map((item: any) => {
                      return {
                        ...item,
                        name: item?.User?.name,
                        email: item?.User?.email,
                        classTitle: item?.classTitle,
                        // phoneNumber: item?.User?.phoneNumber,
                        response: item?.StudentResponse?.response
                          ? "Yes"
                          : "No",
                        createdAt: dayjs(
                          item?.StudentResponse?.createdAt
                        ).format("ddd, MMM D, YYYY h:mm A"),
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
              title: studentResponse(selectedLanguage).StudentName,
              field: "name",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.User?.name}
                </p>
              ),
            },
            {
              title: studentResponse(selectedLanguage).email,
              field: "email",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.User?.email}
                </p>
              ),
            },
            // {
            //   title: studentResponse(selectedLanguage).phone,
            //   field: "phoneNumber",
            //   hideFilterIcon: true,
            //   filtering: false,
            //   render: (rowData: studentArrType) => (
            //     <p>{rowData?.User?.phoneNumber}</p>
            //   ),
            // },
            {
              title: studentResponse(selectedLanguage).classTitle,
              field: "classTitle",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.classTitle}
                </p>
              ),
            },
            {
              title: studentResponse(selectedLanguage).Response,
              field: "response",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.response}
                </p>
              ),
            },
            {
              title: tutorStudentDetailContent(selectedLanguage).Date,
              field: "createdAt",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: studentArrType) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {dayjs(rowData?.StudentResponse?.createdAt).format(
                    "ddd, MMM D, YYYY h:mm A"
                  )}
                </p>
              ),
            },
          ]}
          data={data?.data?.data?.data.map(
            (item: studentArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              name: item?.User?.name,
              email: item?.User?.email,
              classTitle: item?.classTitle,
              // phoneNumber: item?.User?.phoneNumber,
              response: item?.StudentResponse?.response ? "Yes" : "No",
              createdAt: dayjs(item?.StudentResponse?.createdAt).format(
                "ddd, MMM D, YYYY h:mm A"
              ),
            })
          )}
        />
      </section>
    </TutorPanelLayout>
  );
};

export default StudentResponse;

const headers = [
  { label: "Name", key: "name" },
  { label: "Email", key: "email" },
  // { label: "Phone Number", key: "phoneNumber" },
  { label: "Class Title", key: "classTitle" },
  { label: "Response", key: "response" },
  { label: "Date", key: "createdAt" },
];
