import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useAppContext } from "contexts";
import { tutorCourseDashboard, tutorMainDashboard } from "locale";
import { GRAPH_TYPE } from "types";
import { useSWRAPI } from "hooks";

export default function DonutDashboard({ type }: any) {
  const { data: topCoursesData } = useSWRAPI(
    "tutor-dashboard/top-purchased-course"
  );
  const { selectedLanguage } = useAppContext();
  const options = {
    series:
      topCoursesData?.data?.data?.data
        ?.slice(0, 5)
        ?.map((item: GRAPH_TYPE) => item?.count) || [],
  };

  return (
    <>
      <div className="p-3 rounded-xl bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <h2 className="text-black font-semibold pl-5">
          {tutorCourseDashboard(selectedLanguage).courseStatus}
        </h2>
        {topCoursesData?.data?.data?.data?.length ? (
          <div dir="ltr">
            <ApexCharts
              height={"400"}
              options={{
                chart: {
                  type: "donut",
                  height: 880,
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
                    ?.slice(0, 5)
                    ?.map((item: GRAPH_TYPE) => item?._id) || [],

                colors: ["#0e0e66", "#00ADEC", "#200F41", "#42eff5", "#3b5998"],
              }}
              series={options.series}
              type={type}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[10rem]">
            <span className="font-semibold text-xl">
              {tutorMainDashboard(selectedLanguage).nocoursesoldyet}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
