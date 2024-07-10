import { Close, PeopleAlt } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { PROFILE } from "assets/images";
import dayjs from "dayjs";
import { array } from "yup";

const AttendanceDetails = ({
  mutate,
  allUsers,
  closeFn,
}: {
  mutate: () => void;
  allUsers?: any[];
  closeFn?: () => void;
}) => {
  return (
    <div className="w-full relative min-h-screen border-l-white shadow-lg !bg-[#F5F6F1] border-l rounded-t-2xl">
      <div className="flex justify-between w-full bg-primary items-center rounded-tl-2xl">
        <h3 className="font-semibold text-white text-2xl tracking-wide p-4 flex items-center gap-3 ">
          <PeopleAlt fontSize="large" />
          Student Attendance
        </h3>
        <IconButton
          className="hover:bg-slate-500 rounded-full p-1"
          onClick={closeFn}
        >
          <Close className="text-white" />
        </IconButton>
      </div>
      <div className="flex items-start flex-col h-[90vh] overflow-y-auto">
        {allUsers?.map((item, index) => (
          <div
            className="flex flex-row items-center justify-between md:p-4 p-2 gap-5"
            key={index}
          >
            <div className="relative">
              <Avatar
                src={item?.presentStudent?.profileUrl || PROFILE.src}
                alt="student"
                imgProps={{
                  loading: "lazy",
                }}
                className="shadow-lg bg-green-600/10 p-1 rounded-full h-14 w-14"
              ></Avatar>
              <span className="absolute bottom-0 right-0 shadow-lg border bg-green-500 h-3 w-3 rounded-full"></span>
            </div>
            <div className="">
              <h3 className="font-semibold tracking-wide text-md">
                {item?.presentStudent?.name}
              </h3>
              <h3 className="font-normal text-gray-600 tracking-wide text-sm">
                {item?.presentStudent?.email}
              </h3>
            </div>

            {/* {item?.timeOfEnter && (
              <small className="font-medium tracking-wide ">
                Joined At {dayjs(item?.timeOfEnter).format("hh:mm A")}
              </small>
            )}
            {item?.timeOfExit && (
              <small className="font-medium tracking-wide ">
                Last exit {dayjs(item?.timeOfExit).format("hh:mm A")}
              </small>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceDetails;
