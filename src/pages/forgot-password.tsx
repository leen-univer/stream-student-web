import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ResetPassword } from "components";
import { useFormik } from "formik";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import showError from "utils/error";
import * as Yup from "yup";
import { PublicLayout } from "layouts";
import { Email } from "@mui/icons-material";
import { useAppContext } from "contexts";
import { forgetPasswordContent, loginContent } from "locale";

import useMutation from "hooks/useMutataion";

const ForgotPassword = () => {
  const { selectedLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const { mutation, isLoading } = useMutation();
  const [role, setRole] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };
  const [storeToken, setStoreToken] = useState("");

  //? initial value & validation set
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(forgetPasswordContent(selectedLanguage).validEmail)
      .required(forgetPasswordContent(selectedLanguage).emailRequired),
  });

  //? HandleSubmit function()
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      // return;
      try {
        const formData = new FormData();
        formData?.append("email", values?.email);
        formData?.append("role", role);
        const res = await mutation("auth/forget-password-otp-send", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });

        if (res?.status == 200) {
          setStoreToken(res?.results?.success?.data?.token);
          Swal.fire({
            icon: "success",
            title: "OTP sent successfully",
            text: "Kindly check your email for OTP",
            didClose: () => {
              setIsOpen(true);
            },
          });
        }
      } catch (error) {
        showError(error);
      } finally {
        // setUserEmail(values?.email);
        props.resetForm();
      }
    },
  });

  return (
    <PublicLayout title="Login | StreamStudent" footerBgColor="bg-primary/20">
      <section className="flex justify-center items-center bg-primary/20 py-20">
        <aside className="lg:w-[35%] w-full bg-white rounded-3xl p-8  flex flex-col gap-5 shadow-primary shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          {isOpen ? (
            <ResetPassword
              userToken={storeToken}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-center gap-4 text-center">
                <h6 className="title-styling text-primary">
                  {forgetPasswordContent(selectedLanguage).ForgetPassword}
                </h6>
                <p>{forgetPasswordContent(selectedLanguage).Description}</p>
              </div>
              <div className="w-full pt-8">
                <div className="flex flex-col items-center gap-1 pb-6">
                  <p className="text-xl font-medium">
                    {forgetPasswordContent(selectedLanguage).selectRole}
                  </p>
                  <div className="flex items-center justify-center gap-4 font-semibold">
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={role}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="TUTOR"
                        control={<Radio size="small" />}
                        label={loginContent(selectedLanguage).tutor}
                      />
                      <FormControlLabel
                        value="STUDENT"
                        control={<Radio size="small" />}
                        label={loginContent(selectedLanguage).student}
                      />
                    </RadioGroup>
                  </div>
                </div>
                <p className="pb-4 tracking-wide">
                  {forgetPasswordContent(selectedLanguage).enterEmail}
                  <span className="text-red-500">*</span>
                </p>

                <div className="w-full">
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="example@gmail.com"
                    name="email"
                    id="standard-basic"
                    variant="standard"
                    className=""
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={
                      formik.touched.email && (formik.errors.email as any)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="flex place-content-center items-center justify-end mt-8">
                <Button
                  variant="text"
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  color="primary"
                  className="cursor-pointer font-semibold tracking-wide hover:underline text-primary"
                >
                  {forgetPasswordContent(selectedLanguage).submit}
                </Button>
              </div>
            </form>
          )}
        </aside>
      </section>
    </PublicLayout>
  );
};

export default ForgotPassword;
