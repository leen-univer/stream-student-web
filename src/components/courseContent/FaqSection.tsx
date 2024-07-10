import { ExpandMore } from "@mui/icons-material";
import { Collapse, Typography } from "@mui/material";
import { useSWRAPI } from "hooks";
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

const FaqSection = () => {
  const router = useRouter();
  const { data } = useSWRAPI(
    `faq/get-student-faq?courseId=${router?.query?.courseID}`
  );

  return (
    <section className="w-full bg-white p-2 rounded-3xl shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
      <h2 className="text-2xl font-semibold text-secondary flex justify-center items-center py-2">
        Frequently Asked Questions
      </h2>
      <ul className="flex flex-col">
        {data?.data?.data?.data?.map((faq: any, index: number) => (
          <Accordion key={index} idx={index + 1} faq={faq} />
        ))}
      </ul>
    </section>
  );
};

export default FaqSection;

const Accordion = ({ idx, faq }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="bg-white my-2 shadow-sm max-h-[20rem] overflow-y-scroll">
      <h2
        onClick={handleClick}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2">
          <span className="text-gray-700">{idx}.</span>
          <span className="text-md">{faq.question}</span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </h2>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-purple-600 overflow-hidden pb-2">
          <Typography className="px-3 pt-3 pb-1 text-gray-900 text-sm">
            {faq?.answer}
          </Typography>
          <p className="px-3">
            <a href={faq?.linkUrl} className="text-blue-600 hover:underline">
              {faq?.linkUrl}
            </a>
          </p>
        </div>
      </Collapse>
    </li>
  );
};
