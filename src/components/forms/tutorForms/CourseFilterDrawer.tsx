import { Add, Close, FilterList } from "@mui/icons-material";
import { Container, Drawer } from "@mui/material";
import AddQuestionDialog from "./AddQuestionDialog";
import * as React from "react";
import { pink } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import { useAppContext } from "contexts";
import { tutorAddCoursePage } from "locale";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setOpenEditPrescriptionDrawer: any;
  mutate?: any;
  activeData?: any;
};

const CourseFilterDrawer = ({
  open,
  onClose,
  setOpenEditPrescriptionDrawer,
}: Props) => {
  const { selectedLanguage } = useAppContext();
  return (
    <div>
      <div
        className="flex gap-2 cursor-pointer items-center px-3 py-[0.39rem] border-2 border-primary bg-primary/10 text-primary rounded-md"
        onClick={setOpenEditPrescriptionDrawer(true)}
      >
        <FilterList className="text-3xl" />
        <p className="font-medium text-xl">
          {tutorAddCoursePage(selectedLanguage).filter}
        </p>
      </div>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "25vw",
            marginTop: "3vh",
          }}
        >
          <div className="w-full flex items-center">
            <div
              className="basis-[20%] cursor-pointer"
              onClick={() => onClose && onClose()}
            >
              <Close className="text-3xl" />
            </div>
            <div className="basis-[80%] text-center mr-20">
              <h1 className="text-3xl font-bold text-primary">
                {tutorAddCoursePage(selectedLanguage).courseFilter}
              </h1>
            </div>
          </div>
        </Container>
      </Drawer>
    </div>
  );
};

export default CourseFilterDrawer;
