import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TutorLineGraphProps {
  series?: any[];
  xaxisCategories?: string[] | number[];
  yaxisTitle?: string;
  xaxisTitle?: string;
  colors?: string[];
  labels?: string[];
  title?: string;
  height?: string | number;
}

const TutorLineGraph: React.FC<TutorLineGraphProps> = ({
  series,
  xaxisCategories,
  yaxisTitle,
  xaxisTitle,
  colors,
  labels,
  title,
  height,
}) => {
  return (
    <div dir="ltr" className=" bg-white p-6 rounded-md">
      <ApexCharts
        height={height}
        options={{
          title: {
            text: title,
            align: "left",
            style: {
              fontWeight: "700",
              fontSize: "16px",
              color: "black",
            },
          },
          chart: {
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  position: "top",
                  offsetX: -10,
                  offsetY: -14,
                },
              },
            },
          ],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },

          fill: {
            opacity: 1,
          },
          // legend: {
          //   position: "bottom",
          //   horizontalAlign: "center",
          //   floating: false,
          // },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: xaxisCategories,
            title: {
              text: xaxisTitle,
            },
          },
          yaxis: {
            title: {
              text: yaxisTitle,
            },
            min: 0,
            max: 60,
          },

          colors: colors,
        }}
        series={series}
        type={"line"}
      />
    </div>
  );
};

export default TutorLineGraph;
