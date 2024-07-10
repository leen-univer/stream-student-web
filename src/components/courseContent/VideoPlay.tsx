import {
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  OndemandVideo,
} from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import { studentPanel } from "locale";
import { useState } from "react";

const VideoPlay = ({
  isPurchased,
  data,
  handleVideoWatch,
}: {
  isPurchased: any;
  data: any;
  handleVideoWatch: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const handleVideoEnded = () => {
    handleVideoWatch(data?._id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleVideo = () => {
    setIsOpen(true);
  };
  const { selectedLanguage } = useAppContext();

  return (
    <div>
      <div className="flex flex-row  justify-between bg-primary/10 rounded-md p-2">
        <p className="flex items-center gap-2 text-sm" key={data._id}>
          <OndemandVideo
            className="!text-base !text-red-500 !cursor-pointer"
            onClick={handleVideo}
          />
          <span
            className="text-blue-500 hover:text-blue-600 cursor-pointer underline capitalize"
            onClick={handleVideo}
          >
            {data?.title}
          </span>
        </p>
        {data?.watchVideoData?.length == 0 ? (
          <CheckBoxOutlineBlank className="text-xl" />
        ) : (
          <CheckBox className="text-xl" />
        )}
      </div>
      <Dialog
        open={isOpen}
        keepMounted={false}
        // onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <section className="relative p-5">
          <span className="absolute top-6 right-3">
            <IconButton onClick={handleClose}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <p className="text-2xl capitalize font-semibold text-primary">
              {data?.title}
            </p>
            <p className="text-lg font-medium text-gray-600">
              {data?.description}
            </p>
          </div>
          <div className="py-10">
            {isPurchased ? (
              <video
                onEnded={handleVideoEnded}
                width="100%"
                height="319"
                controls
                className="rounded-sm"
              >
                <source src={data?.videoUrl} type="video/mp4" />
              </video>
            ) : (
              <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center">
                {
                  studentPanel(selectedLanguage)
                    .Youneedtopurchasethiscoursetoaccessthevideomaterial
                }
                .
              </p>
            )}
          </div>
        </section>
      </Dialog>
    </div>
  );
};

export default VideoPlay;
