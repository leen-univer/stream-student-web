import { Close, Delete, DeleteOutline, Star } from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { AdminPanelLayout } from "layouts";
import { useState } from "react";
import { currencyFormatter } from "utils";

const Topic = () => {
  return (
    <AdminPanelLayout title="Topics | StreamStudent">
      <article className="grid place-items-center gap-5">
        <h1 className="title-styling ">Topics</h1>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
        </section>
      </article>
    </AdminPanelLayout>
  );
};

const TopicCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <article
        onClick={() => setIsOpen(true)}
        className="relative w-full flex flex-col gap-3 justify-center text-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden p-5"
      >
        <div className="flex items-center justify-between ">
          <p>
            By <span className="font-bold">Sarah Ali</span>
          </p>

          <span className="font-bold">7th jan 2023</span>
        </div>
        <img
          className="w-full h-32 object-cover"
          src="/image/course_1.jpg"
          alt="profile-image"
        />
        {/* <div className="flex flex-col items-center p-3"> */}
        <p className="text-xl font-semibold text-start leading-6">
          Array and strings
        </p>
        {/* </div> */}
        <DeleteOutline className="absolute right-6 bottom-5 !border !rounded-full !border-red-500 !bg-red-500/10 !text-red-500 !cursor-pointer" />

        {/* video dialog */}
      </article>
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
        <section className="relative p-5">
          <span className="absolute top-2 right-2">
            <IconButton onClick={handleClose}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <p className="uppercase font-bold text-primary">Javascript</p>
            <h1 className="capitalize text-xl font-bold">Array and strings</h1>
          </div>
          <div className="py-12">
            <video width="100%" height="319" controls className="rounded-sm">
              <source src="/home/dummy_video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
      </Dialog>
    </>
  );
};

const TopicVideoCard = () => {
  return <article></article>;
};

export default Topic;
