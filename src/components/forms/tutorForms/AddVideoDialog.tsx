import { Add, Close } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppContext } from "contexts";
import { lectureSectionPage, tutorAddCoursePage } from "locale";
import * as React from "react";
import AddDocumentForm from "./AddDocumentForm";
import AddLinkForm from "./AddLinkForm";
import AddVideoForm from "./AddVideoForm";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }
export default function AddVideoDialog({
  mutate,
  documentMutate,
  linkMutate,
}: {
  mutate: () => void;
  documentMutate: () => void;
  linkMutate: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const { selectedLanguage } = useAppContext();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  const renderActiveForm = () => {
    switch (activeIndex) {
      case 0:
        return <AddVideoForm handleClose={handleClose} mutate={mutate} />;
      case 1:
        return (
          <AddDocumentForm
            handleClose={handleClose}
            documentMutate={documentMutate}
          />
        );
      case 2:
        return (
          <AddLinkForm handleClose={handleClose} linkMutate={linkMutate} />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className=" flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md cursor-pointer"
      >
        <Add className="text-2xl" />
        <p className="text-lg font-medium">
          {lectureSectionPage(selectedLanguage).addStudyMaterials}
        </p>
      </div>

      <Dialog
        fullWidth={fullWidth}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle className="flex items-center justify-center">
          <div className="w-[70%] grid md:grid-cols-3 grid-cols-1 gap-4 mx-auto mt-10">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                onClick={() => handleSetActiveIndex(index)}
                className={`${
                  activeIndex === index
                    ? "bg-primary text-white text-center"
                    : "border-2 border-primary bg-primary/20 text-primary text-center"
                } text-xl font-bold py-2 px-4 rounded-md cursor-pointer`}
              >
                {index === 0
                  ? `${tutorAddCoursePage(selectedLanguage).Addvideo}`
                  : index === 1
                  ? `${tutorAddCoursePage(selectedLanguage).Adddocument}`
                  : `${tutorAddCoursePage(selectedLanguage).Addlink}`}
              </div>
            ))}
          </div>
        </DialogTitle>
        <DialogContent>{renderActiveForm()}</DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
