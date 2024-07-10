import { PublicLayout } from "layouts";
import showError from "utils/error";
import {
  East,
  Email,
  Lock,
  LockOpen,
  PermIdentity,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const LoginSchema = [
  {
    key: "1",
    label: <p className="text-sm">Enter your Email</p>,
    name: "email",
    type: "email",
    placeholder: "Work Email",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    initialValue: "",
    startIcon: <PermIdentity className="!text-[1.7rem] text-primary" />,
  },
  {
    key: "2",
    label: <p className="text-sm">Enter your password</p>,
    name: "password",
    type: "password",
    placeholder: "Password",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    initialValue: "",
    startIcon: <LockOpen className="!text-2xl text-primary" />,
  },
];

const AdminLogin = () => {
  const [isShow, setIsShow] = useState(false);
  const { push } = useRouter();

  //? initial values & validation set
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email!").required("Email is required!"),
    password: Yup.string().required("Password is required"),
  });

  //? Form Handle Submit Function
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Logged in successfully",
        });
      } catch (error) {
        showError(error);
      } finally {
        props.resetForm();
      }
    },
  });

  return (
    <article className="bg-primary/20 h-screen grid place-items-center">
      <section className="main-container grid place-items-center">
        <aside className="w-full lg:w-4/5 flex items-center justify-between bg-white rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden">
          <div className="hidden md:block w-full lg:w-3/5 bg-primary/5">
            <img src="/home/login.png" alt="login" className="w-full h-3/5" />
          </div>
          <div className="w-full lg:w-2/5 bg-white p-6 md:p-12 flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <h6 className="title-styling text-primary">Login</h6>
              <p>Hey enter your details to sign in to your account</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="w-full">
              <aside className="flex flex-col gap-3 pt">
                <div>
                  <TextField
                    label="User Email"
                    fullWidth
                    type="email"
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
                <div className="mt-4">
                  <TextField
                    label="Password"
                    fullWidth
                    type={`${isShow ? "text" : "password"}`}
                    name="password"
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disableFocusRipple
                            disableRipple
                            onClick={() => {
                              setIsShow(!isShow);
                            }}
                          >
                            {isShow ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && (formik.errors.password as any)
                    }
                  />
                </div>
                <Link href="/forgot-password">
                  <p className="text-blue-600 hover:underline cursor-pointer text-right common-transition text-sm">
                    Forgot Password?
                  </p>
                </Link>

                <div className="w-full flex justify-center items-center">
                  <LoadingButton
                    fullWidth
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    loading={formik.isSubmitting}
                    loadingPosition="end"
                    endIcon={
                      <East className="common-transition group-hover:translate-x-2" />
                    }
                    className={`group !rounded-lg !bg-primary !h-10 !w-36 !text-base !capitalize !tracking-wide !text-white hover:focus:!border-none disabled:!cursor-not-allowed  disabled:!bg-gray-300`}
                  >
                    Login
                  </LoadingButton>
                </div>
              </aside>
            </form>
          </div>
        </aside>
      </section>
    </article>
  );
};

export default AdminLogin;
