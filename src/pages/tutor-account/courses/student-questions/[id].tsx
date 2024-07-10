import { Close, ExpandMore } from "@mui/icons-material";
import { Collapse, Dialog, IconButton, Typography } from "@mui/material";
import { UpdateFaqDialog, UpdateStuQuesDialog } from "components/forms";
import AddFaqsDialog from "components/forms/tutorForms/AddFaqsDialog";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { TutorPanelLayout } from "layouts";
import { courseSectionPage } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";

const StudentQuestions = () => {
  const router = useRouter();
  const { selectedLanguage } = useAppContext();
  const { data, mutate, isValidating } = useSWRAPI(
    `tutor/all-section/${router?.query?.id}`
  );

  const { data: stuQuesData, mutate: stuQuesMutate } = useSWRAPI(
    `myQuestion/course-question?courseId=${router?.query?.id}`
  );

  return (
    <TutorPanelLayout title="Manage Faqs | StreamStudent">
      <section className="w-full h-full space-y-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold text-primary uppercase lg:pr-12 md:pr-4">
              {data?.data?.courseName?.courseName}
            </h1>
          </div>
          <h2 className="text-xl font-medium tracking-wider lg:pr-12 md:pr-4">
            {data?.data?.courseName?.description}
          </h2>
          <div className=" text-lg font-semibold mt-4 text-white ">
            <p className="inline-block bg-primary/80  px-2 rounded-lg">
              {data?.data?.courseName?.Category?.name}
            </p>
          </div>
        </div>
        <div className="cursor-pointer flex md:justify-end flex-col md:flex-row gap-6 px-2"></div>
        <div className="w-full">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold text-primary mb-2 text-center my-10">
            {courseSectionPage(selectedLanguage).studentAskedQuestion}
          </h2>
          <ul className="flex flex-col">
            {stuQuesData?.data?.data?.map((faq: any, index: number) => (
              <Accordion
                key={index}
                idx={index + 1}
                faq={faq}
                stuQuesMutate={stuQuesMutate}
              />
            ))}
          </ul>
        </div>
      </section>
    </TutorPanelLayout>
  );
};

export default StudentQuestions;

const Accordion = ({
  idx,
  faq,
  stuQuesMutate,
}: {
  idx: any;
  faq: any;
  stuQuesMutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { selectedLanguage } = useAppContext();
  return (
    <li className="bg-white my-2 shadow-lg">
      <h2
        onClick={handleClick}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2">
          <span className="text-gray-700">{idx}.</span>
          <span>{faq?.question}</span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </h2>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-purple-600 overflow-hidden relative group">
          <div className="flex flex-col">
            {faq?.answer ? (
              <Typography className="p-3 text-gray-900 text-sm">
                {faq.answer}
              </Typography>
            ) : (
              <Typography className="p-3 text-gray-900 text-sm">
                {courseSectionPage(selectedLanguage).ansnotprovided}
              </Typography>
            )}
            <a
              href={faq?.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 px-3 hover:underline"
            >
              {faq?.linkUrl}
            </a>
            {faq?.attachmentUrl ? (
              <div
                className="text-lg font-medium text-primary/60 cursor-pointer bg-gray-100/70 shadow-md px-2 py-1 inline-block border w-fit m-3 hover:text-primary/80"
                onClick={() => setOpenDoc(true)}
              >
                {courseSectionPage(selectedLanguage).preview}
              </div>
            ) : null}
          </div>

          <Dialog
            open={openDoc}
            keepMounted={false}
            fullWidth
            maxWidth="md"
            PaperProps={{
              style: { borderRadius: "1.5rem" },
            }}
          >
            <section className="relative p-5">
              <span className="absolute top-2 right-2">
                <IconButton onClick={() => setOpenDoc(false)}>
                  <Close className="!text-red-600" />
                </IconButton>
              </span>
              <div className="flex flex-col gap-1 pt-4">
                <h1 className="capitalize text-xl font-bold">
                  {faq?.attachmentPath}
                </h1>
              </div>
              <div className="py-10">
                <iframe
                  id="iframeId"
                  src={faq?.attachmentUrl}
                  title={faq?.attachmentPath}
                  width="100%"
                  height="600px"
                />
              </div>
            </section>
          </Dialog>
          <div className="invisible absolute -top-2 right-0 opacity-0 flex flex-row gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible p-2 rounded-md">
            <UpdateStuQuesDialog data={faq} mutate={stuQuesMutate} />
          </div>
        </div>
      </Collapse>
    </li>
  );
};
