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
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import useMutation from "hooks/useMutataion";
import { PublicLayout } from "layouts";
import { loginContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { saveToLocalStorage, saveToSessionStorage } from "utils";
import showError from "utils/error";
import * as Yup from "yup";
// import

const Login = () => {
  const [role, setRole] = useState("");
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const { getUser, setUser } = useAuth();

  //? changing role functionality ["TUTOR" or "STUDENT"]
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole((event.target as HTMLInputElement).value);
  };

  //? initial values & validation set
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(loginContent(selectedLanguage).InvalidEmail)
      .required(loginContent(selectedLanguage).EmailRequired),
    password: Yup.string().required(
      loginContent(selectedLanguage).passwordRequired
    ),
  });

  //? Form Handle Submit Function
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        const formData = new FormData();
        formData?.append("email", values?.email);
        formData?.append("password", values?.password);
        formData?.append("role", role ? role : "SUPER-ADMIN");
        const res = await mutation("auth/signIn", {
          method: "POST",
          body: formData,
          isFormData: true,
          isAlert: true,
        });
        if (res?.status === 200) {
          res?.results?.success?.data?.token &&
            saveToSessionStorage(
              "ACCESS_TOKEN",
              res?.results?.success?.data?.token
            );
          setUser({ ...res?.results?.success?.data?.user });
          getUser();
          await mutation(`screenTime/create-timeOfIn`, {
            method: "POST",
            body: {},
            isAlert: false,
          });
          if (res?.results?.success?.data?.user?.role === "SUPER-ADMIN")
            router.push("/admin");
          else if (res?.results?.success?.data?.user?.role === "TUTOR")
            router.push("/tutor-account");
          else router.push("/");
        }
      } catch (error) {
        showError(error);
      } finally {
        props.resetForm();
      }
    },
  });

  const LoginSchema = [
    {
      key: "1",
      label: <p className="text-sm">Enter your Email</p>,
      name: "email",
      type: "email",
      placeholder: "Work Email",
      validationSchema: Yup.string()
        .email(loginContent(selectedLanguage).InvalidEmail)
        .required(loginContent(selectedLanguage).EmailRequired),
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
        .min(6, loginContent(selectedLanguage).PasswordLength)
        .required(loginContent(selectedLanguage).passwordRequired),
      initialValue: "",
      startIcon: <LockOpen className="!text-2xl text-primary" />,
    },
  ];

  return (
    <PublicLayout title="Login | StreamStudent" footerBgColor="bg-primary/20">
      <article className="bg-primary/20 py-20">
        <section className="main-container grid place-items-center">
          <aside className="w-full lg:w-4/5 flex items-center justify-between bg-white rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] overflow-hidden">
            <div className="hidden md:block w-full lg:w-3/5 bg-primary/5">
              <img src="/home/login.png" alt="login" className="w-full h-3/5" />
            </div>
            <div className="w-full lg:w-2/5 bg-white p-6 md:p-12 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-4 text-center">
                <h6 className="title-styling text-primary">
                  {loginContent(selectedLanguage).Login}
                </h6>
                <p>{loginContent(selectedLanguage).Description}</p>
              </div>

              <form onSubmit={formik.handleSubmit} className="w-full">
                <aside className="flex flex-col gap-3 pt">
                  <div className="flex flex-col items-center gap-1 pb-6">
                    <p className="text-xl font-medium">
                      {loginContent(selectedLanguage).LoginAs}
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
                  <div>
                    <TextField
                      label={loginContent(selectedLanguage).UserEmail}
                      fullWidth
                      type="email"
                      name="email"
                      id="standard-basic"
                      variant="standard"
                      className=""
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                      label={loginContent(selectedLanguage).Password}
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password &&
                        (formik.errors.password as any)
                      }
                    />
                  </div>
                  <Link href="/forgot-password">
                    <p className="text-blue-600 hover:underline cursor-pointer text-right common-transition text-sm">
                      {loginContent(selectedLanguage).ForgotPassword}
                    </p>
                  </Link>
                  <p className="text-center text-sm tracking-wide">
                    {loginContent(selectedLanguage).AlreadyHavingAccount}{" "}
                    <Link href="/register">
                      <span className="text-blue-600 hover:underline cursor-pointer text-right common-transition">
                        {loginContent(selectedLanguage).register}
                      </span>
                    </Link>{" "}
                    {loginContent(selectedLanguage).now}
                  </p>

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
                      {loginContent(selectedLanguage).login}
                    </LoadingButton>
                  </div>
                </aside>
              </form>
            </div>
          </aside>
        </section>
      </article>
    </PublicLayout>
  );
};

export default Login;
