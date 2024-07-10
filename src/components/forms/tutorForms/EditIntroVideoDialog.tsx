import { Close, EditOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FileUpload from "components/core/FileUpload";
import { useAppContext } from "contexts";
import { useFormik } from "formik";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { dataContent, lectureSectionPage } from "locale";
import { useRouter } from "next/router";
import * as React from "react";
import AddIntroVideoialog from "./AddIntroVideoDialog";

export default function EditIntroVideoDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const { selectedLanguage } = useAppContext();
  const [file, setFile] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: introData, mutate: mutate } = useSWRAPI(
    `intro/get-introVideo?courseId=${router?.query?.sectionId}`
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { mutation } = useMutation();

  //? tutor registration array
  const initialValues = {};
  const formik = useFormik({
    initialValues: introData
      ? {
          VideoFile: introData?.data?.data?.introMaterialUrl,
        }
      : initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        let res:
          | {
              results: any;
              status: number;
            }
          | undefined;

        formData?.append("introMaterial", file);

        if (router?.query?.sectionId) {
          res = await mutation(
            `intro/update-introVideo/${introData?.data?.data?._id}`,
            {
              method: "PUT",
              body: formData,
              isFormData: true,
              isAlert: true,
            }
          );
          mutate?.();
          setFile(null);
          handleClose();
          setIsLoading(false);

          formik.resetForm();
        } else {
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
  });
  return (
    <React.Fragment>
      {introData?.data?.data === null ? (
        <AddIntroVideoialog mutate={mutate} />
      ) : (
        <>
          <div
            className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
            onClick={handleClickOpen}
          >
            <EditOutlined className="text-2xl" />
            <p className="text-lg font-medium">
              {" "}
              {dataContent(selectedLanguage).Previewintro}
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
                {lectureSectionPage(selectedLanguage).updateVideo}
              </h1>
            </DialogTitle>
            <DialogContent>
              <div className="max-h-full overflow-scroll">
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className="mb-2 block text-xl font-semibold text-primary">
                      {dataContent(selectedLanguage).preview}
                    </h1>
                    <div className="w-full">
                      <video
                        controls
                        controlsList="nodownload"
                        className="w-full h-60 object-cover shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl"
                        style={{
                          height: "15rem",
                        }}
                      >
                        <source src={introData?.data?.data?.introMaterialUrl} />
                      </video>
                    </div>
                  </div>
                  <div>
                    <form>
                      <div>
                        <label className="mb-2 block text-xl font-semibold text-primary">
                          {lectureSectionPage(selectedLanguage).updateVideo}
                          <span className="text-red-500">*</span>
                        </label>
                        <FileUpload
                          variant={"square"}
                          value={file}
                          onChange={(e: any) => {
                            formik.setFieldValue(
                              "VideoFile",
                              e?.target.files[0]
                            );
                            setFile(e.target.files[0]);
                          }}
                          width="100%"
                          height={175}
                          txtName={lectureSectionPage(selectedLanguage).video}
                          allowedTypes=".mp4"
                          className="object-contain overflow-hidden bg-primary/10"
                        />
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
                          lectureSectionPage(selectedLanguage).update
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="absolute top-2 right-5">
              <Close
                onClick={handleClose}
                className="text-red-600 cursor-pointer"
              />
            </DialogActions>
          </Dialog>
        </>
      )}
    </React.Fragment>
  );
}
