/* eslint-disable @next/next/no-img-element */
import {
  AccountCircleRounded,
  AddCircleOutline,
  Close,
  DeleteOutline,
  LiveTvOutlined,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { LECTURE } from "assets/animations";
import { COURSEDEFAULT } from "assets/images";
import { SelectStudentDialog } from "components/forms";
import EditSchedule from "components/forms/tutorForms/EditSchedule";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useAuth, useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import {
  dataContent,
  deleteContent,
  tutorCourseDetailContent,
  tutorLiveClassPage,
} from "locale";
import Link from "next/link";
import { useState } from "react";
import Lottie from "react-lottie";
import Swal from "sweetalert2";
import { ScheduleDataType } from "types/schedule";
import showError from "utils/error";
import * as Yup from "yup";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LECTURE,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Schedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useAppContext();
  const { data: liveClassData, mutate } = useSWRAPI("class/current-day-class");

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <TutorPanelLayout title="schedule | StreamStudent">
      <article className="flex flex-col gap-5 relative">
        <div
          className="flex items-center gap-2 absolute right-2 top-0 border-2 border-primary px-3 lg:py-2 py-1 bg-primary/10 text-primary rounded-md cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <AddCircleOutline className="text-xl lg:text-2xl" />
          <p className="text-lg font-bold">
            {tutorLiveClassPage(selectedLanguage).ScheduleLiveClass}
          </p>
        </div>
        <section className="flex flex-col gap-4 mt-[4rem]">
          <h2 className="title-styling  font-bold pb-6">
            {tutorLiveClassPage(selectedLanguage).upComingLiveClass}
          </h2>
          {liveClassData?.data?.data?.data?.length ? (
            <aside className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
              {liveClassData?.data?.data?.data.map((item: ScheduleDataType) => (
                <ScheduleCard item={item} key={item._id} mutate={mutate} />
              ))}
            </aside>
          ) : (
            <Lottie options={defaultOptions} height={300} width={300} />
          )}
        </section>
        <Dialog
          open={isOpen}
          onClose={handleClose}
          keepMounted={false}
          fullWidth
          maxWidth="md"
          PaperProps={{
            style: { borderRadius: "1.5rem" },
          }}
        >
          <section className="relative h-[43rem]">
            <span className="absolute top-2 right-2">
              <IconButton onClick={handleClose}>
                <Close fontSize="large" className="!text-red-600" />
              </IconButton>
            </span>
            <aside>
              <ScheduleForm handleClose={handleClose} mutate={mutate} />
            </aside>
          </section>
        </Dialog>
      </article>
    </TutorPanelLayout>
  );
};

export default Schedule;

// ? schedule form

const ScheduleForm = ({
  handleClose,
  mutate,
}: {
  handleClose: () => void;
  mutate: () => void;
}) => {
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState("choose the structure");
  const [paidValue, setPaidValue] = useState<number | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [paidError, setPaidError] = useState("");
  const { data: allCourses } = useSWRAPI(`tutor/all-course/${user?._id}`);
  const { selectedLanguage } = useAppContext();

  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };
  const initialValues = {
    courseName: "",
    topicName: "",
    startTime: `${new Date()}`,
    endTime: `${new Date()}`,
  };

  // `${tutorLiveClassPage(selectedLanguage).Starttimefuture}`;

  const validationSchema = Yup.object({
    courseName: Yup.string().required(
      `${tutorLiveClassPage(selectedLanguage).CourseNamequired}`
    ),
    topicName: Yup.string().required(
      `${tutorLiveClassPage(selectedLanguage).TopicNamequired}`
    ),
    startTime: Yup.string()
      .test(
        "is-future",
        `${tutorLiveClassPage(selectedLanguage).Starttimefuture}`,
        function (value) {
          const startDateTime = new Date(value as string);
          return startDateTime > new Date();
        }
      )
      .required(`${tutorLiveClassPage(selectedLanguage).Starttimerequired}`),
    endTime: Yup.string()
      .test(
        "is-after-start",
        `${tutorLiveClassPage(selectedLanguage).EndTimefuture}`,
        function (value) {
          const startDateTime = new Date(`${this.parent.startTime}`);
          const endDateTime = new Date(`${value}`);
          return endDateTime > startDateTime;
        }
      )
      .required(`${tutorLiveClassPage(selectedLanguage).Endtimerequired}`),
  });

  const { mutation } = useMutation();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const requestBody: {
        paymentMethod: string;
        price?: number;
      } = {
        paymentMethod: "FREE",
        price: 0,
      };

      try {
        if (selectedMethod === "PAID") {
          if (
            typeof paidValue === "undefined" ||
            paidValue < 0 ||
            isNaN(paidValue)
          ) {
            setPaidError("Please enter a valid fee.");
            setLoading(false);
            return;
          }

          requestBody.paymentMethod = "PAID";
          requestBody.price = paidValue;
        }
        setLoading(true);
        const res = await mutation("class/create-class", {
          method: "POST",
          body: {
            course: values?.courseName,
            timeOfEnter: new Date(values?.startTime).toISOString(),
            timeOfExit: new Date(values?.endTime).toISOString(),
            classTitle: values?.topicName,
            paymentMethod: requestBody.paymentMethod,
            price: requestBody.price,
          },
          isAlert: true,
        });
        handleClose();
        mutate();
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        formik.resetForm();
        setLoading(false);
      }
    },
  });
  // const { selectedLanguage } = useAppContext();

  return (
    <article className="flex flex-col items-center justify-center gap-8 p-12">
      <h1 className="text-4xl font-bold text-primary text-center">
        {tutorLiveClassPage(selectedLanguage).AddLiveClass}
      </h1>
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <div className="w-full ">
            <FormControl className="mb-4" fullWidth>
              <label className="my-2 block text-xl font-semibold text-primary">
                {tutorLiveClassPage(selectedLanguage).courseName}
                <span className="text-red-500">*</span>
              </label>
              <Select
                placeholder="Course Name"
                name="courseName"
                value={formik.values.courseName || "Select a course"}
                onChange={(e) => {
                  formik.setFieldValue("courseName", e.target.value);
                }}
              >
                <MenuItem value="Select a course" disabled>
                  Select a course
                </MenuItem>

                {allCourses?.data?.success?.data?.data?.map(
                  (item: { _id: string; courseName?: string }) => (
                    <MenuItem
                      key={item._id}
                      value={item?._id}
                      className="text-black bg-white hover:!text-white hover:!bg-primary/70"
                    >
                      {item.courseName}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            {formik.errors.courseName ? (
              <p className="text-red-500">{formik.errors.courseName}</p>
            ) : null}
          </div>
        </div>
        <div>
          <div className="w-full">
            <label className="my-2 block text-xl font-semibold text-primary">
              {tutorLiveClassPage(selectedLanguage).topicName}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder={
                tutorLiveClassPage(selectedLanguage).topicNamePlaceholder
              }
              name="topicName"
              required
              // value={formik.values.topicName}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 hover:border-gray-700 rounded-md p-3 outline-none"
            />
            {formik.errors.topicName ? (
              <p className="text-red-500">{formik.errors.topicName}</p>
            ) : null}
          </div>
        </div>
        <div>
          <FormControl className="mb-4" fullWidth>
            <label className="text-xl font-semibold text-primary">
              {dataContent(selectedLanguage).Selectstructure}:
            </label>
            <Select
              value={selectedMethod}
              onChange={(e) => handleMethodChange(e.target.value)}
            >
              <MenuItem value="choose the structure" disabled>
                choose the structure
              </MenuItem>
              <MenuItem value="FREE">FREE</MenuItem>
              <MenuItem value="PAID">PAID</MenuItem>
            </Select>
          </FormControl>
          {selectedMethod === "PAID" && (
            <div className="">
              <label className="text-lg text-primary font-semibold">
                {dataContent(selectedLanguage).EnterFee}:
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={paidValue}
                  onChange={(e) => setPaidValue(parseFloat(e.target.value))}
                  className="p-2 border border-gray-300 hover:border-gray-700 rounded-md w-32"
                />
              </div>
              {paidError && (
                <p className="text-red-600 text-sm mt-1">{paidError}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="my-2 block text-xl font-semibold text-primary">
                {tutorLiveClassPage(selectedLanguage).StartTime}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-300 hover:border-gray-700 rounded-md p-3 outline-none"
                type="datetime-local"
                required
                name="startTime"
                onChange={(e) => {
                  formik.setFieldValue("startTime", e.target.value);
                }}
              />
              {formik.errors.startTime ? (
                <p className="text-red-500">
                  {Boolean(formik.errors.startTime) && formik.errors.startTime}
                </p>
              ) : null}
            </div>
            <div className="w-1/2">
              <label className="my-2 block text-xl font-semibold text-primary">
                {tutorLiveClassPage(selectedLanguage).EndTime}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border cursor-pointer border-gray-300 hover:border-gray-700 rounded-md p-3 outline-none"
                type="datetime-local"
                required
                name="endTime"
                onChange={(e) => {
                  formik.setFieldValue("endTime", e.target.value);
                }}
              />
              {formik.errors.endTime ? (
                <p className="text-red-500">{formik.errors.endTime}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            type="submit"
            disabled={formik.isSubmitting && isLoading}
            startIcon={
              isLoading ? <CircularProgress size={24} color="success" /> : ""
            }
            className="w-60 !bg-primary/90 !text-white !hover:bg-primary text-base font-semibold p-3 rounded-lg"
          >
            {isLoading ? (
              <span className="text-white">
                {tutorLiveClassPage(selectedLanguage).Creating}
              </span>
            ) : (
              <span>
                {tutorLiveClassPage(selectedLanguage).CreateLiveClass}
              </span>
            )}
          </Button>
        </div>
      </form>
    </article>
  );
};

// ? schedule card
const ScheduleCard = ({
  item,
  mutate,
}: {
  item: ScheduleDataType;
  mutate: () => void;
}) => {
  const { selectedLanguage } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const { mutation } = useMutation();
  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false);

  const handleDeleteLiveClass = () => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).YesRemoveit,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(
            `class/delete-class?classId=${item?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate();
        }
        setIsLoading(false);
      });
    } catch (error) {
      showError(error);
      setIsLoading(false);
    }
  };
  console.log(item);
  return (
    <article className="relative group p-4 bg-white border-t-4 border-primary rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 text-xl">
          <h1 className="text-lg font-semibold">
            {item?.CourseData?.courseName ||
              dataContent(selectedLanguage).Notgiven}
          </h1>
          <h3 className="text-base font-semibold">
            {item?.classTitle || dataContent(selectedLanguage).Notgiven}
          </h3>

          <p className="flex items-center text-sm font-semibold gap-3">
            <span>{tutorLiveClassPage(selectedLanguage).startAt}: </span>
            <span>
              {dayjs(
                item?.timeOfEnter || dataContent(selectedLanguage).Notgiven
              ).format("ddd, MMM D, YYYY h:mm A")}
            </span>
          </p>
          <p className="flex items-center text-sm font-semibold gap-3">
            <span>{tutorLiveClassPage(selectedLanguage).endAt}: </span>
            {dayjs(
              item?.timeOfExit || dataContent(selectedLanguage).Notgiven
            ).format("ddd, MMM D, YYYY h:mm A")}
          </p>
          {item?.price > 0 && <CouponButton item={item} />}
        </div>
        <div className="overflow-hidden flex flex-col gap-3">
          {item?.price > 0 && (
            <div className="bg-primary/80 text-white rounded-md p-2 text-lg">
              <p className="mb-0">Price:</p>
              <p className="text-2xl font-bold">
                ${item?.price || dataContent(selectedLanguage).Notgiven}
              </p>
            </div>
          )}
          <img
            className=" object-cover object-center lg:w-32 md:w-24 w-16 md:block lg:block bg-primary/20 p-1 rounded-md"
            src={item?.CourseData?.thumbnailUrl || COURSEDEFAULT.src}
            alt="..."
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 justify-between">
        <SelectStudentDialog
          open={openEditPrescriptionDrawer}
          setOpenEditPrescriptionDrawer={() => setOpenEditPrescriptionDrawer}
          onClose={() => setOpenEditPrescriptionDrawer(false)}
          courseId={item?.CourseData?._id}
          classId={item?._id}
        />
        <Link href={`/class/${item?._id}`}>
          <div className=" flex gap-2 items-center border-2 border-blue-600 bg-blue-600/20 text-blue-600 px-2 py-[0.14rem] rounded-md cursor-pointer">
            <LiveTvOutlined />
            <p className="text-[1.15rem] font-bold mt-1">
              {tutorLiveClassPage(selectedLanguage).StartLiveClass}
            </p>
          </div>
        </Link>
      </div>
      <div className="invisible absolute top-6 right-0 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible group-hover:bg-gray-900 p-2 rounded-md">
        <Link href={`/tutor-account/schedule/view-responses/${item?._id}`}>
          <Tooltip
            title={tutorCourseDetailContent(selectedLanguage).viewResponses}
            followCursor
            placement="top-start"
            arrow
          >
            <button className="w-8 h-8 grid place-items-center rounded-full border border-blue-500 bg-blue-500/10 text-blue-500">
              <AccountCircleRounded fontSize="small" />
            </button>
          </Tooltip>
        </Link>
        <EditSchedule data={item} mutate={mutate} />
        <Tooltip
          title={`${tutorLiveClassPage(selectedLanguage).DeleteLiveClass}`}
          followCursor
          placement="top-start"
          arrow
        >
          <button
            className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
            onClick={handleDeleteLiveClass}
          >
            <DeleteOutline fontSize="small" />
          </button>
        </Tooltip>
      </div>
    </article>
  );
};

const CouponForm = ({
  item,
  handleClose,
  couponMutate,
}: {
  item: any;
  handleClose: () => void;
  couponMutate: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    discount: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    discount: Yup.number()
      .required("Discount is required")
      .max(100, "Discount must be less than or equal to 100%")
      .min(0, "Discount can't be negative"),
  });

  const { mutation } = useMutation();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await mutation(
          `coupon/create-coupon?classId=${item?._id}`,
          {
            method: "POST",
            body: {
              title: values?.title,
              discount: values?.discount,
              className: item?.classTitle,
            },
            isAlert: true,
          }
        );
        handleClose();
        couponMutate();
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        formik.resetForm();
        setLoading(false);
      }
    },
  });
  const { selectedLanguage } = useAppContext();

  return (
    <article className="flex flex-col items-center justify-center gap-8 p-12">
      <h1 className="text-4xl font-bold text-primary text-center">
        {tutorLiveClassPage(selectedLanguage).createCoupon}
      </h1>

      <form
        className="w-full flex flex-col gap-5"
        onSubmit={formik.handleSubmit}
      >
        <div className="w-full">
          <label className="my-2 block text-xl font-semibold text-primary">
            {tutorLiveClassPage(selectedLanguage).title}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder={tutorLiveClassPage(selectedLanguage).couponTitle}
            name="title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full border-2 border-primary rounded-md p-3 outline-none"
          />
          {formik.errors.title ? (
            <p className="text-red-500 mt-1">{formik.errors.title}</p>
          ) : null}
        </div>
        <div className="w-full">
          <label className="my-2 block text-xl font-semibold text-primary">
            {tutorLiveClassPage(selectedLanguage).Discount}
            <span className="text-red-500">*</span>
            <span className="text-gray-500">(%)</span>
          </label>
          <input
            type="number"
            placeholder={tutorLiveClassPage(selectedLanguage).discount}
            name="discount"
            required
            value={formik.values.discount}
            onChange={formik.handleChange}
            className="w-full border-2 border-primary rounded-md p-3 outline-none"
          />
          {formik.errors.discount ? (
            <p className="text-red-500 mt-1">{formik.errors.discount}</p>
          ) : null}
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          <Button
            type="submit"
            disabled={formik.isSubmitting && isLoading}
            startIcon={
              isLoading ? <CircularProgress size={24} color="success" /> : ""
            }
            className="w-60 !bg-primary/90 !text-white !hover:bg-primary text-base font-semibold p-3 rounded-lg"
          >
            {isLoading ? (
              <span className="text-white">
                {tutorLiveClassPage(selectedLanguage).Creating}
              </span>
            ) : (
              <span>{tutorLiveClassPage(selectedLanguage).createCoupon}</span>
            )}
          </Button>
        </div>
      </form>
    </article>
  );
};

const CouponButton = ({ item }: { item: any }) => {
  const [createdCoupon, setCreatedCoupon] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [openCoupon, setOpenCoupon] = useState(false);
  const { selectedLanguage } = useAppContext();

  const { data: couponData, mutate: couponMutate } = useSWRAPI(
    `coupon/get-coupon-code?classId=${item?._id}`
  );

  const handleCloseCoupon = () => {
    setOpenCoupon(false);
  };
  const copyToClipboard = (text: any) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleCopyCoupon = () => {
    if (couponData?.data?.data[0]?.code) {
      copyToClipboard(couponData?.data?.data[0]?.code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <div>
        {!couponData?.data?.data[0] && !couponData?.data?.data[0]?.code && (
          <button
            onClick={() => setOpenCoupon(true)}
            className="bg-green-700 text-white py-2 px-6 text-sm rounded-md hover:bg-green-700/80 transition duration-300"
          >
            {dataContent(selectedLanguage).CreateCoupon}
          </button>
        )}
        {couponData?.data?.data[0] && couponData?.data?.data[0]?.code && (
          <div className="mt-1">
            <h2 className="text-xl font-semibold text-green-600">
              {dataContent(selectedLanguage).CouponCreated}:
            </h2>
            <div className="bg-white rounded-lg border border-gray-300 shadow-md p-4 flex items-center gap-4">
              <div>
                <p className="text-primary font-medium text-sm">
                  <span className="text-secondary font-semibold">
                    {dataContent(selectedLanguage).CouponTitle}:
                  </span>{" "}
                  {couponData?.data?.data[0]?.title}
                </p>
                {/* <p className="text-primary font-medium text-sm">
                  <span className="text-secondary font-semibold">
                    Description:
                  </span>{" "}
                  {couponData?.data?.data[0]?.description}
                </p> */}
                <p className="text-primary font-medium text-sm">
                  <span className="text-secondary font-semibold">
                    {dataContent(selectedLanguage).Discount}:
                  </span>{" "}
                  {couponData?.data?.data[0]?.discount}% off
                </p>
                <p className="text-primary font-medium text-sm flex items-center gap-1">
                  <span className="text-secondary text-md font-semibold">
                    {dataContent(selectedLanguage).Code}:
                  </span>{" "}
                  <div className="bg-gray-200 py-1 px-3 flex items-center gap-3">
                    <span
                      className={`${
                        isCopied
                          ? "text-green-500 bg-white px-1"
                          : "bg-white px-1"
                      }`}
                    >
                      {couponData?.data?.data[0]?.code}
                    </span>
                    <button
                      onClick={handleCopyCoupon}
                      className={`${
                        isCopied
                          ? "bg-green-600 text-white"
                          : "bg-primary/70 text-white"
                      } py-1 px-4 text-sm rounded-lg transition duration-300 hover:bg-green-600`}
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Dialog
          open={openCoupon}
          onClose={handleCloseCoupon}
          PaperProps={{
            style: {
              borderRadius: "1.5rem",
              maxHeight: "50%",
              width: "60%",
            },
          }}
        >
          <section className="relative h-[43rem]">
            <span className="absolute top-2 right-2">
              <IconButton onClick={handleCloseCoupon}>
                <Close fontSize="large" className="!text-red-600" />
              </IconButton>
            </span>
            <aside>
              <CouponForm
                handleClose={handleCloseCoupon}
                item={item}
                couponMutate={couponMutate}
              />
            </aside>
          </section>
        </Dialog>
      </div>
    </>
  );
};
