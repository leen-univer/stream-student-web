import { Add, Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import useMutation from "hooks/useMutataion";
import { dataContent, lectureSectionPage } from "locale";
import { useRouter } from "next/router";
import * as React from "react";
import * as yup from "yup";

export default function AddIntroVideoialog({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [loading, setLoading] = React.useState(false);
  const { selectedLanguage } = useAppContext();

  const router = useRouter();
  const [file, setFile] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [videoError, setVideoError] = React.useState("");
  const { mutation } = useMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const initialValue = {};

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: yup.object(),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setVideoError("");
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        if (!file) {
          setVideoError(`${dataContent(selectedLanguage).videoReq}`);
          setIsLoading(false);
          return;
        }

        formData?.append("introMaterial", file?.target?.files[0] as any);
        if (router?.query?.sectionId) {
          res = await mutation(
            `intro/create-introVideo?courseId=${router?.query?.sectionId}`,
            {
              method: "POST",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          mutate();
          setFile(null);
          handleClose();
          setIsLoading(false);
          formik.resetForm();
        } else {
        }
      } catch (error) {
        setIsLoading(false);
        mutate();
      }
    },
  });

  return (
    <React.Fragment>
      <>
        <div
          className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
          onClick={handleClickOpen}
        >
          <Add className="text-2xl" />
          <p className="text-lg font-medium">
            {" "}
            {dataContent(selectedLanguage).Addintro}
          </p>
        </div>
        <Dialog
          fullWidth={fullWidth}
          maxWidth="sm"
          open={open}
          onClose={handleClose}
        >
          <DialogTitle className="flex items-center justify-center">
            <h1 className="text-3xl font-bold py-2">
              {" "}
              {dataContent(selectedLanguage).Addintro}
            </h1>
          </DialogTitle>
          <DialogContent>
            <div className="max-h-full overflow-scroll">
              <form>
                <div>
                  <label className="my-2 block text-xl font-semibold text-primary">
                    {lectureSectionPage(selectedLanguage).video}
                    <span className="text-red-500">*</span>
                  </label>
                  <FileUpload
                    variant={"square"}
                    value={file}
                    onChange={(e: any) => {
                      formik.setFieldValue("thumbnail", e?.target.files[0]);
                      setFile(e);
                    }}
                    width="100%"
                    height={175}
                    txtName={lectureSectionPage(selectedLanguage).video}
                    allowedTypes=".mp4"
                    className="object-contain overflow-hidden bg-primary/10"
                  />
                  {videoError && <p className="text-red-500">{videoError}</p>}
                </div>
              </form>
              <div className="w-full flex items-center justify-center mt-6">
                <button
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting}
                  className={`bg-primary/90 px-8 py-3 text-xl font-bold text-gray-100 hover:bg-primary duration-300 rounded-md ${
                    formik.isSubmitting ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <CircularProgress size={20} className="!text-white" />
                  ) : (
                    lectureSectionPage(selectedLanguage).add
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="absolute top-2 right-3">
            <Close
              onClick={handleClose}
              className="text-red-600 cursor-pointer"
            />
          </DialogActions>
        </Dialog>
      </>
    </React.Fragment>
  );
}
