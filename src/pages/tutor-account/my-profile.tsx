import { Close, East, Edit, UploadFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Dialog,
  IconButton,
  MenuItem,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { CountrySelector } from "components/core";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { TutorPanelLayout } from "layouts";
import { useState } from "react";
import Swal from "sweetalert2";
import showError from "utils/error";
import { useAppContext } from "contexts";
import { profilePage } from "locale";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import FileUpload from "components/core/FileUpload";

const TutorProfile = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useAppContext();

  return (
    <TutorPanelLayout title="My Profile | StreamStudent">
      <section className="w-full grid place-items-center">
        <aside className="w-full lg:w-1/2 flex flex-col gap-4 bg-white p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-3xl">
          <h1 className="title-styling text-center">
            {profilePage(selectedLanguage).profile}
            <span className="text-primary">
              {profilePage(selectedLanguage).information}
            </span>
          </h1>
          <div className="flex w-full justify-end">
            <button
              className="flex items-center tracking-wide font-semibold text-amber-500 hover:underline"
              onClick={() => setIsOpen(true)}
              type="button"
            >
              <Edit className="!text-base" />
              {profilePage(selectedLanguage).edit}
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
              {profilePage(selectedLanguage).name}:
            </span>
            <span className="font-medium">{user?.name || "Not Mentioned"}</span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).email}:
            </span>
            <span className="font-medium">
              {user?.email || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).phone}:
            </span>
            <span className="font-medium">
              {user?.phoneNumber || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).designation}:
            </span>
            <span className="font-medium">
              {user?.designation || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).experience}:
            </span>
            <span className="font-medium">
              {user?.yearOfExperience || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).expertiseIn}:
            </span>
            <span className="font-medium">
              {user?.expertiseInSubject || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-center gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).country}:
            </span>
            <span className="font-medium">
              {user?.country?.label || "Not Mentioned"}
            </span>
          </p>
          <p className="flex items-start gap-5 text-xl tracking-wide font-semibold">
            <span className="min-w-[10rem] w-40 text-end">
              {profilePage(selectedLanguage).about}:
            </span>
            <span className="font-medium">
              {user?.about || "Not Mentioned"}
            </span>
          </p>
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
        <EditTutorProfileForm onClose={() => setIsOpen(false)} />
      </Dialog>
    </TutorPanelLayout>
  );
};

const EditTutorProfileForm = ({ onClose }: { onClose: () => void }) => {
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [file, setFile] = useState<any>(null);
  const { selectedLanguage } = useAppContext();
  const { user, getUser } = useAuth();
  const { mutation } = useMutation();
  const [countryDetails, setCountryDetails] = useState({
    code: user?.country?.code,
    label: user?.country?.label,
    phone: user?.country?.phone,
  });

  //? tutor registration array
  const EDIT_TUTOR_PROFILE_SCHEMA = [
    {
      key: "1",
      name: "name",
      label: `${profilePage(selectedLanguage).name}`,
      placeholder: `${profilePage(selectedLanguage).name}`,
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        `${profilePage(selectedLanguage).nameSpan}`
      ),
      initialValue: user?.name || "",
    },
    {
      key: "2",
      name: "email",
      label: `${profilePage(selectedLanguage).email}`,
      placeholder: "example@domain.com",
      type: "email",
      required: true,
      readOnly: user?.email ? true : false,
      validationSchema: Yup.string().required(
        `${profilePage(selectedLanguage).emailSpan}`
      ),
      initialValue: user?.email || "",
      disabled: true,
    },
    {
      key: "222",
      name: "country",
      label: `${profilePage(selectedLanguage).country}`,
      placeholder: `${profilePage(selectedLanguage).countryPlace}`,
      type: "country",
      initialValue: user?.country?.label,
      required: false,
    },
    {
      key: "3",
      name: "phone",
      label: `${profilePage(selectedLanguage).phoneNumber}`,
      placeholder: "1234567890",
      type: "number",
      required: true,
      validationSchema: Yup.string()
        .required("Number is required!")
        .max(15, `${profilePage(selectedLanguage).phonemax15}`)
        .min(6, `${profilePage(selectedLanguage).phonemin6}`),
      initialValue: user?.phoneNumber || "",
    },
    {
      key: "4",
      name: "experience",
      label: `${profilePage(selectedLanguage).yearOfExperience}`,
      placeholder: "Years of experience",
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        `${profilePage(selectedLanguage).yearOfExperienceSpan}`
      ),
      initialValue: user?.yearOfExperience || "",
    },
    {
      key: "5",
      name: "subject",
      label: `${profilePage(selectedLanguage).expertiseInSubject}`,
      placeholder: `${profilePage(selectedLanguage).expertiseInSubject}`,
      type: "text",
      required: true,
      validationSchema: Yup.string().required(
        `${profilePage(selectedLanguage).expertiseInSubjectSpan}`
      ),
      initialValue: user?.expertiseInSubject || "",
    },
    {
      key: "6",
      name: "designation",
      label: `${profilePage(selectedLanguage).designation}`,
      placeholder: "Current designation",
      type: "text",
      required: false,
      initialValue: user?.designation || "",
    },
    {
      key: "7",
      name: "about",
      label: `${profilePage(selectedLanguage).about}`,
      placeholder: "Write something about you",
      type: "text",
      required: false,
      initialValue: user?.about || "",
    },
  ];

  //? initial value & validation set
  const initialValues = EDIT_TUTOR_PROFILE_SCHEMA.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchema = EDIT_TUTOR_PROFILE_SCHEMA.reduce(
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
      // formData?.append("country", countryDetails?.label);
      formData?.append("countryCode", countryDetails?.code);
      formData?.append("countryPhone", countryDetails?.phone);
      formData?.append("countryName", countryDetails?.label);
      formData?.append("phoneNumber", values?.phone);
      formData?.append("yearOfExperience", values?.experience);
      formData?.append("expertiseInSubject", values?.subject);
      formData?.append("designation", values?.designation);
      formData?.append("about", values?.about);
      formData?.append("profile", values?.profile);

      const res = await mutation(`gen/updateUser/${user?._id}`, {
        method: "PUT",
        body: formData,
        isFormData: true,
      });
      if (res?.status === 200) {
        getUser();
        onClose();
        // setAvatarFile(null);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: profilePage(selectedLanguage).Profileupdatesuccessfully,
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
                style={{
                  width: "5rem",
                  height: "5rem",
                }}
              >
                <FileUpload
                  value={file}
                  onChange={(e: any) => {
                    formik.setFieldValue("profile", e?.target.files[0]);
                    setFile(e);
                  }}
                  allowedTypes=".jpg, .jpeg, .png, .gif, .webp"
                />
              </Avatar>
            </label>
            {EDIT_TUTOR_PROFILE_SCHEMA.map((inputItem) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: JSX.IntrinsicAttributes & TextFieldProps & SelectProps;
                }) => {
                  if (inputItem.type === "country") {
                    return (
                      <div className="w-full">
                        <p className="whitespace-nowrap pb-2">
                          {profilePage(selectedLanguage).selectYourCountry}
                          <span className="pl-1 text-gray-500">*</span>
                        </p>
                        <CountrySelector
                          // countryDetails={countryDetails}
                          // isDisabled={true}
                          countryDetails={countryDetails || user?.country || ""}
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
                        value={formik?.values[inputItem.name]}
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
                {profilePage(selectedLanguage).save}
              </LoadingButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TutorProfile;
