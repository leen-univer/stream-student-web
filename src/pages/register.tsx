import { East, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { CountrySelector } from "components/core";
import { useAppContext } from "contexts";
import { Field, Form, Formik } from "formik";
import useMutation from "hooks/useMutataion";
import { PublicLayout } from "layouts";
import { loginContent, registerContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import showError from "utils/error";
import * as Yup from "yup";

const Register = () => {
  const { selectedLanguage } = useAppContext();
  const [value, setValue] = useState("STUDENT");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <PublicLayout
      title="Register | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <main className="bg-primary/20 flex justify-center items-center py-10 md:py-20">
        <article className="main-container">
          <section className="h-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl bg-white overflow-hidden">
            <aside className="hidden w-full lg:grid place-items-center h-full bg-primary/5">
              <img
                className="w-full"
                src="/home/register.png"
                alt="form-image"
              />
            </aside>
            <aside className="w-full h-full rounded-3xl flex flex-col">
              <div className="border-b-2 border-primary">
                <p className="title-styling text-center p-4">
                  {registerContent(selectedLanguage).CreateAccount}
                </p>
                <div className="flex items-center justify-center gap-4 font-semibold pb-4">
                  <span>{registerContent(selectedLanguage).me}</span>
                  <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="TUTOR"
                      control={<Radio size="small" />}
                      label={registerContent(selectedLanguage).tutor}
                    />
                    <FormControlLabel
                      value="STUDENT"
                      control={<Radio size="small" />}
                      label={registerContent(selectedLanguage).student}
                    />
                  </RadioGroup>
                </div>
              </div>
              {value === "TUTOR" ? (
                <TutorRegisterForm />
              ) : (
                <StudentRegisterForm />
              )}
            </aside>
          </section>
        </article>
      </main>
    </PublicLayout>
  );
};

const TutorRegisterForm = () => {
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [isShow, setIsShow] = useState("");

  const router = useRouter();

  const [countryDetails, setCountryDetails] = useState({
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  });

  //? tutor registration array
  const TUTOR_REGISTRATION_ARR = [
    {
      key: "1",
      name: "name",
      label: registerContent(selectedLanguage).YourName,
      placeholder: "Your name",
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).YourName_required)
        .test(
          "not-only-spaces",
          "Name should not contain only spaces",
          (value) => value.trim() !== ""
        ),
      initialValue: "",
    },
    {
      key: "2",
      name: "email",
      label: registerContent(selectedLanguage).email,
      placeholder: "example@domain.com",
      type: "email",
      required: true,
      validationSchema: Yup.string()
        .email(loginContent(selectedLanguage).InvalidEmail)
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address"
        )
        .required(loginContent(selectedLanguage).EmailRequired),
      initialValue: "",
    },
    {
      key: "222",
      name: "country",
      label: "Country",
      placeholder: "Select country",
      type: "country",
      initialValue: "",
      required: false,
    },
    {
      key: "3",
      name: "phone",
      label: registerContent(selectedLanguage).phone_number,
      placeholder: "1234567890",
      type: "number",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).phone_number_required)
        .max(15, "Phone number should be of Max 15 digits")
        .min(6, "Phone number should be of Min 6 digits"),
      initialValue: "",
    },

    {
      key: "4",
      name: "experience",
      label: registerContent(selectedLanguage).experience,
      placeholder: registerContent(selectedLanguage).experience,
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).experience_required)
        // .max(2, "Experience should be at most 2 digits")
        .test(
          "Is Valid Number",
          "Please provide a valid number experience",
          function (val) {
            if (isNaN(Number(val))) return false;
            else if (Number(val) < 0 || Number(val) > 100) return false;
            return true;
          }
        ),
      initialValue: "",
    },
    {
      key: "5",
      name: "subject",
      label: registerContent(selectedLanguage).Expertise,
      placeholder: "Expertise in subject",
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        registerContent(selectedLanguage).Expertise_required
      ),
      initialValue: "",
    },
    {
      key: "6",
      name: "password",
      label: registerContent(selectedLanguage).password,
      placeholder: "At least 6 characters",
      type: "password",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).password_required)
        .min(8, registerContent(selectedLanguage).PasswordLength)
        .matches(
          /[0-9]/,
          registerContent(selectedLanguage).PasswordRequiresNumber
        )
        .matches(
          /[a-z]/,
          registerContent(selectedLanguage).PasswordRequiresLowercase
        )
        .matches(
          /[A-Z]/,
          registerContent(selectedLanguage).PasswordRequiresUppercase
        )
        .matches(
          /[^\w]/,
          registerContent(selectedLanguage).PasswordRequiresSymbol
        ),
      initialValue: "",
    },
    {
      key: "7",
      name: "confirmPassword",
      label: registerContent(selectedLanguage).confirmPassword,
      placeholder: "Re-enter your password",
      type: "password",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).confirmPassword_required)
        .min(8, registerContent(selectedLanguage).PasswordLength)
        .matches(
          /[0-9]/,
          registerContent(selectedLanguage).PasswordRequiresNumber
        )
        .matches(
          /[a-z]/,
          registerContent(selectedLanguage).PasswordRequiresLowercase
        )
        .matches(
          /[A-Z]/,
          registerContent(selectedLanguage).PasswordRequiresUppercase
        )
        .matches(
          /[^\w]/,
          registerContent(selectedLanguage).PasswordRequiresSymbol
        ),
      initialValue: "",
    },
  ];

  //? initial value & validation set
  const initialValues = TUTOR_REGISTRATION_ARR.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = TUTOR_REGISTRATION_ARR.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  //? handle submit function
  const handleSubmit = async (
    values: any,
    props: { resetForm: () => void }
  ) => {
    try {
      const res = await mutation("auth/signUp", {
        method: "POST",
        body: {
          role: "TUTOR",
          name: values?.name,
          email: values.email,
          country: countryDetails,
          phoneNumber: values?.phone,
          yearOfExperience: values?.experience,
          expertiseInSubject: values?.subject,
          password: values?.password,
          confirmPassword: values?.confirmPassword,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        router.push("/");
      }
      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${res?.results?.success?.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${res?.results?.error?.message}`,
        });
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <section className="w-full p-4 lg:p-6">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full flex flex-col gap-4 edit-lead-form">
            {TUTOR_REGISTRATION_ARR.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: JSX.IntrinsicAttributes & TextFieldProps & SelectProps;
                }) => {
                  if (inputItem.type === "country") {
                    return (
                      <div className="w-full">
                        <p className="whitespace-nowrap pb-2">
                          {registerContent(selectedLanguage).SelectYourCountry}
                          <span className="pl-1 text-gray-500">*</span>
                        </p>
                        <CountrySelector
                          countryDetails={countryDetails}
                          setCountryDetails={setCountryDetails}
                        />
                      </div>
                    );
                  }

                  if (inputItem.type === "number") {
                    return (
                      <div className={`w-full flex flex-col`}>
                        <div className="w-full">
                          <TextField
                            fullWidth
                            label={inputItem.label}
                            id="standard-basic"
                            variant="standard"
                            required={inputItem?.required}
                            name={inputItem.name}
                            value={formik.values[inputItem.name]}
                            onChange={(e) => {
                              formik.setFieldValue(
                                inputItem.name,
                                e.target.value.replace(/[^0-9]/g, "")
                              );
                            }}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.phone &&
                              Boolean(formik.errors.phone)
                            }
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={
                              {
                                classes: {
                                  notchedOutline: "notchedOutline",
                                  input: "input-field",
                                },
                              } as any
                            }
                          />
                        </div>
                      </div>
                    );
                  }

                  if (inputItem.type === "password") {
                    return (
                      <div className={`w-full flex flex-col`}>
                        <TextField
                          label={`${inputItem.label} ${"*"}`}
                          fullWidth
                          type={`${
                            isShow === inputItem.key ? "text" : "password"
                          }`}
                          name={inputItem.name}
                          id="standard-basic"
                          variant="standard"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  disableFocusRipple
                                  disableRipple
                                  onClick={() => {
                                    setIsShow((prev) =>
                                      prev === inputItem?.key
                                        ? ""
                                        : inputItem.key
                                    );
                                  }}
                                >
                                  {isShow === inputItem.key ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={formik.handleChange}
                          value={formik.values[inputItem.name]}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                        />
                      </div>
                    );
                  }
                  return (
                    <div className={`w-full flex flex-col`}>
                      <TextField
                        fullWidth
                        label={inputItem.label}
                        id="standard-basic"
                        variant="standard"
                        required={inputItem?.required}
                        type={inputItem.type}
                        error={Boolean(props.meta.touched && props.meta.error)}
                        helperText={props.meta.touched && props.meta.error}
                        InputProps={
                          {
                            classes: {
                              notchedOutline: "notchedOutline",
                              input: "input-field",
                            },
                          } as any
                        }
                        {...props.field}
                      />
                    </div>
                  );
                }}
              </Field>
            ))}
            <p className="text-center tracking-wide py-1">
              {registerContent(selectedLanguage).haveAnAccount}{" "}
              <Link href="/login">
                <span className="text-blue-600 hover:underline cursor-pointer text-right common-transition">
                  {registerContent(selectedLanguage).login}
                </span>
              </Link>{" "}
              {registerContent(selectedLanguage).now}
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
                {registerContent(selectedLanguage).Register}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

const StudentRegisterForm = () => {
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const [isShowing, setIsShowing] = useState("");
  const router = useRouter();

  const [countryDetails, setCountryDetails] = useState({
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  });
  //? student registration array
  const STUDENT_REGISTRATION_ARR = [
    {
      key: "1",
      name: "name",
      label: registerContent(selectedLanguage).YourName,
      type: "text",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).YourName_required)
        .test(
          "not-only-spaces",
          "Name should not contain only spaces",
          (value) => value.trim() !== ""
        ),
      initialValue: "",
    },
    {
      key: "2",
      name: "email",
      label: registerContent(selectedLanguage).email,
      type: "email",
      required: true,
      validationSchema: Yup.string()
        .email(loginContent(selectedLanguage).InvalidEmail)
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address"
        )
        .required(loginContent(selectedLanguage).EmailRequired),
      initialValue: "",
    },
    {
      key: "222",
      name: "country",
      label: "Country",
      placeholder: "Select country",
      type: "country",
      initialValue: "",
      required: false,
    },
    {
      key: "3",
      name: "phone",
      label: registerContent(selectedLanguage).phone_number,
      type: "number",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).phone_number_required)
        .max(15, "Phone number should be of Max 15 digits")
        .min(6, "Phone number should be of Min 6 digits"),
      initialValue: "",
    },
    {
      key: "4",
      name: "password",
      label: registerContent(selectedLanguage).password,
      type: "password",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).password_required)
        .min(8, registerContent(selectedLanguage).PasswordLength)
        .matches(
          /[0-9]/,
          registerContent(selectedLanguage).PasswordRequiresNumber
        )
        .matches(
          /[a-z]/,
          registerContent(selectedLanguage).PasswordRequiresLowercase
        )
        .matches(
          /[A-Z]/,
          registerContent(selectedLanguage).PasswordRequiresUppercase
        )
        .matches(
          /[^\w]/,
          registerContent(selectedLanguage).PasswordRequiresSymbol
        ),
      initialValue: "",
    },
    {
      key: "5",
      name: "confirmPassword",
      label: registerContent(selectedLanguage).confirmPassword,
      type: "password",
      required: true,
      validationSchema: Yup.string()
        .required(registerContent(selectedLanguage).confirmPassword_required)
        .min(8, registerContent(selectedLanguage).PasswordLength)
        .matches(
          /[0-9]/,
          registerContent(selectedLanguage).PasswordRequiresNumber
        )
        .matches(
          /[a-z]/,
          registerContent(selectedLanguage).PasswordRequiresLowercase
        )
        .matches(
          /[A-Z]/,
          registerContent(selectedLanguage).PasswordRequiresUppercase
        )
        .matches(
          /[^\w]/,
          registerContent(selectedLanguage).PasswordRequiresSymbol
        ),
      initialValue: "",
    },
  ];

  //? initial value & validation set
  const initialValues = STUDENT_REGISTRATION_ARR.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = STUDENT_REGISTRATION_ARR.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  //? handle submit function
  const handleSubmit = async (
    values: any,
    props: { resetForm: () => void }
  ) => {
    try {
      const res = await mutation("auth/signUp", {
        method: "POST",
        body: {
          role: "STUDENT",
          name: values?.name,
          email: values?.email,
          phoneNumber: values?.phone,
          country: countryDetails,
          password: values?.password,
          confirmPassword: values?.confirmPassword,
        },
        isAlert: true,
      });
      if (res?.status === 200) {
        router.push("/");
      }
      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${res?.results?.success?.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${res?.results?.error?.message}`,
        });
      }
    } catch (error) {
      showError(error);
    }
  };

  return (
    <section className={`w-full p-4 lg:p-6`}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full flex flex-col gap-4 edit-lead-form">
            {STUDENT_REGISTRATION_ARR.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: JSX.IntrinsicAttributes & TextFieldProps & SelectProps;
                }) => {
                  if (inputItem.type === "country") {
                    return (
                      <div className="w-full">
                        <p className="whitespace-nowrap pb-2">
                          {registerContent(selectedLanguage).SelectYourCountry}
                          <span className="pl-1 text-gray-500">*</span>
                        </p>
                        <CountrySelector
                          countryDetails={countryDetails}
                          setCountryDetails={setCountryDetails}
                        />
                      </div>
                    );
                  }

                  if (inputItem.type === "number") {
                    return (
                      <div className={`w-full flex flex-col`}>
                        <div className="w-full">
                          <TextField
                            fullWidth
                            label={inputItem.label}
                            id="standard-basic"
                            variant="standard"
                            required={inputItem?.required}
                            name={inputItem.name}
                            value={formik.values[inputItem.name]}
                            onChange={(e) => {
                              formik.setFieldValue(
                                inputItem.name,
                                e.target.value.replace(/[^0-9]/g, "")
                              );
                            }}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.phone &&
                              Boolean(formik.errors.phone)
                            }
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={
                              {
                                classes: {
                                  notchedOutline: "notchedOutline",
                                  input: "input-field",
                                },
                              } as any
                            }
                            inputProps={{
                              minLength: "5",
                              maxLength: "15",
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                  if (inputItem.type === "password") {
                    return (
                      <div className={`w-full flex flex-col`}>
                        <TextField
                          label={`${inputItem.label} ${"*"}`}
                          fullWidth
                          type={`${
                            isShowing === inputItem.key ? "text" : "password"
                          }`}
                          name={inputItem.name}
                          id="standard-basic"
                          variant="standard"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  disableFocusRipple
                                  disableRipple
                                  onClick={() => {
                                    setIsShowing((prev) =>
                                      prev === inputItem?.key
                                        ? ""
                                        : inputItem.key
                                    );
                                  }}
                                >
                                  {isShowing === inputItem.key ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          onChange={formik.handleChange}
                          value={formik.values[inputItem.name]}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                        />
                      </div>
                    );
                  }

                  return (
                    <div className={`w-full flex flex-col`}>
                      <TextField
                        fullWidth
                        label={inputItem.label}
                        id="standard-basic"
                        variant="standard"
                        required={inputItem?.required}
                        type={inputItem.type}
                        error={Boolean(props.meta.touched && props.meta.error)}
                        helperText={props.meta.touched && props.meta.error}
                        InputProps={
                          {
                            classes: {
                              notchedOutline: "notchedOutline",
                              input: "input-field",
                            },
                          } as any
                        }
                        {...props.field}
                      />
                    </div>
                  );
                }}
              </Field>
            ))}
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
                {registerContent(selectedLanguage).Register}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Register;
