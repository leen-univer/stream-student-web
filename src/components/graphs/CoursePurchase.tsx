import { CART } from "assets/animations";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { tutorMainDashboard } from "locale";
import dynamic from "next/dynamic";
import { GRAPH_TYPE } from "types";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DonutDealsDashboard({ type }: any) {
  const { selectedLanguage } = useAppContext();
  const { data: topCoursesData } = useSWRAPI(
    "tutor-dashboard/top-purchased-course"
  );
  const options = {
    series:
      topCoursesData?.data?.data?.data
        ?.slice(0, 3)
        ?.map((item: GRAPH_TYPE) => item?.count) || [],
  };

  return (
    <div className="p-3">
      <h2 className="text-black font-semibold pl-5">
        {tutorMainDashboard(selectedLanguage).top3PurchasedCourse}
      </h2>
      {topCoursesData?.data?.data?.data?.length ? (
        <ApexCharts
          height={"380"}
          options={{
            chart: {
              type: "donut",
              height: 850,
              width: "100%",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "50%",
                },
              },
            },

            labels:
              topCoursesData?.data?.data?.data
                ?.slice(0, 3)
                ?.map((item: GRAPH_TYPE) => item?._id) || [],

            colors: ["#0e0e66", "#00ADEC", "#3b5998"],
          }}
          series={options.series}
          type={type}
        />
      ) : (
        <div className="flex items-center justify-center h-[10rem]">
          <span className="font-semibold text-xl">
            {tutorMainDashboard(selectedLanguage).nocoursesoldyet}
          </span>
        </div>
      )}
    </div>
  );
}
