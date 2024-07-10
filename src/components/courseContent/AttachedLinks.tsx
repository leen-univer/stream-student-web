import {
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  Description,
} from "@mui/icons-material";
import { Dialog, IconButton, Link } from "@mui/material";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import { studentPanel } from "locale";
import { useAppContext } from "contexts";

const AttachedLinks = ({
  data,
  handleLinkClick,
  isPurchased,
}: {
  data: any;
  handleLinkClick: any;
  isPurchased: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const { selectedLanguage } = useAppContext();

  return (
    <section>
      <div className="flex flex-row gap-3 justify-between bg-blue-400/5 p-2">
        <p className="flex items-center gap-2 text-sm" key={data._id}>
          <LinkIcon
            className="!text-base !text-red-500 !cursor-pointer"
            onClick={handleOpen}
          />
          <span
            className="text-blue-500 hover:text-blue-600 cursor-pointer underline capitalize"
            onClick={handleOpen}
          >
            {data?.title}
          </span>
        </p>
        {data?.linkMaterials?.length == 0 ? (
          <CheckBoxOutlineBlank className="text-xl" />
        ) : (
          <CheckBox className="text-xl" />
        )}
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
              <Close className="!text-red-600" />
            </IconButton>
          </span>
          <div className="flex flex-col gap-1 pt-4">
            <p className="text-2xl capitalize font-semibold text-primary">
              {data?.title}
            </p>
            {/* <p className="text-lg font-medium text-gray-600">
              {data?.description}
            </p> */}
          </div>
          <div className="py-4">
            {isPurchased ? (
              <div className="bg-blue-900 py-2 rounded-lg hover:bg-blue-800 common-transition text-center w-full text-lg">
                <a
                  href={data?.linkUrl}
                  target="_blank"
                  onClick={() => handleLinkClick(data?._id)}
                  rel="noopener noreferrer"
                  className="text-white font-medium underline hover:no-underline cursor-pointer"
                >
                  {studentPanel(selectedLanguage).Clickheretoopenthelink}
                </a>
              </div>
            ) : (
              <p className="text-red-600 text-xl font-semibold bg-yellow-200 p-2 rounded-md text-center">
                {
                  studentPanel(selectedLanguage)
                    .Youneedtopurchasethiscoursetoaccessthelinkmaterial
                }
              </p>
            )}
          </div>
        </section>
      </Dialog>
    </section>
  );
};

export default AttachedLinks;
