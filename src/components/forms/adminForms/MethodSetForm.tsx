import { CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Drawer,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import { SuccessContent, adminPendingTutorContent } from "locale";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  data: any;
  mutate: () => void;
};

const MethodSetForm = ({ open, onClose, data, mutate }: Props) => {
  const { selectedLanguage } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState("PERCENTAGE");
  const [percentageValue, setPercentageValue] = useState<number>(
    data?.howMuch || 0
  );
  const [isLoading, setLoading] = useState(false);
  const [percentageError, setPercentageError] = useState("");

  const { mutation } = useMutation();

  useEffect(() => {
    if (data?.howMuch !== undefined) {
      setPercentageValue(data?.howMuch);
    }
  }, [data?.howMuch]);

  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };
  const handleSave = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        (selectedMethod === "PERCENTAGE" &&
          typeof percentageValue === "undefined") ||
        percentageValue < 0 ||
        isNaN(percentageValue)
      ) {
        setPercentageError("Please enter a percentage value.");
        setLoading(false);
        return;
      }

      let requestBody: {
        methods: string;
        howMuch?: number;
      } = {
        methods: selectedMethod,
        howMuch: percentageValue,
      };

      if (selectedMethod !== "PERCENTAGE") delete requestBody.howMuch;

      const res = await mutation(
        `super-admin/update-assigned-type?tutorId=${data?._id}`,
        {
          method: "PUT",
          body: requestBody,
        }
      );

      if (res?.status === 200) {
        Swal.fire({
          icon: "success",

          title: SuccessContent(selectedLanguage).Success,
          text: SuccessContent(selectedLanguage).Paymentmethodsavedsuccessfully,
        });
        onClose && onClose();
        mutate();
      } else {
        Swal.fire({
          icon: "error",
          title: SuccessContent(selectedLanguage).Error,
          text: SuccessContent(selectedLanguage).Failedtosavepaymentmethod,
        });
        onClose && onClose();
        mutate();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: SuccessContent(selectedLanguage).Error,
        text: SuccessContent(selectedLanguage)
          .Anerroroccurredwhilesavingthepaymentmethod,
      });
      onClose && onClose();
    } finally {
      mutate();
      setLoading(false);
    }
  };

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
              {adminPendingTutorContent(selectedLanguage).Method}
            </h1>
          </div>
        </div>
        <section className="mt-16">
          <FormControl className="mb-4" fullWidth>
            <label className="text-xl font-semibold text-primary">
              {adminPendingTutorContent(selectedLanguage).SelectMethod}
            </label>
            <Select
              value={selectedMethod}
              onChange={(e) => handleMethodChange(e.target.value)}
            >
              <MenuItem value="PERCENTAGE">PERCENTAGE</MenuItem>
              <MenuItem value="CONTRACT">CONTRACT</MenuItem>
            </Select>
          </FormControl>
          {selectedMethod === "PERCENTAGE" && (
            <div className="mb-4 mt-3">
              <label className="text-lg text-primary font-semibold">
                {adminPendingTutorContent(selectedLanguage).EnterPercentage}
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={percentageValue}
                  onChange={(e) =>
                    setPercentageValue(parseFloat(e.target.value))
                  }
                  className="p-2 border border-gray-300 rounded-md w-32"
                />
                <span className="ml-2 text-2xl font-medium">%</span>
              </div>
              {percentageError && (
                <p className="text-red-600 text-sm mt-1">{percentageError}</p>
              )}
            </div>
          )}
          <div className="mt-6">
            <Button
              onClick={handleSave}
              variant="contained"
              size="large"
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <CheckCircleOutlineOutlined />
                )
              }
              disabled={isLoading}
              style={{ backgroundColor: "green" }}
            >
              {isLoading
                ? adminPendingTutorContent(selectedLanguage).saving
                : adminPendingTutorContent(selectedLanguage).save}
            </Button>
          </div>
        </section>
      </Container>
    </Drawer>
  );
};

export default MethodSetForm;
