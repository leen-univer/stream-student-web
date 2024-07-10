import { COUNTRIES } from "utils";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Fragment } from "react";

type Props = {
  countryDetails?: {
    code?: string | undefined;
    label?: string | undefined;
    phone?: string | undefined;
  };
  isDisabled?: boolean;
  setCountryDetails: React.Dispatch<React.SetStateAction<any>>;
};

const CountrySelector: React.FC<Props> = ({
  countryDetails,
  setCountryDetails,
  isDisabled = false,
}) => {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: "100%" }}
      options={COUNTRIES}
      autoHighlight
      onChange={(event: any, newValue: any) => {
        setCountryDetails(newValue);
      }}
      disabled={isDisabled}
      value={
        COUNTRIES.filter((item) => {
          return item.label === countryDetails?.label && item;
        })[0] as any
      }
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Fragment key={option.label}>
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="10"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label}
          </Box>
        </Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder="Country"
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
          }}
          // InputProps={{
          //   ...params.InputProps,
          //   startAdornment: (
          //     <>
          //       <img
          //         src={`https://flagcdn.com/w20/${countryDetails?.code?.toLowerCase()}.png`}
          //         alt=""
          //         className="pr-2"
          //       />
          //     </>
          //   ),
          // }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelector;
