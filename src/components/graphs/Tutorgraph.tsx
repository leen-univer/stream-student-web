import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "radialBar";
  title?: string;
  radialSeries?: number[];
  radialLabel?: string[];
  className?: string;
  totalReturn?: number;
};

export default function HomeRadialBar({
  radialSeries,
  radialLabel,
  className = "",
  title,
  totalReturn,
}: Props) {
  return (
    <div className="rounded-xl bg-white">
      <ApexCharts
        height={"380"}
        series={radialSeries}
        options={{
          labels: radialLabel,

          title: {
            style: {
              fontWeight: "700",
              fontSize: "18px",
              color: "black",
              //   fontFamily: "Montserrat",
            },
            text: `${title}`,
          },

          chart: {
            height: 50,
            type: "radialBar",
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },

          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            height: 40,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,

            radius: 12,

            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          fill: {
            type: "gradient",
            pattern: {
              style: "",
            },
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "60%",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 1,
                  opacity: 0.5,
                },
              },
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function () {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return `${totalReturn}`;
                  },
                },
              },
            },
          },

          colors: ["#026668", "#000000", "#fba100"],
        }}
        type={"radialBar"}
      />
    </div>
  );
}
