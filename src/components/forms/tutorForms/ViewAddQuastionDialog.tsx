import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add, Close } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { Checkbox, FormControl, FormHelperText, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import { useAppContext } from "contexts";
import { lectureSectionPage } from "locale";

export default function ViewAddQuestionDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [options, setOptions] = React.useState<string[]>([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createOption = (e: any) => {
    e.preventDefault();
    if (value && value !== " ") {
      options.push(value.trim());
      setValue("");
    }
  };

  const deleteOption = (id: number) => {
    setOptions(options.filter((option, index) => index !== id));
  };

  const formik = useFormik({
    initialValues: {
      mark: "",
      question: "",
    },

    validationSchema: yup.object({
      mark: yup
        .string()
        .required(`${lectureSectionPage(selectedLanguage).markSpan}`),
      question: yup
        .string()
        .required(`${lectureSectionPage(selectedLanguage).questionSpan}`),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData?.append("mark", values?.mark);
        formData?.append("question", values?.question);
        // formData?.append("description", values?.description);

        setLoading(false);
        // mutate?.()
        formik.resetForm();
        return;
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <React.Fragment>
      <Tooltip title="Add Question" followCursor placement="top-start" arrow>
        <button
          onClick={handleClickOpen}
          className="w-10 h-10 grid place-items-center rounded-full border border-green-500 bg-green-500/10 text-green-500"
        >
          <Add />
        </button>
      </Tooltip>

      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {lectureSectionPage(selectedLanguage).addQuestion}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form>
              <div className="h-40">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  {lectureSectionPage(selectedLanguage).question}
                  <span className="text-red-500">*</span>
                </label>

                <FormControl className="!w-full">
                  <ReactQuill
                    className="h-20"
                    value={formik?.values?.question}
                    onChange={(value) => {
                      formik?.setFieldValue("question", value);
                    }}
                    onBlur={() => {
                      formik.setFieldTouched("question", true);
                    }}
                  />
                  <FormHelperText className="!text-red-600">
                    {formik?.touched?.question &&
                      (formik?.errors?.question as any)}
                  </FormHelperText>
                </FormControl>
              </div>
              <label className="mt-3 mb-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).mark}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder={lectureSectionPage(selectedLanguage).markPlace}
                className={`bg-white text-lg block w-full rounded-md border-2 px-4 py-3 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full ${
                  formik.touched.mark && Boolean(formik.errors.mark)
                    ? "dark:border-red-600"
                    : "dark:border-gray-400"
                }`}
                name="mark"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mark}
              />

              <span className="text-base text-red-600">
                {formik.touched.mark && formik.errors.mark}
              </span>

              <label className="mt-3 mb-2 block text-xl font-semibold text-primary">
                {lectureSectionPage(selectedLanguage).options}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {options.map((option, index) => (
                  <OptionCont
                    key={index}
                    id={index}
                    value={option}
                    deleteOption={deleteOption}
                  />
                ))}
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder={
                      lectureSectionPage(selectedLanguage).optionsPlace
                    }
                    value={value}
                    onChange={(e: any) => setValue(e.target.value)}
                    className={`bg-white h-11 mr-3 text-lg block w-full rounded-md border-2 px-4 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full`}
                  />
                  <div className="flex items-center">
                    <button
                      className="bg-primary rounded-md px-4 py-2 font-bold text-white text-xl"
                      onClick={createOption}
                    >
                      {lectureSectionPage(selectedLanguage).add}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-10">
              <button className="bg-primary/90 w-[30%] py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md">
                {lectureSectionPage(selectedLanguage).addQuestionBtn}
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

type OPTION_TYPE = {
  value: string;
  id: number;
  deleteOption: (key: number) => void;
};
const OptionCont = ({ value, deleteOption, id }: OPTION_TYPE) => {
  const deleteOptionCont = (e: any) => {
    e.preventDefault();
    deleteOption(id);
  };
  return (
    <div className="flex items-center justify-center">
      <Checkbox
        color="success"
        sx={{ "& .MuiSvgIcon-root": { fontSize: 40 } }}
      />
      <input
        type="text"
        value={value}
        readOnly
        className={`bg-white h-11 mr-3 text-lg block w-full rounded-md border-2 px-4 text-gray-800 border-primary focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 lg:w-full `}
      />
      <div className="flex items-center">
        <button
          className="bg-red-500 rounded-md px-2 py-[0.4rem] font-bold text-white text-xl"
          onClick={deleteOptionCont}
        >
          remove
        </button>
      </div>
    </div>
  );
};
