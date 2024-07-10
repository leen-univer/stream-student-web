import {
  AccessTimeFilled,
  Assignment,
  Close,
  Delete,
  ExpandMore,
  MenuBook,
  OndemandVideo,
  Star,
  StarBorder,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Dialog,
  IconButton,
} from "@mui/material";
import { PROFILE } from "assets/images";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { AdminPanelLayout } from "layouts";
import { adminTopicDetailsContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { REVIEW_TYPE } from "types";
import { currencyFormatter, getDiscountValue } from "utils";

const TopicDetails = () => {
  const { selectedLanguage } = useAppContext();
  const { query } = useRouter();
  const { Id } = useRouter().query;
  const { data, mutate } = useSWRAPI(
    `student/all-reviews?courseId=${query?.courseID || query?.Id}`
  );

  //? handle payment function

  const sectionsArr = [
    {
      id: "1",
      title: "Javascript DataTypes",
      videos: [
        {
          id: "1.1",
          link: "Difference between Let, Var, and Const",
        },
        {
          id: "1.2",
          link: "Type of functions in Javascript",
        },
      ],
    },
    {
      id: "2",
      title: "Javascript Functions",
      videos: [
        {
          id: "2.1",
          link: "Difference between Let, Var, and Const",
        },
        {
          id: "2.2",
          link: "Type of functions in Javascript",
        },
      ],
    },
    {
      id: "3",
      title: "Javascript Event Loop",
      videos: [
        {
          id: "3.1",
          link: "Difference between Let, Var, and Const",
        },
        {
          id: "3.2",
          link: "Type of functions in Javascript",
        },
      ],
    },
    {
      id: "4",
      title: "Basics of Node js",
      videos: [
        {
          id: "4.1",
          link: "Difference between Let, Var, and Const",
        },
        {
          id: "4.2",
          link: "Type of functions in Javascript",
        },
      ],
    },
  ];

  const handlePayment = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "You payment has successfully received",
    });
  };

  return (
    <AdminPanelLayout title="All Courses | StreamStudent">
      <section className="relative flex flex-col items-start justify-between gap-12">
        <CourseBanner />
        <aside className="w-full bg-white p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <h1 className="title-styling pb-6">
            {adminTopicDetailsContent(selectedLanguage).CourseContent}
          </h1>
          <p className="text-sm tracking-wider text-gray-500 pb-3">
            46 sections • 467 lectures • 62h 16m total length
          </p>
          <div className="border rounded-sm p-2">
            {sectionsArr.map((section) => (
              <TopicCard
                key={section.id}
                title={section.title}
                videos={section.videos}
              />
            ))}
          </div>
        </aside>
        <aside className="w-full bg-white p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="pt-6">
            <h1 className="text-xl md:text-2xl font-bold pb-6">
              <Star fontSize="medium" className="!mb-2 !text-yellow-400" />
              {adminTopicDetailsContent(selectedLanguage).AllReviews}(2.3k)
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data?.data?.data?.data?.map((item: REVIEW_TYPE) => (
                <PanelReviewCard key={item?._id} data={item} mutate={mutate} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </AdminPanelLayout>
  );
};

//? banner section
const CourseBanner = () => {
  return (
    <article className="w-full bg-stone-900 py-6 md:py-8 lg:py-16">
      <aside className="main-container flex flex-col-reverse md:flex-row items-center justify-between gap-4 lg:gap-8">
        <div className="w-full md:w-3/5 lg:w-[70%] flex flex-col gap-3 text-white tracking-wide">
          <h6 className="uppercase font-bold text-secondary">Javascript</h6>
          <h1 className="title-styling">
            CCNA 2020 200-125 Video Boot Camp With Chris Bryant
          </h1>
          <p className="capitalize text-xl">
            Join The 90,000+ Students Who Are Learning Real-World Skills AND
            Earning Their CCNA!
          </p>
          <p className="text-lg font-semibold">Enrolled students: 550</p>
          <p className="text-sm flex items-center gap-1">
            <span className="text-yellow-400">
              4.5 <Star className="!text-base !mb-1" /> (25,006)
            </span>
          </p>

          <p className="flex items-center gap-2">
            <span className="text-lg font-bold">{currencyFormatter(699)}</span>
            <span className="text-sm text-gray-400 line-through">
              {currencyFormatter(999)}
            </span>
            <span className="text-xl text-gray-300">
              {getDiscountValue(999, 699)}% <small>off</small>
            </span>
          </p>
          <p className="text-sm flex items-center gap-1">
            <AccessTimeFilled className="!text-base" />
            Last updated 08/2022
          </p>
        </div>
        <div className="w-full md:w-2/5 lg:w-[30%]">
          <img src="/Image/course_2.jpg" alt="course-pic" />
        </div>
      </aside>
    </article>
  );
};

//? review & rating section
export const PanelReviewCard = ({
  data,
  mutate,
}: {
  data: REVIEW_TYPE;
  mutate: () => void;
}) => {
  const { mutation } = useMutation();
  const { selectedLanguage } = useAppContext();

  const handleRemoveReview = async () => {
    try {
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttoremovethis,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).YesRemoveit,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(
            `student/delete-review?reviewId=${data?.ReviewCourses?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate();
          return;
        }
      });
    } catch (error) {}
  };
  return (
    <article className="group relative flex flex-col gap-4 py-4 border-y">
      <div className=" flex items-center gap-4">
        <Delete
          onClick={handleRemoveReview}
          fontSize="small"
          className="absolute top-4 right-4 text-red-500 hidden group-hover:block cursor-pointer"
        />
        <img
          src={data?.Student?.profileUrl || PROFILE.src}
          style={{ width: "3rem", height: "3rem" }}
        />
        <div className="flex flex-col gap-1">
          <span className="font-semibold">
            {data?.Student?.name || "Not Given"}
          </span>
          <span className="flex flex-col gap-2">
            <div>
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  {data?.ReviewCourses?.rating &&
                  data?.ReviewCourses?.rating >= index + 1 ? (
                    <Star
                      fontSize="inherit"
                      color="inherit"
                      className="!text-yellow-400"
                    />
                  ) : (
                    <StarBorder
                      fontSize="inherit"
                      color="inherit"
                      className="!text-yellow-400"
                    />
                  )}
                </Fragment>
              ))}
            </div>
            <div>
              {dayjs(data?.ReviewCourses?.createdAt || "Not Given").format(
                "MMM D, YYYY h:mm A"
              )}
            </div>
          </span>
          <p className="tracking-wide text-sm">
            {data?.ReviewCourses?.message}
          </p>
        </div>
      </div>
    </article>
  );
};

//? topic card section

type TOPIC_TYPE = {
  title: string;
  videos: any[];
};
const TopicCard = ({ title, videos }: TOPIC_TYPE) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAssignment, setOpenAssignment] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCloseAssignment = () => {
    setOpenAssignment(false);
  };
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className=" !bg-primary/5"
        >
          <div className="w-full group flex items-center justify-between">
            <h3 className="capitalize font-semibold tracking-wide">{title}</h3>
            <IconButton className="!mr-2">
              <Delete
                fontSize="small"
                className="opacity-0 group-hover:opacity-100 !text-red-500"
              />
            </IconButton>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <aside className="flex flex-col gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="group w-full flex items-center justify-between border p-3"
              >
                <p className=" flex items-center gap-2 text-sm">
                  <OndemandVideo
                    className="!text-base !text-red-500 !cursor-pointer"
                    onClick={() => setIsOpen(true)}
                  />
                  <span
                    className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                    onClick={() => setIsOpen(true)}
                  >
                    {video.link}
                  </span>
                </p>
                <IconButton>
                  <Delete
                    fontSize="small"
                    className=" opacity-0 group-hover:opacity-100 !text-red-500"
                  />
                </IconButton>
              </div>
            ))}
            <div className="group w-full flex items-center justify-between border p-3">
              <p className=" flex items-center gap-2 text-sm">
                <Assignment
                  className="!text-base !text-blue-500 !cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
                <span
                  className="text-blue-500 hover:text-blue-600 cursor-pointer underline"
                  onClick={() => setOpenAssignment(true)}
                >
                  Practice Assignment
                </span>
              </p>
              <IconButton>
                <Delete
                  fontSize="small"
                  className=" opacity-0 group-hover:opacity-100 !text-red-500"
                />
              </IconButton>
            </div>
          </aside>
        </AccordionDetails>
      </Accordion>
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
            <p className="uppercase font-bold text-primary">Javascript</p>
            <h1 className="capitalize text-xl font-bold">{title}</h1>
          </div>
          <div className="py-12">
            <video width="100%" height="319" controls className="rounded-sm">
              <source src="/home/dummy_video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
      </Dialog>
      <Dialog
        open={openAssignment}
        keepMounted={false}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { borderRadius: "1.5rem" },
        }}
      >
        <article className="relative flex flex-col gap-4 p-6">
          <span className="absolute top-2 right-2">
            <IconButton onClick={handleCloseAssignment}>
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <p className="uppercase font-bold text-primary">Javascript</p>

          <h1 className="title-styling text-start capitalize flex items-center gap-3">
            technical assignment-1{" "}
            <MenuBook className="!text-5xl text-blue-500" />
          </h1>
          <aside className="w-full flex flex-col rounded-lg">
            <p className="text-2xl text-primary pb-6">
              Choose the correct answer.
            </p>
            <div className="w-full lg:w-3/4 flex flex-col gap-8">
              <AssignmentCard />
              <AssignmentCard />
              <AssignmentCard />
            </div>
          </aside>
          <div className="flex justify-center mt-8">
            <button className="btn-primary px-5 py-1.5">Submit Test</button>
          </div>
        </article>
      </Dialog>
    </>
  );
};

const AssignmentCard = () => {
  return (
    <article className="">
      <p className="text-lg font-semibold pb-3">1. What is HTML?</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <input type="radio" />
          <p>a programming language</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" />
          <p>a markup language</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" />
          <p>a scripting language</p>
        </div>
        <div className="flex items-center gap-2">
          <input type="radio" />
          <p>a english language</p>
        </div>
      </div>
    </article>
  );
};

export default TopicDetails;
