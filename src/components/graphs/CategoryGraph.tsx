import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function CategoryColumnBarGraph({
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
    <div dir="ltr" className=" bg-white p-6 ">
      <ApexCharts
        height={barHeight}
        options={{
          title: {
            text: title,
            style: {
              fontWeight: "700",
              fontSize: "12px",
              color: "black",
            },
          },
          chart: {
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "normal",
            toolbar: {
              show: false,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "bottom",
                  offsetX: -10,
                  offsetY: 0,
                },
              },
            },
          ],
          xaxis: {
            type: "category",
            categories: categories,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              borderRadiusApplication: "end",
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "bottom",
            // offsetX: 0,
            // offsetY: 50,
          },

          colors: colors,
        }}
        series={series}
        type={"bar"}
      />
    </div>
  );
}
