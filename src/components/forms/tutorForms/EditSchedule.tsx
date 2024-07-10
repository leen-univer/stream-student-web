import { Close, EditOutlined } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { tutorLiveClassPage } from "locale";
import { useState } from "react";
import { ScheduleDataType } from "types/schedule";
import { convertedDateFunc } from "utils/ConvertedDate";
import * as Yup from "yup";

const EditSchedule = ({
  data,
  mutate,
}: {
  data: ScheduleDataType;
  mutate: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { selectedLanguage } = useAppContext();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const entryTime = convertedDateFunc(data?.timeOfEnter);
  const exitTime = convertedDateFunc(data?.timeOfExit);

  const initialValues = {
    topicName: data?.classTitle ? data?.classTitle : "",
    startTime: data?.timeOfEnter ? entryTime : "",
    endTime: data?.timeOfExit ? exitTime : "",
  };

  const validationSchema = Yup.object({
    startTime: Yup.string()
      .test(
        // "is-future",
        // selectedLanguage === "ar"
        //   ? "ytjytj"
        //   : "Start time must be in the future",
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
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await mutation(`class/update-class/${data?._id}`, {
          method: "PUT",
          body: {
            classTitle: values?.topicName,
            timeOfEnter: new Date(values?.startTime).toISOString(),
            timeOfExit: new Date(values?.endTime).toISOString(),
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

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle className="flex items-center justify-center">
          <h1 className="text-3xl font-bold py-2">
            {tutorLiveClassPage(selectedLanguage).EditLiveClass}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <form
              className="w-full flex flex-col gap-5"
              onSubmit={formik.handleSubmit}
            >
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
                    value={formik.values.topicName}
                    onChange={formik.handleChange}
                    className="w-full border border-gray-300 hover:border-gray-700 rounded-md p-3 outline-none"
                  />
                  {formik.errors.topicName ? (
                    <p className="text-red-500">{formik.errors.topicName}</p>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="my-2 block text-xl font-semibold text-primary">
                      {tutorLiveClassPage(selectedLanguage).StartTime}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border-2 border-primary rounded-md p-3 outline-none"
                      type="datetime-local"
                      required
                      name="startTime"
                      value={formik.values.startTime}
                      onChange={(e) => {
                        formik.setFieldValue("startTime", e.target.value);
                      }}
                    />
                    {formik.errors.startTime ? (
                      <p className="text-red-500">
                        {Boolean(formik.errors.startTime) &&
                          formik.errors.startTime}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-1/2">
                    <label className="my-2 block text-xl font-semibold text-primary">
                      {tutorLiveClassPage(selectedLanguage).EndTime}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border-2 border-primary rounded-md p-3 outline-none"
                      type="datetime-local"
                      required
                      name="endTime"
                      value={formik.values.endTime}
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
                    isLoading ? (
                      <CircularProgress size={24} color="success" />
                    ) : (
                      ""
                    )
                  }
                  className="w-60 !bg-primary/90 !text-white !hover:bg-primary text-base font-semibold p-3 rounded-lg"
                >
                  {isLoading ? (
                    <span className="text-white">
                      {tutorLiveClassPage(selectedLanguage).Updating}
                    </span>
                  ) : (
                    <span>
                      {tutorLiveClassPage(selectedLanguage).UpdateLiveClass}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={() => handleClose()}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>

      <Tooltip
        title={`${tutorLiveClassPage(selectedLanguage).EditLiveClass}`}
        followCursor
        placement="top-start"
        arrow
      >
        <button
          onClick={handleClickOpen}
          className="w-8 h-8 grid place-items-center rounded-full border border-amber-500 bg-amber-500/10 text-amber-500"
        >
          <EditOutlined fontSize="small" />
        </button>
      </Tooltip>
    </>
  );
};

export default EditSchedule;
