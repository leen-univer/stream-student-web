import { Close, East, Edit, UploadFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Dialog,
  IconButton,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { CountrySelector } from "components/core";
import { useAppContext } from "contexts";
import { Field, Form, Formik } from "formik";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { AdminPanelLayout } from "layouts";
import { adminProfileContent, adminProfileEditFormContent } from "locale";
import { useState } from "react";
import Swal from "sweetalert2";
import showError from "utils/error";
import * as Yup from "yup";

const AdminProfile = () => {
  const { user } = useAuth();
  const { selectedLanguage, changeLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AdminPanelLayout title="My Profile | StreamStudent">
      <section className="w-full grid place-items-center ">
        <aside className="w-full lg:w-1/2 flex flex-col gap-4 bg-white p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl">
          <h1 className="title-styling text-center">
            {adminProfileContent(selectedLanguage).Profile}{" "}
            <span className="text-primary">
              {adminProfileContent(selectedLanguage).Information}
            </span>
          </h1>
          <div className="flex w-full justify-end">
            <button
              className="flex items-center tracking-wide font-semibold text-amber-500 hover:underline"
              onClick={() => setIsOpen(true)}
              type="button"
            >
              <Edit className="!text-base" />{" "}
              {adminProfileContent(selectedLanguage).Edit}
            </button>
          </div>
          <label htmlFor="avatar" className="flex justify-center">
            <Avatar
              alt="profile"
              src={user?.profileUrl}
              style={{
                width: "5rem",
                height: "5rem",
              }}
            ></Avatar>
          </label>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {adminProfileContent(selectedLanguage).Name}
            </span>
            <span className="font-medium">{user?.name || "Not Mentioned"}</span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {adminProfileContent(selectedLanguage).Email}
            </span>{" "}
            <span className="font-medium">
              {user?.email || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {adminProfileContent(selectedLanguage).Phone}
            </span>{" "}
            <span className="font-medium">
              {user?.phoneNumber || "Not Mentioned"}
            </span>
          </p>
          {/* <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {adminProfileContent(selectedLanguage).Designation}
            </span>
            <span className="font-medium">
              {user?.designation || "Not Mentioned"}
            </span>
          </p> */}
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {adminProfileContent(selectedLanguage).Country}
            </span>{" "}
            <span className="font-medium">
              {user?.country?.label || "Not Mentioned"}
            </span>
          </p>
          {/* <p className="flex items-start gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">About:</span>
            <span className="font-medium">
              A short description about sarah and her all technical skills. She
              has been in this technical field for around 10 years. She has an
              unique strategy of teaching, that helps a lot of beginner as well
              as advance job seeker to achieve their goals.
            </span>
          </p> */}
        </aside>
      </section>

      <Dialog
        open={isOpen}
        keepMounted={false}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <AdminProfileForm onClose={() => setIsOpen(false)} />
      </Dialog>
    </AdminPanelLayout>
  );
};

const AdminProfileForm = ({ onClose }: { onClose: () => void }) => {
  const { selectedLanguage, changeLanguage } = useAppContext();
  const { user, getUser } = useAuth();
  const { mutation } = useMutation();

  const [countryDetails, setCountryDetails] = useState({
    code: user?.country?.code,
    label: user?.country?.label,
    phone: user?.country?.phone,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  //? admin registration array
  const ADMIN_PROFILE_SCHEMA = [
    {
      key: "1",
      name: "name",
      label: adminProfileEditFormContent(selectedLanguage).YourName,
      placeholder: "Your name",
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        adminProfileEditFormContent(selectedLanguage).NameRequired
      ),
      initialValue: user?.name || "",
    },
    {
      key: "2",
      name: "email",
      label: adminProfileEditFormContent(selectedLanguage).Email,
      placeholder: "example@domain.com",
      type: "email",
      required: true,
      readOnly: user?.email ? true : false,
      validationSchema: Yup.string().required(
        adminProfileEditFormContent(selectedLanguage).EmailRequired
      ),

      initialValue: user?.email || "",
    },
    {
      key: "222",
      name: "country",
      label: "Country",
      placeholder: "Select country",
      type: "country",
      initialValue: user?.country?.label,
      required: false,
    },
    {
      key: "3",
      name: "phone",
      label: adminProfileEditFormContent(selectedLanguage).PhoneNumber,
      placeholder: "1234567890",
      type: "number",
      required: true,
      validationSchema: Yup.string()
        .required(
          adminProfileEditFormContent(selectedLanguage).PhoneNumberRequired
        )
        .max(15, `${adminProfileEditFormContent(selectedLanguage).phonemax15}`)
        .min(6, `${adminProfileEditFormContent(selectedLanguage).phonemin6}`),
      initialValue: user?.phoneNumber || "",
    },
    // {
    //   key: "4",
    //   name: "designation",
    //   label: adminProfileEditFormContent(selectedLanguage).Designation,
    //   placeholder: "Current designation",
    //   type: "text",
    //   required: false,
    //   initialValue: user?.designation || "",
    // },
    // {
    //   key: "5",
    //   name: "about",
    //   label: adminProfileEditFormContent(selectedLanguage).About,
    //   placeholder: "Write something about you",
    //   type: "text",
    //   required: false,
    //   initialValue: user?.about || "",
    // },
  ];

  //? initial value & validation set
  const initialValues = ADMIN_PROFILE_SCHEMA.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = ADMIN_PROFILE_SCHEMA.reduce(
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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData?.append("countryCode", countryDetails?.code);
      formData?.append("countryPhone", countryDetails?.phone);
      formData?.append("countryName", countryDetails?.label);
      formData?.append("phoneNumber", values?.phone);
      // formData?.append("designation", values?.designation);
      // formData?.append("about", values?.about);

      if (avatarFile) {
        formData.append("profile", avatarFile);
      }
      const res = await mutation(`gen/updateUser/${user?._id}`, {
        method: "PUT",
        body: formData,
        isFormData: true,
      });

      if (res?.status === 200) {
        getUser();
        onClose();
        setAvatarFile(null);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: adminProfileEditFormContent(selectedLanguage)
            .Profileupdatesuccessfully,
        });
      }
    } catch (error) {
      showError(error);
    }
  };
  return (
    <section className="relative w-full p-4 lg:p-8">
      <span className="absolute top-2 right-2">
        <IconButton onClick={onClose}>
          <Close className="!text-red-600" />
        </IconButton>
      </span>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full flex flex-col items-center gap-4">
            <label htmlFor="avatar" className="relative">
              <Avatar
                alt="profile"
                src={avatarFile ? URL.createObjectURL(avatarFile) : ""}
                style={{
                  width: "5rem",
                  height: "5rem",
                }}
              >
                <>
                  <UploadFile fontSize="large" />
                </>
              </Avatar>

              <input
                type="file"
                name="avatar"
                hidden
                id="avatar"
                accept="image/jpg , image/jpeg , image/webp , image/png "
                onChange={(e) => {
                  e.target.files && setAvatarFile(e.target.files[0]);
                }}
              />
            </label>
            {ADMIN_PROFILE_SCHEMA.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: JSX.IntrinsicAttributes & TextFieldProps & SelectProps;
                }) => {
                  // if (inputItem.type === "select") {
                  //   return (
                  //     <div className={`w-full flex flex-col`}>
                  //       <p className="whitespace-nowrap">
                  //         {inputItem.label}
                  //         <span className="pl-1 text-gray-500">*</span>
                  //       </p>
                  //       <TextField
                  //         fullWidth
                  //         select
                  //         id="standard-basic"
                  //         variant="standard"
                  //         required={inputItem?.required}
                  //         error={Boolean(
                  //           props.meta.touched && props.meta.error
                  //         )}
                  //         value={formik?.values[inputItem?.name]}
                  //         InputProps={
                  //           {
                  //             classes: {
                  //               notchedOutline: "notchedOutline",
                  //               input: "input-field",
                  //             },
                  //           } as any
                  //         }
                  //         {...props.field}
                  //       ></TextField>
                  //     </div>
                  //   );
                  // }
                  if (inputItem.type === "country") {
                    return (
                      <div className="w-full">
                        <p className="whitespace-nowrap pb-2">
                          {
                            adminProfileEditFormContent(selectedLanguage)
                              .SelectYourCountry
                          }
                          <span className="pl-1 text-gray-500">*</span>
                        </p>
                        <CountrySelector
                          // isDisabled={true}
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
                              minLength: "6",
                              maxLength: "15",
                            }}
                          />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className={`w-full flex flex-col`}>
                      <TextField
                        fullWidth
                        label={inputItem.label}
                        disabled={inputItem?.readOnly}
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
                {adminProfileEditFormContent(selectedLanguage).Save}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AdminProfile;
