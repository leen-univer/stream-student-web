import { East } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { formContent } from "locale";
import * as Yup from "yup";

import useMutation from "hooks/useMutataion";
import showError from "utils/error";

const FormSection = () => {
  const { selectedLanguage } = useAppContext();

  const { mutation, isLoading } = useMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      // subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(formContent(selectedLanguage).nameRequired)
        .min(3, formContent(selectedLanguage).minmum_3_letter),
      email: Yup.string()
        .required(formContent(selectedLanguage).emailRequired)
        .email(formContent(selectedLanguage).InvalidEmailAddress),
      // subject: Yup.string()
      //   .required("Subject Required.")
      //   .min(4, "Minimum 3 letter")
      //   .max(50, "Maximum 50 letter"),
      message: Yup.string()
        .required(formContent(selectedLanguage).MessageRequired)
        .min(15, formContent(selectedLanguage).Minimum_10_letter)
        .max(100, formContent(selectedLanguage).Maximum_250_letter),
    }),
    onSubmit: async (values, props: { resetForm: () => void }) => {
      try {
        const formData = new FormData();
        formData?.append("name", values?.name);
        formData?.append("email", values?.email);
        formData?.append("message", values?.message);
        const res = await mutation("contact/create-contact", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
      } catch (error) {
        showError(error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: error?.message ? error?.message : "Something went wrong",
        // });
      } finally {
        props.resetForm();
      }
    },
  });
  return (
    <article className="main-container py-20">
      <section className="flex lg:flex-row flex-col-reverse gap-8 py-12 rounded-md p-8">
        <aside className="w-full">
          <h1 className="pb-5 text-2xl font-semibold font-inter md:text-4xl">
            {formContent(selectedLanguage).GetIn}
            <span className="text-primary mx-2">{formContent(selectedLanguage).touch}</span>
          </h1>
          <p className="text-[#6D737A] text-[18px] mb-[30px]">{formContent(selectedLanguage).formSubTitle}</p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
            <div className="w-full">
              <p className="tracking-wider text-[16px] font-sans pb-2">
                {formContent(selectedLanguage).EnterYourName}
              </p>
              <TextField
                fullWidth
                required={true}
                placeholder={formContent(selectedLanguage).EnterName}
                type="text"
                name="name"
                className={`w-full`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{
                  classes: {
                    notchedOutline: "notchedOutline",
                    input: "input-field px-[20px]",
                  },
                }}
              />
            </div>
            <div className="w-full">
              <p className="tracking-wider text-[16px] font-sans pb-2">
                {" "}
                {formContent(selectedLanguage).EnterEmail}
              </p>
              <TextField
                fullWidth
                required={true}
                placeholder={formContent(selectedLanguage).EnterEmail}
                type="email"
                name="email"
                className={`w-full`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  classes: {
                    notchedOutline: "notchedOutline",
                    input: "input-field px-[20px]",
                  },
                }}
              />
            </div>
            {/* <div className="w-full">
              <p className="tracking-wider font-semibold pb-2">Enter Subject</p>
              <TextField
                fullWidth
                required={true}
                placeholder="Enter Subject"
                type="text"
                name="subject"
                className={`w-full`}
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                InputProps={{
                  classes: {
                    notchedOutline: "notchedOutline",
                    input: "input-field",
                  },
                }}
              />
            </div> */}
            <div className="w-full">
              <p className="tracking-wider text-[16px] font-sans pb-2">
                {formContent(selectedLanguage).Message}
              </p>
              <TextField
                fullWidth
                required={true}
                placeholder={formContent(selectedLanguage).WriteMessage}
                type="text"
                name="message"
                className="w-full"
                multiline={true}
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                InputProps={{
                  classes: {
                    notchedOutline: "notchedOutline",
                    input: "input-field ",
                  },
                }}
              />
            </div>

            <div className="flex justify-start mt-4">
              <LoadingButton
                type="submit"
                fullWidth
                disabled={formik.isSubmitting || !formik.isValid}
                loading={formik.isSubmitting}
                loadingPosition="end"
                // endIcon={
                //   <East className="group-hover:translate-x-3 common-transition" />
                // }
                className={`btn btn-primary w-[200px]`}
              >
                {formContent(selectedLanguage).SendMessage}
              </LoadingButton>
            </div>
          </form>
        </aside>
        <img className="xl:w-[670px] lg:w-[450px]" src="/Image/get-in-touch.png" alt="support" />
      </section>
    </article>
  );
};

export default FormSection;
