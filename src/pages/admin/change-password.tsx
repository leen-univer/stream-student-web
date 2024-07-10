import { East, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useAppContext } from "contexts";
import { Field, Form, Formik } from "formik";
import useMutation from "hooks/useMutataion";
import { AdminPanelLayout } from "layouts";
import { adminChangePasswordContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import { removeSessionStorage } from "utils";
import showError from "utils/error";
import * as Yup from "yup";

const AdminChangePassword = () => {
  const { mutation, isLoading } = useMutation();
  const { selectedLanguage, changeLanguage } = useAppContext();
  const router = useRouter();

  const onLogout = () => {
    removeSessionStorage("ACCESS_TOKEN");
    return router.replace("/");
  };
  const ChangePasswordSchema = [
    {
      key: "1",
      label: adminChangePasswordContent(selectedLanguage).OldPassword,
      name: "oldPassword",
      type: "password",
      validationSchema: Yup.string().required(
        adminChangePasswordContent(selectedLanguage).OldPasswordRequired
      ),
      initialValue: "",
    },
    {
      key: "2",
      label: adminChangePasswordContent(selectedLanguage).NewPassword,
      name: "newPassword",
      type: "password",
      validationSchema: Yup.string()
        .required(
          adminChangePasswordContent(selectedLanguage).NewPasswordRequired
        )
        .min(8, adminChangePasswordContent(selectedLanguage).PasswordLength_8)
        .matches(
          /[0-9]/,
          adminChangePasswordContent(selectedLanguage).PasswordRequiresNumber
        )
        .matches(
          /[a-z]/,
          adminChangePasswordContent(selectedLanguage).PasswordRequiresLowercase
        )
        .matches(
          /[A-Z]/,
          adminChangePasswordContent(selectedLanguage).PasswordRequiresUppercase
        )
        .matches(
          /[^\w]/,
          adminChangePasswordContent(selectedLanguage).PasswordRequiresSymbol
        ),
      initialValue: "",
    },
    {
      key: "3",
      label: adminChangePasswordContent(selectedLanguage).ConfirmPassword,
      name: "confirmPassword",
      type: "password",
      validationSchema: Yup.string()
        .required(
          adminChangePasswordContent(selectedLanguage).ConfirmPasswordRequired
        )
        .oneOf(
          [Yup.ref("newPassword"), null as any],
          adminChangePasswordContent(selectedLanguage).PasswordsMustMatch
        ),
      initialValue: "",
    },
  ];
  const [showPassword, setShowPassword] = useState({
    oldPassword: "password",
    newPassword: "password",
    confirmPassword: "password",
  });
  const { push } = useRouter();

  //? visible password function()
  const handlePasswordShowChange = (inputItem: any) => {
    try {
      setShowPassword((prev: any) => {
        if (inputItem?.name === "oldPassword") {
          return {
            ...prev,
            oldPassword: prev?.oldPassword === "password" ? "text" : "password",
          };
        } else if (inputItem?.name === "newPassword") {
          return {
            ...prev,
            newPassword: prev?.newPassword === "password" ? "text" : "password",
          };
        } else {
          return {
            ...prev,
            confirmPassword:
              prev?.confirmPassword === "password" ? "text" : "password",
          };
        }
      });
    } catch (error) {}
  };

  //? initial values & validation set
  const initialValues = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = ChangePasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  //? handleSubmit Function()
  const handleChangePassword = async (
    values: any,
    props: { resetForm: () => void }
  ) => {
    try {
      // Swal.fire({
      //   icon: "success",
      //   title: "Success",
      //   text: "Your password has been successfully changed",
      // });
      const formData = new FormData();
      formData?.append("oldPassword", values?.oldPassword);
      formData?.append("newPassword", values?.newPassword);
      formData?.append("confirmPassword", values?.confirmPassword);
      const res = await mutation("auth/reset-password", {
        method: "POST",
        body: formData,
        isFormData: true,
        isAlert: true,
      });
      if (res?.status == 200) {
        onLogout();
      }
    } catch (error) {
      showError(error);
    } finally {
      props.resetForm();
    }
  };

  return (
    <AdminPanelLayout title="Change Password | StreamStudent">
      <section className="h-full grid place-items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleChangePassword}
        >
          {(formik) => (
            <Form className="w-full md:w-1/2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-8 rounded-3xl">
              <section className="flex flex-col justify-center items-center">
                <aside className="flex flex-col w-full">
                  {ChangePasswordSchema.map((inputItem) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <TextField
                          variant="standard"
                          fullWidth
                          margin="normal"
                          label={inputItem.label}
                          type={
                            inputItem?.name === "oldPassword"
                              ? showPassword?.oldPassword
                              : inputItem?.name === "newPassword"
                              ? showPassword?.newPassword
                              : showPassword?.confirmPassword
                          }
                          InputProps={{
                            endAdornment: (
                              <div
                                className="cursor-pointer text-gray-500"
                                onClick={() =>
                                  handlePasswordShowChange(inputItem)
                                }
                              >
                                {inputItem?.name === "oldPassword" &&
                                  (showPassword?.oldPassword === "password" ? (
                                    <VisibilityOff fontSize="small" />
                                  ) : (
                                    <Visibility fontSize="small" />
                                  ))}
                                {inputItem?.name === "newPassword" &&
                                  (showPassword?.newPassword === "password" ? (
                                    <VisibilityOff fontSize="small" />
                                  ) : (
                                    <Visibility fontSize="small" />
                                  ))}
                                {inputItem?.name === "confirmPassword" &&
                                  (showPassword?.confirmPassword ===
                                  "password" ? (
                                    <VisibilityOff fontSize="small" />
                                  ) : (
                                    <Visibility fontSize="small" />
                                  ))}
                              </div>
                            ),
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock />
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                          {...props.field}
                        />
                      )}
                    </Field>
                  ))}
                  <div className="flex place-content-center mt-8">
                    <LoadingButton
                      fullWidth
                      type="submit"
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                      loadingPosition="end"
                      endIcon={
                        <East className="common-transition group-hover:translate-x-2" />
                      }
                      className={`group !rounded-lg !bg-primary !h-10 !w-60 !text-base !capitalize !tracking-wide !text-white hover:focus:!border-none disabled:!cursor-not-allowed  disabled:!bg-gray-300`}
                    >
                      {
                        adminChangePasswordContent(selectedLanguage)
                          .ChangePassword
                      }
                    </LoadingButton>
                  </div>
                </aside>
              </section>
            </Form>
          )}
        </Formik>
      </section>
    </AdminPanelLayout>
  );
};

export default AdminChangePassword;
