import { Close } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import { useAppContext } from "contexts";
import { adminPendingTutorContent, tutorRevenueContent } from "locale";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  //   data: any;
  //   mutate: () => void;
};

const RevenueDetails = ({ open, onClose }: Props) => {
  const { selectedLanguage } = useAppContext();

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
          marginTop: "3vh",
        }}
      >
        <div className="w-full flex items-center">
          <div
            className="basis-[20%] cursor-pointer"
            onClick={() => onClose && onClose()}
          >
            <Close className="text-3xl" />
          </div>
          <div className="basis-[80%] text-center mr-20">
            <h1 className="text-3xl font-bold text-primary">
              {tutorRevenueContent(selectedLanguage).Revenue}
            </h1>
          </div>
        </div>
        <div className="w-4/5 mx-auto mt-8">
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl text-secondary font-semibold mb-6">
              Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">Date:</span>
                <span className="text-black font-semibold">2023-11-06</span>
              </div>
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">Total Sales:</span>
                <span className="text-black font-semibold">$5,000</span>
              </div>
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">SS%:</span>
                <span className="text-black font-semibold">10%</span>
              </div>
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">SS Amount:</span>
                <span className="text-black font-semibold">$500</span>
              </div>
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">Processed Payouts:</span>
                <span className="text-black font-semibold">$4,500</span>
              </div>
              <div className="flex flex-col text-lg">
                <span className="text-gray-600">My Due Balance:</span>
                <span className="text-black font-semibold">$300</span>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Drawer>
  );
};

export default RevenueDetails;
