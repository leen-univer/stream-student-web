import {
  Close,
  East,
  Lock,
  Pin,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Dialog, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import showError from "utils/error";
import * as Yup from "yup";
import { useAppContext } from "contexts";
import { resetPasswordContent } from "locale";

import useMutation from "hooks/useMutataion";

type Props = {
  userToken: string;
  open: boolean;
  onClose: () => void;
};

const ResetPassword = ({ userToken, open, onClose }: Props) => {
  const { selectedLanguage } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutation, isLoading } = useMutation();

  //? initial values & validation set
  const initialValues = {
    emailOTP: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    emailOTP: Yup.number().required(
      resetPasswordContent(selectedLanguage).Required
    ),
    password: Yup.string()
      .required(resetPasswordContent(selectedLanguage).Required)
      .min(8, resetPasswordContent(selectedLanguage).PasswordLength)
      .matches(/[0-9]/, resetPasswordContent(selectedLanguage).requireNumber)
      .matches(/[a-z]/, resetPasswordContent(selectedLanguage).requireLowercase)
      .matches(/[A-Z]/, resetPasswordContent(selectedLanguage).requireUppercase)
      .matches(/[^\w]/, resetPasswordContent(selectedLanguage).requireSymbol),
    confirmPassword: Yup.string()
      .required(resetPasswordContent(selectedLanguage).Required)
      .oneOf([Yup.ref("password"), null as any], "Passwords must match"),
  });

  //? handleSubmit Function()
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema: validationSchema,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        // Swal.fire({
        //   icon: "success",
        //   title: "Success",
        //   text: "You have successfully reset your password",
        // });
        const formData = new FormData();
        formData?.append("otp", values?.emailOTP);
        formData?.append("password", values?.password);
        formData?.append("userToken", userToken);
        // formData?.append("role", role);
        const res = await mutation("auth/forgot-password-verify-otp", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
      } catch (error) {
        showError(error);
      } finally {
        props.resetForm();
      }
    },
  });

  return (
    <Dialog
      open={open}
      keepMounted={false}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { borderRadius: "1.5rem" },
      }}
    >
      <form onSubmit={formik.handleSubmit} className="relative w-full p-10">
        <span className="absolute right-2 top-2">
          <IconButton onClick={onClose}>
            <Close fontSize="small" className="!text-red-600" />
          </IconButton>
        </span>
        <aside className="flex flex-col gap-4">
          <h1 className="title-styling text-primary text-center pb-4">
            {resetPasswordContent(selectedLanguage).ResetPassword}
          </h1>
          <div>
            <p className="pb-3 text-base tracking-wider">
              {resetPasswordContent(selectedLanguage).enterOTP}
              <span className="text-red-500">*</span>
            </p>
            <TextField
              fullWidth
              name="emailOTP"
              id="standard-basic"
              variant="standard"
              className=""
              value={formik.values.emailOTP}
              onChange={(e) => {
                formik.setFieldValue(
                  "emailOTP",
                  e.target.value.replace(/[^0-9]/g, "")
                );
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.emailOTP && Boolean(formik.errors.emailOTP)}
              helperText={
                formik.touched.emailOTP && (formik.errors.emailOTP as any)
              }
              inputProps={{
                minLength: "4",
                maxLength: "6",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Pin fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="">
            <h1 className="pb-3 tracking-wide">
              {resetPasswordContent(selectedLanguage).CreatePassword}{" "}
              <span className="text-red-500">*</span>
            </h1>
            <TextField
              fullWidth
              type={`${showPassword ? "text" : "password"}`}
              name="password"
              placeholder={resetPasswordContent(selectedLanguage).password}
              id="standard-basic"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock fontSize="small" />
                  </InputAdornment>
                ),
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && (formik.errors.password as any)
              }
            />
          </div>

          <div className="">
            <h1 className="pb-3 tracking-wide">
              {resetPasswordContent(selectedLanguage).ConfirmYourPassword}
              <span className="text-red-500">*</span>
            </h1>
            <TextField
              fullWidth
              type={`${showConfirmPassword ? "text" : "password"}`}
              name="confirmPassword"
              placeholder={
                resetPasswordContent(selectedLanguage).confirmPassword
              }
              id="standard-basic"
              variant="standard"
              className=""
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                    >
                      {showConfirmPassword ? (
                        <Visibility fontSize="small" />
                      ) : (
                        <VisibilityOff fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton disableFocusRipple disableRipple>
                      <Lock fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword &&
                (formik.errors.confirmPassword as any)
              }
            />
          </div>

          <div className="w-full flex justify-center items-center mt-2">
            <LoadingButton
              fullWidth
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              loading={formik.isSubmitting}
              loadingPosition="end"
              endIcon={
                <East className="common-transition group-hover:translate-x-2" />
              }
              className={`group !rounded-lg !bg-primary/80 !h-9 !w-36 !text-base !capitalize !tracking-wide !text-white hover:focus:!border-none disabled:!cursor-not-allowed  disabled:!bg-gray-300`}
            >
              {resetPasswordContent(selectedLanguage).submit}
            </LoadingButton>
          </div>
        </aside>
      </form>
    </Dialog>
  );
};

export default ResetPassword;
