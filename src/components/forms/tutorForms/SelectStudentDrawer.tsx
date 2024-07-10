import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Checkbox, Container, Drawer } from "@mui/material";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { tutorLiveClassPage } from "locale";
import Swal from "sweetalert2";
import { LIVE_STUDENT } from "types";
import showError from "utils/error";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setOpenEditPrescriptionDrawer: any;
  mutate?: any;
  activeData?: any;
  courseId?: string;
  classId?: string;
};

const SelectStudentsDrawer = ({
  open,
  onClose,
  setOpenEditPrescriptionDrawer,
  courseId,
  classId,
}: Props) => {
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { data: studentData } = useSWRAPI(
    `class/get-all-student?courseId=${courseId}`
  );

  const handleSubmit = async () => {
    try {
      const res = await mutation("class/send-invitation", {
        method: "POST",
        body: {
          classId: classId,
          studentIds: studentData?.data?.data?.data?._id,
          emails: studentData?.data?.data?.data?.user?.email,
        },
        isAlert: true,
      });

      if (res?.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${res?.results?.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${res?.results?.message}`,
        });
      }
      onClose();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div>
      <div
        onClick={setOpenEditPrescriptionDrawer(true)}
        className="flex gap-2 items-center border-2 border-primary bg-primary/20 text-primary px-2 py-1 rounded-md cursor-pointer"
      >
        <CheckCircleOutlineOutlined />
        <p className="text-[1.15rem] font-bold">
          {tutorLiveClassPage(selectedLanguage).ShareLink}
        </p>
      </div>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <h1 className="text-3xl font-bold text-center mt-5">
          {tutorLiveClassPage(selectedLanguage).StudentList}
        </h1>
        <Container
          style={{
            width: "40vw",
            marginTop: "3vh",
          }}
        >
          <div className="flex flex-col gap-3 overflow-y-hidden">
            <div className="flex items-center justify-between text-center bg-primary px-4 py-2 rounded-md overflow-y-scroll">
              {/* <Checkbox
                {...label}
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 25 } }}
                className="!p-0 !m-0 !text-white"
              /> */}
              <h1 className="text-xl tracking-wider font-bold text-white">
                {tutorLiveClassPage(selectedLanguage).StudentName}
              </h1>
              <h1 className="text-xl tracking-wider font-bold text-white">
                {tutorLiveClassPage(selectedLanguage).StudentEmail}
              </h1>
              <p className=" text-lg font-bold text-white">
                {tutorLiveClassPage(selectedLanguage).JoinDate}
              </p>
            </div>
            {studentData?.data?.data?.data?.map((item: LIVE_STUDENT) => (
              <SelectStudentCard key={item?._id} data={item} />
            ))}
          </div>
        </Container>

        <div className="w-full flex items-center justify-center mt-10 mb-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-[60%] m-auto bg-primary/90 text-xl py-2 font-bold text-white rounded-md hover:bg-primary duration-300"
          >
            {tutorLiveClassPage(selectedLanguage).ShareLiveClassLink}
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default SelectStudentsDrawer;

const SelectStudentCard = ({ data }: { data: LIVE_STUDENT }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <div className="flex items-center justify-between text-center bg-primary/10 px-4 py-2 rounded-md">
        {/* <Checkbox {...label} color="success" className="!p-0 !m-0" /> */}
        <h1 className="text-lg tracking-wider font-bold text-primary">
          {data?.user?.name || "Not Given"}
        </h1>
        <h1 className="text-lg tracking-wider font-bold text-primary">
          {data?.user?.email || "Not Given"}
        </h1>
        <p className="font-bold text-primary">
          {dayjs(data?.transaction?.createdAt || "Not Given").format(
            "MMM D, YYYY"
          )}
        </p>
      </div>
    </>
  );
};
