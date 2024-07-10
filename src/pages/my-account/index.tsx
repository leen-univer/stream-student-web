import {
  East,
  Edit,
  Email,
  ImageSearchRounded,
  Person,
  Phone,
  UploadFile,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Avatar, InputAdornment, Radio, TextField } from "@mui/material";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { AccountLayout, PublicLayout } from "layouts";
import { studentAccountContent } from "locale";
import { useState } from "react";
import * as Yup from "yup";

const MyAccount = () => {
  const { selectedLanguage } = useAppContext();
  return (
    <PublicLayout
      title="My Account | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <article className="w-full">
          <h1 className="title-styling text-center">
            {studentAccountContent(selectedLanguage).ProfileInformation}
          </h1>
          <AccountDetailsForm />
        </article>
      </AccountLayout>
    </PublicLayout>
  );
};

const AccountDetailsForm = () => {
  const { selectedLanguage } = useAppContext();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [id, setId] = useState(0);

  const { mutation: updateProfileMutate } = useMutation();

  const { user } = useAuth();
  const userData = user;

  //? initial values & validation set
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profile: null,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(
      studentAccountContent(selectedLanguage).NameRequired
    ),
    email: Yup.string()
      .email("Invalid Email!")
      .required(studentAccountContent(selectedLanguage).EmailRequired),
    phoneNumber: Yup.string()
      .max(15, "Phone number should be of Max 15 digits")
      .min(6, "Phone number should be of Min 6 digits")
      .required(studentAccountContent(selectedLanguage).PhoneNumberRequired),
    profile: Yup.mixed(),
    // .test(
    //   "fileSize",
    //   "Image file size is too large",
    //   (value: any) => value && value.size <= 5000000 // 5MB max size
    // )
    // .test(
    //   "fileType",
    //   "Invalid file format. Only JPEG, PNG, and GIF are allowed",
    //   (value: any) => {
    //     // if (!value) return true; // Skip if no file uploaded
    //     const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
    //     return acceptedFormats.includes(value.type);
    //   }
    // ),
  });

  //? Form Handle Submit Function
  const formik: any = useFormik({
    initialValues: user
      ? {
          name: userData?.name,
          email: userData?.email,
          phoneNumber: userData?.phoneNumber,
          profile: userData?.profileUrl,
          gender: userData?.gender,
        }
      : initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values: any, props: { resetForm: () => void }) => {
      try {
        const formData = new FormData();
        let res;
        formData?.append("name", values?.name);
        formData?.append("email", values?.email);
        formData?.append("phoneNumber", values?.phoneNumber);
        formData?.append("gender", values?.gender);
        values?.profileUrl &&
          formData?.append("profileImage", values?.profileUrl);
        if (user) {
          res = await updateProfileMutate(
            `gen/studentUpdate/${userData?._id}`,
            {
              method: "PUT",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          // mutate?.();
          // handleClose();
          setIsEditClicked(false);
        }
      } catch (error) {}
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center gap-10"
    >
      <div className="flex w-full justify-end">
        {isEditClicked ? (
          <button
            className="tracking-wide font-semibold text-red-600 hover:underline"
            onClick={() => setIsEditClicked(false)}
            type="button"
          >
            {studentAccountContent(selectedLanguage).Cancel}
          </button>
        ) : (
          <button
            className="flex items-center tracking-wide font-semibold text-amber-500 hover:underline"
            onClick={() => setIsEditClicked(true)}
            type="button"
          >
            <Edit className="!text-base" />{" "}
            {studentAccountContent(selectedLanguage).Edit}
          </button>
        )}
      </div>
      <section className="w-full flex flex-col items-center gap-6 md:w-1/2">
        <label htmlFor="avatar" className="relative">
          <Avatar
            alt="profile"
            src={
              // typeof formik.values?.profile === "string"
              //   ? formik.values?.profile
              //   : formik.values?.profile instanceof Blob
              //   ? URL.createObjectURL(formik.values?.profile)
              //   : "/profile.jpg"
              formik.values?.profileUrl
                ? URL.createObjectURL(formik.values?.profileUrl)
                : user?.profileUrl
            }
            style={{
              width: "5rem",
              height: "5rem",
            }}
          >
            <UploadFile />
          </Avatar>
          {isEditClicked && (
            <input
              key={id}
              type="file"
              name="profileUrl"
              hidden
              id="avatar"
              accept="image/jpeg, image/png, image/webp, image/jpg"
              onChange={(e: any) => {
                setId((prev) => prev + 1);
                formik.setFieldValue("profileUrl", e.target.files[0]);
                setAvatarFile(e);
              }}
            />
          )}

          {isEditClicked && (
            <ImageSearchRounded className="absolute right-0 bottom-0 text-gray-500" />
          )}
        </label>
        <div className="w-full">
          <TextField
            fullWidth
            id="standard-basic"
            variant="standard"
            label={studentAccountContent(selectedLanguage).YourName}
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && (formik.errors.name as any)}
            inputProps={{
              readOnly: isEditClicked ? false : true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-full flex items-end gap-2">
          <TextField
            fullWidth
            id="standard-basic"
            variant="standard"
            disabled={true}
            label={studentAccountContent(selectedLanguage).YourEmail}
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && (formik.errors.email as any)}
            inputProps={{
              readOnly: isEditClicked ? false : true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />
          {/* <span className="group flex items-center gap-0.5 text-sm text-blue-500 tracking-wide cursor-pointer hover:underline">
            {studentAccountContent(selectedLanguage).Verify}{" "}
            <ArrowForward className="!text-base group-hover:!translate-x-1 common-transition" />
          </span> */}
        </div>
        <div className="w-full">
          <TextField
            fullWidth
            id="standard-basic"
            variant="standard"
            label={studentAccountContent(selectedLanguage).YourPhoneNumber}
            type="number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={(e) => {
              formik.setFieldValue("phoneNumber", e.target.value);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={
              formik.touched.phoneNumber && (formik.errors.phoneNumber as any)
            }
            inputProps={{
              readOnly: isEditClicked ? false : true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <aside className="w-full flex items-end justify-between">
          <div>
            <p className="tracking-wide mb-1">
              {studentAccountContent(selectedLanguage).SelectYourGender}
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:justify-start">
              <span className="flex items-center gap-1">
                <Radio
                  checked={formik.values.gender === "MALE"}
                  onChange={() => formik.setFieldValue("gender", "MALE")}
                  value="MALE"
                  size="small"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "MALE" }}
                  className="!p-0"
                />
                <p className="text-sm font-medium tracking-wide">
                  {studentAccountContent(selectedLanguage).Male}
                </p>
              </span>
              <span className="flex items-center gap-1">
                <Radio
                  checked={formik.values.gender === "FEMALE"}
                  onChange={() => formik.setFieldValue("gender", "FEMALE")}
                  value="FEMALE"
                  size="small"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "FEMALE" }}
                  className="!p-0"
                />
                <p className="text-sm font-medium tracking-wide">
                  {studentAccountContent(selectedLanguage).Female}
                </p>
              </span>
              {/* <span className="flex items-center gap-1">
                <Radio
                  checked={formik.values.gender === "OTHER"}
                  onChange={() => formik.setFieldValue("gender", "OTHER")}
                  value="OTHER"
                  size="small"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "OTHER" }}
                  className="!p-0"
                />
                <p className="text-sm font-medium tracking-wide">
                  {studentAccountContent(selectedLanguage).Other}
                </p>
              </span> */}
            </div>
          </div>
          {isEditClicked && (
            <div className="flex place-content-center mt-2">
              <LoadingButton
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting || !formik.isValid}
                type="submit"
                variant="text"
                size="medium"
                className="group !tracking-wide !text-primary !font-semibold hover:!underline disabled:!cursor-not-allowed disabled:!text-gray-400"
              >
                {studentAccountContent(selectedLanguage).Save}
                <East
                  fontSize="small"
                  className="!ml-1 group-hover:translate-x-2 common-transition"
                />
              </LoadingButton>
            </div>
          )}
        </aside>
      </section>
    </form>
  );
};

export default MyAccount;

// import {
//   East,
//   Edit,
//   Email,
//   ImageSearchRounded,
//   Person,
//   Phone,
//   UploadFile,
// } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { Avatar, InputAdornment, Radio, TextField } from "@mui/material";
// import { useAppContext } from "contexts";
// import { useFormik } from "formik";
// import { useAuth, useSWRAPI } from "hooks";
// import useMutation from "hooks/useMutataion";
// import { AccountLayout, PublicLayout } from "layouts";
// import { studentAccountContent } from "locale";
// import { useState } from "react";
// import * as Yup from "yup";

// const MyAccount = () => {
//   const { selectedLanguage } = useAppContext();
//   return (
//     <PublicLayout
//       title="My Account | StreamStudent"
//       footerBgColor="bg-primary/20"
//     >
//       <AccountLayout>
//         <article className="w-full">
//           <h1 className="title-styling text-center">
//             {studentAccountContent(selectedLanguage).ProfileInformation}
//           </h1>
//           <AccountDetailsForm />
//         </article>
//       </AccountLayout>
//     </PublicLayout>
//   );
// };

// const AccountDetailsForm = () => {
//   const { selectedLanguage } = useAppContext();
//   const [isEditClicked, setIsEditClicked] = useState(false);
//   const [avatarFile, setAvatarFile] = useState<File | null>(null);
//   const [id, setId] = useState(0);

//   const { mutation: updateProfileMutate } = useMutation();
//   // const { data: user, mutate } = useSWRAPI(`auth/self`);
//   // const userData = user?.data?.success?.data;

//   const { user } = useAuth();
//   const userData = user;

//   //? initial values & validation set
//   const initialValues = {
//     name: "",
//     email: "",
//     phoneNumber: "",
//     gender: "",
//     profile: null,
//   };
//   const validationSchema = Yup.object({
//     name: Yup.string().required(
//       studentAccountContent(selectedLanguage).NameRequired
//     ),
//     email: Yup.string()
//       .email("Invalid Email!")
//       .required(studentAccountContent(selectedLanguage).EmailRequired),
//     phoneNumber: Yup.string().required(
//       studentAccountContent(selectedLanguage).PhoneNumberRequired
//     ),
//     profile: Yup.mixed(),
//     // .test(
//     //   "fileSize",
//     //   "Image file size is too large",
//     //   (value: any) => value && value.size <= 5000000 // 5MB max size
//     // )
//     // .test(
//     //   "fileType",
//     //   "Invalid file format. Only JPEG, PNG, and GIF are allowed",
//     //   (value: any) => {
//     //     // if (!value) return true; // Skip if no file uploaded
//     //     const acceptedFormats = ["image/jpeg", "image/png", "image/gif"];
//     //     return acceptedFormats.includes(value.type);
//     //   }
//     // ),
//   });

//   //? Form Handle Submit Function
//   const formik: any = useFormik({
//     initialValues: user
//       ? {
//           name: userData?.name,
//           email: userData?.email,
//           phoneNumber: userData?.phoneNumber,
//           profile: userData?.profileUrl,
//           gender: userData?.gender,
//         }
//       : initialValues,
//     enableReinitialize: true,
//     validationSchema: validationSchema,
//     onSubmit: async (values: any, props: { resetForm: () => void }) => {
//       try {
//         const formData = new FormData();
//         let res;
//         formData?.append("name", values?.name);
//         formData?.append("email", values?.email);
//         formData?.append("phoneNumber", values?.phoneNumber);
//         formData?.append("gender", values?.gender);
//         values?.profileUrl &&
//           formData?.append("profileImage", values?.profileUrl);
//         if (user) {
//           res = await updateProfileMutate(
//             `gen/studentUpdate/${userData?._id}`,
//             {
//               method: "PUT",
//               body: formData,
//               isFormData: true,
//               isAlert: true,
//             }
//           );
//           // mutate?.();
//           // handleClose();
//         }
//       } catch (error) {
//       }
//     },
//   });

//   //       Swal.fire({
//   //         icon: "success",
//   //         title: "Success",
//   //         text: "Your profile has been updated successfully",
//   //       });
//   //     } catch (error) {
//   //       showError(error);
//   //     }
//   //   },
//   // });
//   return (
//     <form
//       onSubmit={formik.handleSubmit}
//       className="flex flex-col items-center gap-10"
//     >
//       <div className="flex w-full justify-end">
//         {isEditClicked ? (
//           <button
//             className="tracking-wide font-semibold text-red-600 hover:underline"
//             onClick={() => setIsEditClicked(false)}
//             type="button"
//           >
//             {studentAccountContent(selectedLanguage).Cancel}
//           </button>
//         ) : (
//           <button
//             className="flex items-center tracking-wide font-semibold text-amber-500 hover:underline"
//             onClick={() => setIsEditClicked(true)}
//             type="button"
//           >
//             <Edit className="!text-base" />{" "}
//             {studentAccountContent(selectedLanguage).Edit}
//           </button>
//         )}
//       </div>
//       <section className="w-full flex flex-col items-center gap-6 md:w-1/2">
//         <label htmlFor="avatar" className="relative">
//           <Avatar
//             alt="profile"
//             src={
//               // typeof formik.values?.profile === "string"
//               //   ? formik.values?.profile
//               //   : formik.values?.profile instanceof Blob
//               //   ? URL.createObjectURL(formik.values?.profile)
//               //   : "/profile.jpg"
//               formik.values?.profileUrl
//                 ? URL.createObjectURL(formik.values?.profileUrl)
//                 : user?.profileUrl
//             }
//             style={{
//               width: "5rem",
//               height: "5rem",
//             }}
//           >
//             <UploadFile />
//           </Avatar>
//           {isEditClicked && (
//             <input
//               key={id}
//               type="file"
//               name="profileUrl"
//               hidden
//               id="avatar"
//               onChange={(e: any) => {
//                 setId((prev) => prev + 1);
//                 formik.setFieldValue("profileUrl", e.target.files[0]);
//                 setAvatarFile(e);
//               }}
//             />
//           )}

//           {isEditClicked && (
//             <ImageSearchRounded className="absolute right-0 bottom-0 text-gray-500" />
//           )}
//         </label>
//         <div className="w-full">
//           <TextField
//             fullWidth
//             id="standard-basic"
//             variant="standard"
//             label={studentAccountContent(selectedLanguage).YourName}
//             type="text"
//             name="name"
//             value={formik.values.name}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.name && Boolean(formik.errors.name)}
//             helperText={formik.touched.name && (formik.errors.name as any)}
//             inputProps={{
//               readOnly: isEditClicked ? false : true,
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Person />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         <div className="w-full flex items-end gap-2">
//           <TextField
//             fullWidth
//             id="standard-basic"
//             variant="standard"
//             disabled={true}
//             label={studentAccountContent(selectedLanguage).YourEmail}
//             type="email"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && (formik.errors.email as any)}
//             inputProps={{
//               readOnly: isEditClicked ? false : true,
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Email />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           {/* <span className="group flex items-center gap-0.5 text-sm text-blue-500 tracking-wide cursor-pointer hover:underline">
//             {studentAccountContent(selectedLanguage).Verify}{" "}
//             <ArrowForward className="!text-base group-hover:!translate-x-1 common-transition" />
//           </span> */}
//         </div>
//         <div className="w-full">
//           <TextField
//             fullWidth
//             id="standard-basic"
//             variant="standard"
//             label={studentAccountContent(selectedLanguage).YourPhoneNumber}
//             type="number"
//             name="phoneNumber"
//             value={formik.values.phoneNumber}
//             onChange={(e) => {
//               formik.setFieldValue("phoneNumber", e.target.value);
//             }}
//             onBlur={formik.handleBlur}
//             error={
//               formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
//             }
//             helperText={
//               formik.touched.phoneNumber && (formik.errors.phoneNumber as any)
//             }
//             inputProps={{
//               readOnly: isEditClicked ? false : true,
//               minLength: "5",
//               maxLength: "15",
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Phone />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         <aside className="w-full flex items-end justify-between">
//           <div>
//             <p className="tracking-wide mb-1">
//               {studentAccountContent(selectedLanguage).SelectYourGender}
//             </p>
//             <div className="flex flex-col gap-4 md:flex-row md:justify-start">
//               <span className="flex items-center gap-1">
//                 <Radio
//                   checked={formik.values.gender === "MALE"}
//                   onChange={() => formik.setFieldValue("gender", "MALE")}
//                   value="MALE"
//                   size="small"
//                   name="radio-buttons"
//                   inputProps={{ "aria-label": "MALE" }}
//                   className="!p-0"
//                 />
//                 <p className="text-sm font-medium tracking-wide">
//                   {studentAccountContent(selectedLanguage).Male}
//                 </p>
//               </span>
//               <span className="flex items-center gap-1">
//                 <Radio
//                   checked={formik.values.gender === "FEMALE"}
//                   onChange={() => formik.setFieldValue("gender", "FEMALE")}
//                   value="FEMALE"
//                   size="small"
//                   name="radio-buttons"
//                   inputProps={{ "aria-label": "FEMALE" }}
//                   className="!p-0"
//                 />
//                 <p className="text-sm font-medium tracking-wide">
//                   {studentAccountContent(selectedLanguage).Female}
//                 </p>
//               </span>
//               <span className="flex items-center gap-1">
//                 <Radio
//                   checked={formik.values.gender === "OTHER"}
//                   onChange={() => formik.setFieldValue("gender", "OTHER")}
//                   value="OTHER"
//                   size="small"
//                   name="radio-buttons"
//                   inputProps={{ "aria-label": "OTHER" }}
//                   className="!p-0"
//                 />
//                 <p className="text-sm font-medium tracking-wide">
//                   {studentAccountContent(selectedLanguage).Other}
//                 </p>
//               </span>
//             </div>
//           </div>
//           {isEditClicked && (
//             <div className="flex place-content-center mt-2">
//               <LoadingButton
//                 loading={formik.isSubmitting}
//                 disabled={formik.isSubmitting || !formik.isValid}
//                 type="submit"
//                 variant="text"
//                 size="medium"
//                 className="group !tracking-wide !text-primary !font-semibold hover:!underline disabled:!cursor-not-allowed disabled:!text-gray-400"
//               >
//                 {studentAccountContent(selectedLanguage).Save}
//                 <East
//                   fontSize="small"
//                   className="!ml-1 group-hover:translate-x-2 common-transition"
//                 />
//               </LoadingButton>
//             </div>
//           )}
//         </aside>
//       </section>
//     </form>
//   );
// };

// export default MyAccount;
