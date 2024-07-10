import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useAppContext } from "contexts";
import { tutorsContent } from "locale";
import { useEffect, useRef, useState } from "react";

export default function RangeSlider({
  value,
  setValue,
}: {
  value: number[];
  setValue: (priceRange: number[]) => void;
}) {
  const { selectedLanguage } = useAppContext();
  const [valueState, setValueState] = useState<number[]>(value);
  const rangeChangeTimeout = useRef<any>();
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueState(newValue as number[]);
    clearTimeout(rangeChangeTimeout.current);
    rangeChangeTimeout.current = setTimeout(() => {
      setValue(newValue as number[]);
    }, 500);
  };
  useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={valueState}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={50000}
        className="!text-primary"
      />
      <div>
        <p className="flex items-center">
          {tutorsContent(selectedLanguage).PriceRange}
          <span className="ml-1 flex h-6 w-16 items-center justify-center border border-gray-200">
            {value[0]}
          </span>
          <span className="mx-3">-</span> ₹
          <span className="ml-1 flex h-6 w-16 items-center justify-center border border-gray-200">
            {value[1]}
          </span>
        </p>
      </div>
    </Box>
  );
}
