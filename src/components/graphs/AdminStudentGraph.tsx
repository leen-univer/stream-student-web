import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { adminStudentGraphContent } from "locale";
import dynamic from "next/dynamic";
import { GRAPH_TYPE } from "types";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminStudentGraph({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line";
  text?: string;
}) {
  const { selectedLanguage } = useAppContext();
  const { data: allStudentData } = useSWRAPI(
    "admin-dashboard/category-wise-student"
  );

  const options = {
    series: [
      {
        name: adminStudentGraphContent(selectedLanguage).TotalStudents,
        type: "column",
        data:
          allStudentData?.data?.data
            ?.slice(0, 10)
            ?.map((item: GRAPH_TYPE) => item?.totalCount) || [],
      },
      {
        name: adminStudentGraphContent(selectedLanguage).LastMonthAddedStudents,
        type: "column",
        data:
          allStudentData?.data?.data
            ?.slice(0, 10)
            ?.map((item: GRAPH_TYPE) => item?.lastMonthCount) || [],
      },
    ],
  };
  return (
    <div dir="ltr">
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
            enabled: true,
          },
          stroke: {
            width: [1, 1, 4],
          },
          title: {
            text: adminStudentGraphContent(selectedLanguage).StudentReport,
            align: "left",
            offsetX: 110,
          },
          xaxis: {
            categories:
              allStudentData?.data?.data
                ?.slice(0, 10)
                ?.map((item: GRAPH_TYPE) => {
                  return (
                    item?.categoryName?.slice(0, 8) +
                    `${
                      item?.categoryName?.length &&
                      item?.categoryName?.length > 8
                        ? "..."
                        : ""
                    }`
                  );
                }) || [],
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
                text: adminStudentGraphContent(selectedLanguage).TotalStudents,
                style: {
                  color: "#0e0e66",
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            {
              seriesName: "Last month added students",
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
                text: adminStudentGraphContent(selectedLanguage)
                  .LastMonthAddedStudents,
                style: {
                  color: "#00ADEC",
                },
              },
            },
          ],
          colors: ["#0e0e66", "#00ADEC", "#3b5998"],

          tooltip: {},
          legend: {
            horizontalAlign: "left",
            offsetX: 40,
          },
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
