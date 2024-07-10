import { DeleteOutline, ExpandMore } from "@mui/icons-material";
import { Collapse, Tooltip } from "@mui/material";
import { UpdateFaqDialog } from "components/forms";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import { deleteContent } from "locale";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AdminQuestionCard from "./AdminQuestionCard";

const Accordion = ({
  idx,
  faq,
  mutate,
}: {
  idx: any;
  faq: any;
  mutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutation } = useMutation();

  const { selectedLanguage } = useAppContext();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
            `quizQuestion/delete-quizQuestion/${faq?._id}`,
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
    <div className="bg-white my-2 shadow-lg">
      <div
        onClick={handleClick}
        className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-100/50"
      >
        <p className="flex gap-2">
          <span className="text-gray-700">{idx}.</span>

          <span
            dangerouslySetInnerHTML={{ __html: faq?.question! }}
            className="text-lg font-medium"
          ></span>
        </p>
        <ExpandMore
          className={`text-purple-700 h-6 w-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <div className="border-l-2 border-purple-600 overflow-hidden pb-2 relative group">
          <div className="mt-3 flex flex-col gap-6 p-2">
            <AdminQuestionCard
              //   key={QST.id}
              data={faq}
              //   index={index}
              //   closeModal={() => {
              //     onClose();
              //   }}
              handleDelete={handleDelete}
              mutate={mutate}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Accordion;
