import {
  Close,
  ExpandMore,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import { Collapse, Dialog, IconButton, Typography } from "@mui/material";
import { MyQuestionsDialog } from "components/forms/student";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { courseSectionPage, studentPanel } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";

const FAQs = [
  {
    question: "When will my order arrive?",
    answer:
      "Shipping time is set by our delivery partners, according to the delivery method chosen by you. Additional details can be found in the order confirmation.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once shipped, you’ll get a confirmation email that includes a tracking number and additional information regarding tracking your order.",
  },
  {
    question: "What’s your return policy?",
    answer:
      "We allow the return of all items within 30 days of your original order’s date. If you’re interested in returning your items, send us an email with your order number and we’ll ship a return label.",
  },
  {
    question: "How do I make changes to an existing order?",
    answer:
      "Changes to an existing order can be made as long as the order is still in “processing” status. Please contact our team via email and we’ll make sure to apply the needed changes. If your order has already been shipped, we cannot apply any changes to it. If you are unhappy with your order when it arrives, please contact us for any changes you may require.",
  },
  {
    question: "What shipping options do you have?",
    answer: "For USA domestic orders we offer FedEx and USPS shipping.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Any method of payments acceptable by you. For example: We accept MasterCard, Visa, American Express, PayPal, JCB Discover, Gift Cards, etc.",
  },
  // Add more FAQs as needed
];

const MyQuestions = ({ isPurchased }: any) => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data, mutate, isValidating } = useSWRAPI(
    `myQuestion/my-question?courseId=${router?.query?.courseID}`
  );

  const handleDialog = () => {
    if (Boolean(isPurchased)) {
      setOpen(!open);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const { selectedLanguage } = useAppContext();

  return (
    <section className="w-full bg-white p-2 rounded-3xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mt-2 mb-4 max-h-[30rem] overflow-y-scroll">
      <h2
        onClick={handleDialog}
        className="text-2xl font-semibold text-gray-800 flex justify-center gap-2 items-center pt-2 mb-4 hover:text-blue-800 cursor-pointer"
      >
        {studentPanel(selectedLanguage).myQuestion}

        {open ? (
          <KeyboardArrowUpOutlined
            className="text-primary hover:text-blue-800"
            fontSize="large"
          />
        ) : (
          <KeyboardArrowDownOutlined
            className="text-primary hover:text-blue-800"
            fontSize="large"
          />
        )}
      </h2>

      {isPurchased ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <MyQuestionsDialog mutate={mutate} />
          <ul className="flex flex-col">
            {data?.data?.data?.data?.map((faq: any, index: any) => (
              <Accordion key={index} idx={index + 1} faq={faq} />
            ))}
          </ul>
        </Collapse>
      ) : (
        <Dialog
          open={isOpen}
          keepMounted={false}
          onClose={() => setIsOpen(false)}
          fullWidth
          maxWidth="md"
          PaperProps={{
            style: { borderRadius: "1.5rem" },
          }}
        >
          <section className="p-5">
            <span className="flex justify-end">
              <IconButton onClick={() => setIsOpen(false)}>
                <Close className="!text-red-600" />
              </IconButton>
            </span>
            <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center">
              {
                studentPanel(selectedLanguage)
                  .YouneedtopurchasethiscoursetoAskQuestions
              }
            </p>
          </section>
        </Dialog>
      )}
    </section>
  );
};

export default MyQuestions;

const Accordion = ({ idx, faq }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState(false);
  const { selectedLanguage } = useAppContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="my-2 shadow-sm">
      <h2
        onClick={handleClick}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2">
          <span className="text-gray-700">{idx}.</span>
          <span className="text-lg">{faq.question}</span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </h2>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-purple-600 overflow-hidden">
          <div className="flex flex-col">
            {faq?.answer ? (
              <Typography className="p-3 text-gray-900 text-sm">
                {faq.answer}
              </Typography>
            ) : (
              <Typography className="p-3 text-red-900 text-sm">
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
                {studentPanel(selectedLanguage).viewattachment}
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
        </div>
      </Collapse>
    </li>
  );
};
