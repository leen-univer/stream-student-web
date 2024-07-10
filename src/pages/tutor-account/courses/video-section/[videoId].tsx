import {
  CheckCircleOutlineOutlined,
  Close,
  DeleteOutline,
  FileCopyOutlined,
  OndemandVideo,
} from "@mui/icons-material";
import LinkIcon from "@mui/icons-material/Link";
import { CircularProgress, Dialog, IconButton, Tooltip } from "@mui/material";
import {
  AddAssignmentDrawer,
  AddVideoDialog,
  UpdateVideoDialog,
} from "components/forms";
import { MaterialSkeleton } from "components/skeleton";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import { deleteContent, studymaterial } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const VideoSection = () => {
  const router = useRouter();

  const { data, isValidating, mutate } = useSWRAPI(
    `tutor/all-video/${router?.query?.videoId}`
  );

  const { data: documentData, mutate: documentMutate } = useSWRAPI(
    `tutor/all-studyMaterial/${router?.query?.videoId}`
  );
  const { data: linkData, mutate: linkMutate } = useSWRAPI(
    `tutor/all-linkMaterial/${router?.query?.videoId}`
  );

  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false);
  const { selectedLanguage } = useAppContext();

  return (
    <TutorPanelLayout title="LectureVideo-Section | StreamStudent">
      <section className="w-full h-full">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold text-primary uppercase">
              {data?.data?.data?.topic}
            </h1>
          </div>
          <h2 className="text-xl font-medium tracking-wider">
            {data?.data?.data?.description}
          </h2>
        </div>
        <div className="mt-8">
          <div className="flex md:flex-row gap-3 pb-7 md:justify-end flex-col">
            <AddVideoDialog
              mutate={mutate}
              documentMutate={documentMutate}
              linkMutate={linkMutate}
            />
            <AddAssignmentDrawer
              open={openEditPrescriptionDrawer}
              setOpenEditPrescriptionDrawer={() =>
                setOpenEditPrescriptionDrawer
              }
              onClose={() => setOpenEditPrescriptionDrawer(false)}
            />
          </div>
          {data?.data?.data?.VideoData?.length === 0 &&
          documentData?.data?.data?.data[0]?.StudyMaterialData?.length === 0 &&
          linkData?.data?.data?.data[0]?.LinkMaterialData?.length === 0 ? (
            <div className="flex items-center justify-center font-semibold text-4xl">
              {studymaterial(selectedLanguage).NoStudyMaterial}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
              {data?.data?.data?.VideoData?.length > 0 && (
                <div className="space-y-5">
                  <h1 className="font-semibold text-xl text-amber-500">
                    {studymaterial(selectedLanguage).VideoMaterial}
                  </h1>
                  {data?.data?.data?.VideoData && isValidating ? (
                    <MaterialSkeleton />
                  ) : (
                    <div className="flex flex-col gap-5 overflow-scroll h-screen no-scrollbar">
                      {data?.data?.data?.VideoData?.map((Lec: any) => (
                        <VideoCard key={Lec.id} data={Lec} mutate={mutate} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {documentData?.data?.data?.data[0]?.StudyMaterialData?.length >
                0 && (
                <div className="space-y-5">
                  <h1 className="font-semibold text-xl text-secondary">
                    {studymaterial(selectedLanguage).DocumentMaterial}
                  </h1>
                  <div className="flex flex-col gap-5 overflow-scroll h-screen no-scrollbar">
                    {documentData?.data?.data?.data[0]?.StudyMaterialData?.map(
                      (Lec: any) => (
                        <DocumentCard
                          key={Lec.id}
                          data={Lec}
                          documentMutate={documentMutate}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
              {linkData?.data?.data?.data[0]?.LinkMaterialData?.length > 0 && (
                <div className="space-y-5">
                  <h1 className="font-semibold text-xl text-blue-800">
                    {studymaterial(selectedLanguage).AttachedLinks}
                  </h1>
                  <div className="flex flex-col gap-5 overflow-scroll h-screen no-scrollbar">
                    {linkData?.data?.data?.data[0]?.LinkMaterialData?.map(
                      (Lec: any) => (
                        <LinkCard
                          key={Lec.id}
                          data={Lec}
                          linkMutate={linkMutate}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </TutorPanelLayout>
  );
};

type VIDEO_TYPE = {
  _id: string;
  title: string;
  isFree: boolean;
  videoUrl: string;
  description: string;
};
type DOC_TYPE = {
  _id: string;
  title: string;
  studyMaterialUrl: string;
  description: string;
};
type LINK_TYPE = {
  _id: string;
  title: string;
  linkUrl: string;
};
const VideoCard = ({
  data,
  mutate,
}: {
  data: VIDEO_TYPE;
  mutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();

  const handleDelete = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).yes,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(
            `tutor/delete-videoSection?videoId=${data?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate?.();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };

  return (
    <div className="bg-white flex justify-between items-center py-2 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-2 border-primary rounded-md hover:-translate-y-2 duration-300">
      <div className="flex items-center gap-6">
        <OndemandVideo className="text-5xl text-primary" />
        <div>
          <h1 className="text-lg font-medium text-gray-800">{data?.title}</h1>
          <h1 className="text-md text-gray-700">{data?.description}</h1>
          <div className="flex gap-6 items-center text-md font-bold text-gray-700 mt-1">
            <h1
              onClick={() => setIsOpen(true)}
              className="text-lg font-medium text-blue-500 cursor-pointer hover:text-blue-600"
            >
              {studymaterial(selectedLanguage).preview}
            </h1>
            {data?.isFree == true && (
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg font-semibold">
                  {studymaterial(selectedLanguage).Free}
                </span>
                <CheckCircleOutlineOutlined
                  className="text-md"
                  style={{ color: "green" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {isLoading ? (
          <button className="w-10 h-10 grid place-items-center rounded-full border border-gray-300 bg-gray-300/50 text-gray-500">
            <CircularProgress size={20} color="inherit" />
          </button>
        ) : (
          <Tooltip
            title={studymaterial(selectedLanguage).DeleteVideo}
            followCursor
            placement="top-start"
            arrow
          >
            <button
              onClick={() => handleDelete()}
              className="w-10 h-10 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
            >
              <DeleteOutline />
            </button>
          </Tooltip>
        )}
        <UpdateVideoDialog data={data} mutate={mutate} />
      </div>

      <Dialog
        open={isOpen}
        keepMounted={false}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <section className="relative p-5">
          <span className="absolute top-2 right-2">
            <IconButton onClick={handleClose}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <h1 className="capitalize text-xl text-primary font-bold">
              {data?.title}
            </h1>
          </div>
          <div className="py-12">
            <video width="100%" height="319" controls className="rounded-sm">
              <source src={data?.videoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      </Dialog>
    </div>
  );
};
const DocumentCard = ({
  data,
  documentMutate,
}: {
  data: DOC_TYPE;
  documentMutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();

  const handleDelete = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).yes,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(
            `tutor/delete-studyMaterial?studyMaterialId=${data?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          documentMutate?.();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };

  return (
    <div className="bg-white flex justify-between items-center py-2 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-2 border-primary rounded-md hover:-translate-y-2 duration-300">
      <div className="flex items-center gap-6">
        <FileCopyOutlined className="text-5xl text-primary" />
        <div>
          <h1 className="text-lg font-medium text-gray-800">{data?.title}</h1>
          <h1 className="text-md text-gray-700">{data?.description}</h1>
          <div className="flex gap-6 items-center text-md font-bold text-gray-700 mt-1">
            <h1
              className="text-lg font-medium text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              {studymaterial(selectedLanguage).preview}
            </h1>
            {/* <p>
              <span className="text-primary mr-1 text-sm">
                {data?.videoLength}
              </span>
              {lectureSectionPage(selectedLanguage).minutes}
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        {isLoading ? (
          <button className="w-10 h-10 grid place-items-center rounded-full border border-gray-300 bg-gray-300/50 text-gray-500">
            <CircularProgress size={20} color="inherit" />
          </button>
        ) : (
          <Tooltip
            title={studymaterial(selectedLanguage).DeleteDocument}
            followCursor
            placement="top-start"
            arrow
          >
            <button
              onClick={() => handleDelete()}
              className="w-10 h-10 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
            >
              <DeleteOutline />
            </button>
          </Tooltip>
        )}
        {/* <UpdateVideoDialog data={data} mutate={mutate} /> */}
      </div>

      <Dialog
        open={isOpen}
        keepMounted={false}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <section className="relative p-5">
          <span className="absolute top-2 right-2">
            <IconButton onClick={handleClose}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <h1 className="capitalize text-xl font-bold">{data?.title}</h1>
          </div>
          <div className="py-10">
            <iframe
              id="iframeId"
              src={data?.studyMaterialUrl}
              title={data?.title}
              width="100%"
              height="600px"
            />
          </div>
        </section>
      </Dialog>
    </div>
  );
};
const LinkCard = ({
  data,
  linkMutate,
}: {
  data: LINK_TYPE;
  linkMutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();
  const router = useRouter();

  const handleDelete = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).yes,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(
            `tutor/delete-linkMaterial?linkMaterialId=${data?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          linkMutate?.();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };

  return (
    <section className="bg-white flex justify-between items-center py-2 px-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border-t-2 border-primary rounded-md hover:-translate-y-2 duration-300">
      <aside className="flex items-center gap-6">
        <LinkIcon className="text-5xl text-primary" />
        <div>
          <h1 className="text-lg font-medium text-gray-800">{data?.title}</h1>
          <div className="flex gap-6 items-center text-md font-bold text-gray-700 mt-1">
            <p
              onClick={() => window.open(data?.linkUrl, "_blank")}
              className="text-lg font-medium text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              {studymaterial(selectedLanguage).preview}
            </p>
          </div>
        </div>
      </aside>
      <aside className="flex gap-3">
        {isLoading ? (
          <button className="w-10 h-10 grid place-items-center rounded-full border border-gray-300 bg-gray-300/50 text-gray-500">
            <CircularProgress size={20} color="inherit" />
          </button>
        ) : (
          <Tooltip
            title={studymaterial(selectedLanguage).DeleteLink}
            followCursor
            placement="top-start"
            arrow
          >
            <button
              onClick={() => handleDelete()}
              className="w-10 h-10 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
            >
              <DeleteOutline />
            </button>
          </Tooltip>
        )}
      </aside>
    </section>
  );
};

export default VideoSection;
