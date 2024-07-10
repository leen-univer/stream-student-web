import { Close, EditOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  CircularProgress,
  FormControl,
  TextField,
  Tooltip,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextInput } from "components/core";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { tutorAddCoursePage } from "locale";
import { useState } from "react";
import * as yup from "yup";

export default function UpdateBundleDialog({
  bundle,
  mutate,
}: {
  bundle: any;
  mutate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<any>(bundle?.thumbnailUrl);
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const { data } = useSWRAPI("contact/get-search");

  const handleClose = () => {
    setOpen(false);
  };

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
      key: "3",
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
      key: "4",
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
    {}
  );
  const validationSchema = inputSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const [currentCourses, setCurrentCourses] = useState<any>(
    bundle?.courses?.map((data: { _id?: string }) => data?._id) || []
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: bundle
      ? {
          bundleName: bundle?.name,
          bundleDescription: bundle?.description,
          mrpPrice: bundle?.mrpPrice,
          salePrice: bundle?.salePrice,
          thumbnail: bundle?.thumbnailUrl,
          courses: bundle?.courses?.map((course: any) => course?._id) || [],
        }
      : initialValues,
    validationSchema: yup.object(validationSchema),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData?.append("name", values?.bundleName);
      formData?.append("description", values?.bundleDescription);
      formData?.append("mrpPrice", values?.mrpPrice);
      formData?.append("salePrice", values?.salePrice);
      values?.thumbnail &&
        formData?.append("thumbnailImage", values?.thumbnail);
      if (values?.selectedCourseIds?.length > 0) {
        values.selectedCourseIds.forEach((item: string) => {
          formData.append("courses", item);
        });
      } else {
        // You can append a default value or perform any other logic
      }
      try {
        setLoading(true);
        let res = await mutation(`bundles/update/${bundle?._id}`, {
          method: "PUT",
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

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {tutorAddCoursePage(selectedLanguage).updateBundle}
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
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
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
                  <Autocomplete
                    multiple
                    id="select-courses-autocomplete"
                    options={data?.data?.data?.data}
                    getOptionLabel={(option) => option.courseName}
                    // value={formik.values.selectedCourses}
                    value={
                      data?.data?.data?.data?.filter((item: { _id?: string }) =>
                        currentCourses.includes(item?._id)
                      ) || []
                    }
                    onChange={(e, newValue) => {
                      const selectedCourseIds = newValue.map(
                        (course) => course._id
                      );
                      setCurrentCourses(selectedCourseIds);
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
                  value={image || bundle?.thumbnailUrl}
                  variant={"square"}
                  onChange={(e: any) => {
                    formik.setFieldValue("thumbnail", e?.target.files[0]);
                    setImage(e);
                  }}
                  width="100%"
                  height={175}
                  // variant="rounded"
                  allowedTypes=".jpg, .jpeg, .png, .gif, .webp"
                  className="bg-primary/30"
                />
              </div>
            </form>
            <div className="w-full flex gap-4 items-center justify-center mt-6">
              <button
                type="submit"
                onClick={() => formik.handleSubmit()}
                className={`bg-primary/90 w-[30%] py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                  formik.isSubmitting ? "opacity-50" : "opacity-100"
                }`}
                disabled={isLoading}
              >
                {loading ? (
                  <>
                    <CircularProgress
                      color="inherit"
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                    {tutorAddCoursePage(selectedLanguage).Updating}
                  </>
                ) : (
                  tutorAddCoursePage(selectedLanguage).updateBundle
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

      <Tooltip
        title={tutorAddCoursePage(selectedLanguage).editBundle}
        followCursor
        placement="top-start"
        arrow
      >
        <button
          onClick={handleClickOpen}
          className="w-8 h-8 grid place-items-center rounded-full border border-amber-500 bg-amber-500/10 text-amber-500"
        >
          <EditOutlined fontSize="small" />
        </button>
      </Tooltip>
    </>
  );
}
