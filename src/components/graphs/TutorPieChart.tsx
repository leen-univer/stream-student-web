import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Props = {
  pieLabel: string[];
  pieSeries: number[];
  title: string;
  className?: string;
};
const TutorPieChart = ({ pieLabel, pieSeries, title, className }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h3 className="font-semibold w-full text-center tracking-wide text-black text-lg">
        {title}
      </h3>
      <div dir="ltr">
        <ReactApexChart
          type="pie"
          height={"320"}
          // width={100%}
          series={pieSeries}
          options={{
            chart: {
              width: 380,
              type: "pie",
            },
            legend: {
              position: "bottom",
            },
            colors: [
              "#000000",
              "#0e0e66",
              "#B1AEAE",
              "#303151",
              "#7C7661",
              "#00ADEC",
              "#19F3ED",
            ],
            labels: pieLabel,
            responsive: [
              {
                breakpoint: 1500,
                options: {
                  chart: {
                    width: 350,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1200,
                options: {
                  chart: {
                    width: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 450,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default TutorPieChart;
