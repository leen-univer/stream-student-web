import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { adminEarningGraphContent } from "locale";
import dynamic from "next/dynamic";
import { GRAPH_TYPE } from "types";
import { sliceSentence } from "utils/SliceSentence";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminEarningGraph({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line";
  text?: string;
}) {
  const { selectedLanguage } = useAppContext();
  const { data: mainData } = useSWRAPI("admin-dashboard/graph-data");
  const options = {
    series: [
      {
        name: adminEarningGraphContent(selectedLanguage).Tutors,
        type: "column",
        data:
          mainData?.data?.data?.data
            ?.slice(0, 12)
            ?.map((item: GRAPH_TYPE) => item?.tutorCount) || [],
      },
      {
        name: adminEarningGraphContent(selectedLanguage).Students,
        type: "column",
        data:
          mainData?.data?.data?.data
            ?.slice(0, 12)
            ?.map((item: GRAPH_TYPE) => item?.totalStudents) || [],
      },
      {
        name: adminEarningGraphContent(selectedLanguage).Earnings,
        type: "line",
        data:
          mainData?.data?.data?.data
            ?.slice(0, 12)
            ?.map((item: GRAPH_TYPE) => item?.totalEarnings) || [],
      },
    ],
  };
  return (
    <section dir="ltr">
      {mainData?.data?.data?.data?.length ? (
        <ApexCharts
          height={"450"}
          options={{
            chart: {
              height: 350,
              type: "line",
              stacked: false,
              toolbar: {
                show: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: [1, 1, 4],
            },
            title: {
              text: adminEarningGraphContent(selectedLanguage)
                .Top12TutorAndStudentReportWithEarnings,
              align: "left",
              offsetX: 110,
            },
            xaxis: {
              categories:
                mainData?.data?.data?.data
                  ?.slice(0, 12)
                  ?.map((item: GRAPH_TYPE) => item?.courseName) || [],
            },
            yaxis: [
              {
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "#0e0e66",
                },
                labels: {
                  style: {
                    colors: "#0e0e66",
                  },
                },
                title: {
                  text: adminEarningGraphContent(selectedLanguage)
                    .TotalNoOfTutors,
                  style: {
                    color: "#0e0e66",
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              {
                seriesName: "Total no. of students",
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "#00ADEC",
                },
                labels: {
                  style: {
                    colors: "#00ADEC",
                  },
                },
                title: {
                  text: adminEarningGraphContent(selectedLanguage)
                    .TotalNoOfStudents,
                  style: {
                    color: "#00ADEC",
                  },
                },
              },
              {
                seriesName: "Total earnings",
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: "#3b5998",
                },

                labels: {
                  style: {
                    colors: "#3b5998",
                  },
                },

                title: {
                  text: adminEarningGraphContent(selectedLanguage)
                    .TotalEarnings,
                  style: {
                    color: "#3b5998",
                  },
                },
              },
            ],
            colors: ["#0e0e66", "#00ADEC", "#3b5998"],

            tooltip: {
              // fixed: {
              //   enabled: true,
              //   position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              //   offsetY: 30,
              //   offsetX: 60,
              // },
            },
            legend: {
              horizontalAlign: "right",
              offsetX: 30,
              offsetY: 10,
            },
          }}
          series={options.series}
          type={type}
        />
      ) : (
        <div className="flex items-center justify-center h-[10rem]">
          <span className="font-semibold text-xl">NO DATA AVAILABLE</span>
        </div>
      )}
    </section>
  );
}
