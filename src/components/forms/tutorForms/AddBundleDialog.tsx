import { Add, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { tutorAddCoursePage } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function AddCourseDialog({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<any>(null);
  const { selectedLanguage } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { mutation, isLoading } = useMutation();

  const { data } = useSWRAPI("contact/get-search");
  const inputSchema = [
    {
      key: "1",
      name: "bundleName",
      label: `${tutorAddCoursePage(selectedLanguage).bundleName} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).BundleNamePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).BundleNameSpan}`)
        .min(3, `${tutorAddCoursePage(selectedLanguage).Min3letter}`)
        .max(100, `${tutorAddCoursePage(selectedLanguage).Max100letter}`),
      type: "text",
      className: "col-span-12",
    },
    {
      key: "2",
      name: "bundleDescription",
      label: `${tutorAddCoursePage(selectedLanguage).bundleDescription} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).descriptionPlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).descriptionSpan}`)
        .min(10, `${tutorAddCoursePage(selectedLanguage).Min10letter}`)
        .max(100, `${tutorAddCoursePage(selectedLanguage).Max100letter}`),
      type: "text",
      multiline: true,
      rows: 2,
      className: "col-span-12",
    },
    {
      key: "5",
      name: "mrpPrice",
      label: `${tutorAddCoursePage(selectedLanguage).mrpPrice} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).mrpPricePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).mrpPriceSpan}`)
        .min(1, `${tutorAddCoursePage(selectedLanguage).Min1digit}`)
        // .max(100, "Maximum 100 digit numbers")
        .test(
          "non-negative",
          `${tutorAddCoursePage(selectedLanguage).ValuePositive}`,
          (value) => {
            return parseFloat(value) >= 0;
          }
        ),
      type: "number",
      className: "col-span-6",
    },
    {
      key: "6",
      name: "salePrice",
      label: `${tutorAddCoursePage(selectedLanguage).salePrice} `,
      required: true,
      placeholder: `${tutorAddCoursePage(selectedLanguage).salePricePlace}`,
      initialValue: "",
      validationSchema: yup
        .string()
        .required(`${tutorAddCoursePage(selectedLanguage).salePriceSpan}`)
        .min(1, `${tutorAddCoursePage(selectedLanguage).Min1digit}`)
        // .max(100, "Maximum 100 Numbers")
        .test(
          "non-negative",
          `${tutorAddCoursePage(selectedLanguage).ValuePositive}`,
          (value) => {
            return parseFloat(value) >= 0;
          }
        )
        .test(
          "less-than-or-equal-to-cost-price",
          `${tutorAddCoursePage(selectedLanguage).Salegreaterprice}`,
          function (value) {
            const mrpPrice = this.parent.mrpPrice;
            return parseFloat(value) <= parseFloat(mrpPrice);
          }
        ),
      type: "number",
      className: "col-span-6",
    },
  ];

  const initialValues = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    { selectedLanguages: [] }
  );
  const validationSchema = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const [thumbnailError, setThumbnailError] = useState("");
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setThumbnailError("");
      if (!values?.thumbnail) {
        setThumbnailError(
          `${tutorAddCoursePage(selectedLanguage).thumbnailreq}`
        );
        return;
      }
      let res;
      const formData = new FormData();
      formData?.append("name", values?.bundleName);
      formData?.append("description", values?.bundleDescription);
      formData?.append("mrpPrice", values?.mrpPrice);
      formData?.append("salePrice", values?.salePrice);
      formData?.append("thumbnailImage", values?.thumbnail);
      values.selectedCourseIds.forEach((item: string) => {
        formData.append("courses", item);
      });
      try {
        setLoading(true);
        res = await mutation("bundles/create-bundle", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        mutate();
        handleClose();
        setImage(null);
        formik.resetForm();
        setLoading(false);
      } catch (error) {}
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {tutorAddCoursePage(selectedLanguage).addBunlde}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form className="grid grid-cols-12 gap-6">
              {inputSchema?.map((items) => (
                <div
                  className={`text-xl font-semibold text-primary ${items?.className}`}
                  key={items.key}
                >
                  {items?.label}
                  {items?.required ? (
                    <span className="-ml-1 text-red-500">*</span>
                  ) : null}
                  <TextInput
                    key={items?.key}
                    name={items?.name}
                    placeholder={items?.placeholder}
                    type={items?.type as any}
                    value={formik?.values[items?.name]}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    // options={items?.options}
                    size="small"
                    multiline={items?.multiline}
                    rows={items?.rows}
                    fullWidth
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
                    )}
                    helperText={
                      formik?.touched[items?.name] &&
                      (formik?.errors[items?.name] as any)
                    }
                    // styleContact={items?.className}
                    styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                    styleField="w-full col-span-12 overflow-hidden"
                  />
                </div>
              ))}
              <div className="col-span-12">
                <label className="mb-2 block text-xl font-semibold text-primary">
                  {tutorAddCoursePage(selectedLanguage).selectCourses}
                  <span className="text-red-500">*</span>
                </label>
                <FormControl variant="outlined" fullWidth>
                  {/* <InputLabel>Select Courses</InputLabel> */}
                  <Autocomplete
                    multiple
                    id="select-courses-autocomplete"
                    options={data?.data?.data?.data}
                    getOptionLabel={(option) => option.courseName}
                    value={formik.values.selectedCourses}
                    onChange={(e, newValue) => {
                      const selectedCourseIds = newValue.map(
                        (course) => course._id
                      );
                      formik.setFieldValue("selectedCourses", newValue);
                      formik.setFieldValue(
                        "selectedCourseIds",
                        selectedCourseIds
                      );
                    }}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select Courses"
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <div key={index}>
                          <Chip
                            label={option.courseName}
                            {...getTagProps({ index })}
                          />
                        </div>
                      ))
                    }
                  />
                </FormControl>
              </div>
              <div className="col-span-12">
                <label className="mb-2 block text-xl font-semibold text-primary mt-3">
                  {tutorAddCoursePage(selectedLanguage).thumbnail}
                  <span className="text-red-500">*</span>
                </label>
                <FileUpload
                  // setValue={null}
                  allowedTypes=".jpg, .jpeg, .png, .gif, .webp"
                  variant={"square"}
                  value={image}
                  onChange={(e: any) => {
                    formik.setFieldValue("thumbnail", e?.target.files[0]);
                    setImage(e);
                  }}
                  width="100%"
                  height={175}
                  // variant="rounded"
                  className="bg-primary/30"
                />
                {thumbnailError && (
                  <p className="text-red-500">{thumbnailError}</p>
                )}
              </div>
            </form>
            <div className="w-full flex items-center justify-center mt-6">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                className={`bg-primary/90 w-[30%] py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
                disabled={formik.isSubmitting}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="inherit"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                    {tutorAddCoursePage(selectedLanguage).Adding}
                  </>
                ) : (
                  tutorAddCoursePage(selectedLanguage).addBunlde
                )}
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

      <div
        className="w-full h-full flex items-center justify-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <Add className="text-5xl text-primary" />
        <h1 className="text-3xl text-primary font-bold">
          {tutorAddCoursePage(selectedLanguage).addBunlde}
        </h1>
      </div>
    </>
  );
}
