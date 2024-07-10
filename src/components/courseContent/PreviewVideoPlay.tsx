import { Close, OndemandVideo } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useState } from "react";

const PreviewVideoPlay = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleVideo = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleVideo}>
        <div className="flex items-center gap-2">
          <OndemandVideo className="text-lg text-green-400" />
          <span className="text-blue-500 hover:text-blue-600 cursor-pointer underline capitalize">
            {data?.title}
          </span>
        </div>
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
          <span className="absolute top-6 right-3">
            <IconButton onClick={handleClose}>
              <Close className="text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-2 pt-4">
            <p className="text-2xl font-semibold text-primary capitalize">
              {data?.title}
            </p>
            <p className="text-lg font-medium text-gray-600">
              {data?.description}
            </p>
            <video width="100%" height="319" controls className="rounded-md">
              <source src={data?.videoUrl} type="video/mp4" />
            </video>
          </div>
        </section>
      </Dialog>
    </div>
  );
};

export default PreviewVideoPlay;
