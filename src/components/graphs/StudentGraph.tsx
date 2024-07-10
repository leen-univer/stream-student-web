import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AccountRadialBar({
  type,
  value,
  colors,
  height,
  valueSize,
}: {
  type: "radialBar";
  value: number;
  height: number;
  colors: string[];
  valueSize: string;
}) {
  return (
    <ApexCharts
      height={height}
      options={{
        chart: {
          height: 350,
          type: "radialBar",
          width: 80,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -100,
            endAngle: 260,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              //   show: true,
              name: {
                offsetY: -10,
                show: false,
                color: "#026668",
                fontSize: "17px",
              },
              value: {
                // formatter: function(val) {
                //   return parseInt(val);
                // },
                color: "#111",
                fontSize: valueSize,
                // fontSize: "36px",
                show: true,
              },
            },
          },
        },

        stroke: {
          lineCap: "round",
        },
        colors: colors,
        // colors: ["#5B50A1"],
      }}
      series={[value] || []}
      type={type}
    />
  );
}
