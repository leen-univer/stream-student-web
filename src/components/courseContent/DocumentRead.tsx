import {
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  Description,
} from "@mui/icons-material";
import { Dialog, IconButton } from "@mui/material";
import { useAppContext } from "contexts";
import { studentPanel } from "locale";
import { useState } from "react";

const DocumentRead = ({
  data,
  handleDocumentRead,
  isPurchased,
}: {
  data: any;
  handleDocumentRead: any;
  isPurchased: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    handleDocumentRead(data?._id);
  };
  const { selectedLanguage } = useAppContext();

  return (
    <div>
      <div className="flex flex-row gap-3 justify-between bg-secondary/5 p-2">
        <p className="flex items-center gap-2 text-sm" key={data._id}>
          <Description
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
        {data?.studyMaterials?.length == 0 ? (
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
            <p className="text-lg font-medium text-gray-600">
              {data?.description}
            </p>
          </div>
          <div className="py-10">
            {isPurchased ? (
              <iframe
                id="iframeId"
                src={data?.studyMaterialUrl}
                title={data?.title}
                width="100%"
                height="600px"
              />
            ) : (
              <p className="text-red-500 text-xl font-semibold bg-yellow-100 p-2 rounded-md text-center">
                {
                  studentPanel(selectedLanguage)
                    .Youneedtopurchasethiscoursetoaccessthestudymaterial
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

export default DocumentRead;
