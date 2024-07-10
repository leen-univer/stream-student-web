import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Visibility } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { AdminPanelLayout } from "layouts";
import { adminManageReviewContent } from "locale";
import Link from "next/link";
import { REVIEW_TYPE } from "types";
import { MuiTblOptions } from "utils/MuiTblOptions";
type reviewArrType = {
  Courses?: {
    courseName: string;
  };
  Tutor?: {
    name: string;
  };
  totalCount: number;
};

const ManageReviews = () => {
  const { selectedLanguage } = useAppContext();
  const { data: reviewData } = useSWRAPI("student/action-button-api");

  return (
    <AdminPanelLayout title="Manage Reviews | Stream student">
      <section className="">
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
            <p className="text-2xl text-primary font-bold uppercase ">
              {adminManageReviewContent(selectedLanguage).ManageReviews}
            </p>
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
              title: adminManageReviewContent(selectedLanguage).CourseName,
              field: "courseName",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: REVIEW_TYPE) => (
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
              title: adminManageReviewContent(selectedLanguage).TutorName,
              field: "tutorName",
              hideFilterIcon: true,
              filtering: false,
              render: (rowData: REVIEW_TYPE) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.Tutor?.name}
                </p>
              ),
            },
            {
              title: adminManageReviewContent(selectedLanguage).TotalReviews,
              field: "totalCount",
              hideFilterIcon: true,
              filtering: true,
              render: (rowData: any) => (
                <p
                  className={
                    selectedLanguage === "en" ? "text-left" : "text-right"
                  }
                >
                  {rowData?.totalCount}
                </p>
              ),
            },
            {
              title: adminManageReviewContent(selectedLanguage).Action,
              field: "",
              filtering: false,
              hideFilterIcon: true,
              render: (row: any) => (
                <div className="flex gap-5">
                  <Tooltip title="View All Reviews">
                    <Link href={`/admin/manage-reviews/${row?._id}`}>
                      <button>
                        <Visibility className="text-blue-500" />
                      </button>
                    </Link>
                  </Tooltip>
                </div>
              ),
            },
          ]}
          data={reviewData?.data?.data?.data?.map(
            (item: reviewArrType, i: number) => ({
              ...item,
              slNo: i + 1,
              courseName: item?.Courses?.courseName,
              tutorName: item?.Tutor?.name,
            })
          )}
        />
      </section>
    </AdminPanelLayout>
  );
};

export default ManageReviews;
