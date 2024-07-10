import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CourseBarGraph({
  series,
  categories,
  colors,
  labels,
  title,
  barHeight,
}: {
  series?: any[];
  categories?: string[] | number[];
  colors?: string[];
  labels?: string[];
  title?: string;
  barHeight?: string | number;
}) {
  return (
    <div className="">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        {title}
      </h3>
      <div dir="ltr" className="w-full">
        <ApexCharts
          height={barHeight}
          // height={"380"}
          options={{
            chart: {
              type: "bar",
              height: 500,
              stacked: true,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                      fontSize: "13px",
                      fontWeight: 900,
                    },
                  },
                },
              },
            },
            stroke: {
              width: 1,
              colors: ["#fff"],
            },
            title: {
              text: "",
            },
            xaxis: {
              categories: categories,
              labels: {
                formatter: function (val) {
                  return val;
                },
              },
            },
            yaxis: {
              title: {
                text: undefined,
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "";
                },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetX: 40,
            },
            colors: colors || [],
            labels: labels || [],
          }}
          series={series}
          type={"bar"}
        />
      </div>
    </div>
  );
}
