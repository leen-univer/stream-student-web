import {
  Call,
  ChatOutlined,
  MicOff,
  MicOutlined,
  People,
  PresentToAll,
  VideocamOff,
  VideocamOutlined,
} from "@mui/icons-material";

import { useAuth, useSWRAPI } from "hooks";
import { useEffect, useState, useRef } from "react";
import VideoChat from "./VideoChat";
import { Badge, Button } from "@mui/material";
import { useAppContext } from "contexts";
import AttendanceDetails from "./AttendanceDetails";
import useMutation from "hooks/useMutataion";
import { useRouter } from "next/router";

const CallButtons = ({
  classId,
  shareScreen,
  endCall,
  muteAudio,
  muteVideo,
  isVideoMute,
  isAudioMute,
  isScreenSharing,
}: {
  classId?: string;
  shareScreen: () => void;
  endCall: () => void;
  muteAudio: () => void;
  muteVideo: () => void;
  isAudioMute: boolean;
  isVideoMute: boolean;
  isScreenSharing: boolean;
}) => {
  const [reloadUser, setReloadUser] = useState(false);
  const [drawerActive, setDrawerActive] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState(false);
  const [allChats, setAllChats] = useState<any[]>([]);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [userJoined, setUserJoined] = useState(false);
  let buttonClicked = useRef(true);
  const { user } = useAuth();
  const mutation = useMutation().mutation;
  const router = useRouter();

  const { data, mutate } = useSWRAPI(
    `attendance/all-present-student?classId=${classId}`,
    {
      refreshInterval: 1000,
    }
  );

  const { socketRef } = useAppContext();

  useEffect(() => {
    if (drawerActive) return;
    !buttonClicked?.current && setUnreadMessages((prev) => prev + 1);
  }, [drawerActive, allChats?.length]);
  useEffect(() => {
    mutate?.();
    if (attendanceDetails) return;
    !buttonClicked?.current && setUserJoined(true);
  }, [attendanceDetails, reloadUser]);

  useEffect(() => {
    socketRef?.on("message-receive", (data: any) => {
      buttonClicked.current = false;

      setAllChats((prev) => [...prev, data?.data]);
    });

    socketRef?.on("new-user-joined", async (data: any) => {
      buttonClicked.current = false;

      setAllChats((prev) => [
        ...prev,

        {
          message: "New user joined the class",

          type: "MIDDLE",

          user: data?.data?.user,

          _id: Date.now() * Math.random(),

          createdAt: new Date().toISOString(),
        },
      ]);

      setReloadUser((prev) => !prev);

      !attendanceDetails && setUserJoined(true);
    });

    socketRef?.on("user-leaving", async (data: any) => {
      setAllChats((prev) => [
        ...prev,

        {
          message: "User leaving the class",

          type: "MIDDLE",

          user: data?.data?.user,

          _id: Date.now() * Math.random(),

          createdAt: new Date().toISOString(),
        },
      ]);

      setReloadUser((prev) => !prev);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const res = await mutation(
        `attendance/create-attendance?courseId=${router?.query?.courseId}&classId=${classId}`,
        {
          method: "POST",
          body: {
            // timeOfIn: item?.Class?.timeOfEnter,
            // timeOfOut: item?.Class?.timeOfExit,
            // isPresent: true,
          },
        }
      );

      socketRef?.emit("join-to-class", {
        roomId: classId,
        userId: user?._id,
        user: {
          displayName: user?.name,
          photoUrl: user?.profileUrl,
          _id: user?._id,
        },
      });
    })();
  }, [classId, user?._id]);

  return (
    <>
      <div
        className={` ${
          drawerActive ? " w-[calc(100%-5vw)] md:w-[500px]" : "w-0 "
        } h-full fixed top-0 right-0 z-[999]  transition-all overflow-hidden ease-in-out duration-300 `}
      >
        <VideoChat
          classId={classId?.toString()}
          allChats={allChats}
          setAllChats={setAllChats}
          closeFn={() => setDrawerActive(false)}
        />
      </div>
      <div
        className={` ${
          attendanceDetails ? "w-[calc(100%-5vw)] md:w-[500px]" : "w-0 "
        } h-full   transition-all fixed top-0 right-0 z-[999] overflow-hidden ease-in-out duration-300 `}
      >
        <AttendanceDetails
          mutate={mutate}
          allUsers={data?.data?.data}
          closeFn={() => setAttendanceDetails(false)}
        />
      </div>
      <div className="lg:w-fit w-full z-50 fixed bottom-12 left-1/2 -translate-x-1/2 ">
        <div
          className={`grid ${
            user?.role === "TUTOR"
              ? "md:grid-cols-6 grid-cols-5"
              : "grid-cols-3"
          } px-4 py-2 md:px-12 md:p-4 bg-gray-100/30  rounded-md shadow-lg`}
        >
          <aside>
            <Badge color="info" variant="dot" invisible={!userJoined}>
              <Button
                onClick={() => {
                  setAttendanceDetails((prev) => !prev);
                  setDrawerActive(false);
                  setUserJoined(false);
                  buttonClicked.current = true;
                }}
                className="!px-0 !py-1 md:!px-4 md:!py-2 "
              >
                <span>
                  {attendanceDetails ? (
                    <People className="text-white shadow-lg   " />
                  ) : (
                    <People className="text-gray-900   " />
                  )}
                </span>
              </Button>
            </Badge>
          </aside>
          <aside>
            <Badge badgeContent={unreadMessages} color="success">
              <Button
                onClick={() => {
                  setDrawerActive((prev) => !prev);
                  setAttendanceDetails(false);
                  setUnreadMessages(0);
                  buttonClicked.current = true;
                }}
                className="!px-0 !py-1 md:!px-4 md:!py-2 "
              >
                <span>
                  {drawerActive ? (
                    <ChatOutlined className="text-white shadow-lg   " />
                  ) : (
                    <ChatOutlined className="text-gray-900   " />
                  )}
                </span>
              </Button>
            </Badge>
          </aside>
          {user?.role === "TUTOR" && (
            <Button
              onClick={shareScreen}
              className="!px-0 !py-1 md:!px-4 md:!py-2 "
            >
              <span>
                {isScreenSharing ? (
                  <PresentToAll className="text-white shadow-lg   " />
                ) : (
                  <PresentToAll className="text-gray-900   " />
                )}
              </span>
            </Button>
          )}

          {user?.role === "TUTOR" && (
            <Button
              onClick={muteAudio}
              className="!px-0 !py-1 md:!px-4 md:!py-2 "
            >
              <span>
                {isAudioMute ? (
                  <MicOff className="text-white shadow-lg   " />
                ) : (
                  <MicOutlined className="text-black   " />
                )}
              </span>
            </Button>
          )}

          {user?.role === "TUTOR" && (
            <Button
              onClick={muteVideo}
              className="!px-0 !py-1 md:!px-4 md:!py-2 "
            >
              <span>
                {isVideoMute ? (
                  <VideocamOff className="text-white shadow-lg   " />
                ) : (
                  <VideocamOutlined className="text-black  " />
                )}
              </span>
            </Button>
          )}

          <aside
            className={`${user?.role === "TUTOR" ? "hidden md:block" : ""}`}
          >
            <Button
              className="!bg-red-500 !px-2 !py-1 md:!px-4 md:!py-2"
              onClick={endCall}
            >
              <span className="flex items-center md:gap-4 gap-1">
                <h3 className="font-medium tracking-wide text-xs whitespace-nowrap text-white md:text-base">
                  {user?.role === "TUTOR" ? "End Call" : "Leave Call"}
                </h3>
                <Call className="text-white text-lg md:text-3xl  " />
              </span>
            </Button>
          </aside>
        </div>
        <aside
          className={`${
            user?.role === "TUTOR" ? "md:hidden" : "hidden"
          } flex justify-center items-center mt-4`}
        >
          <Button className="!bg-red-500 !px-3 !py-1" onClick={endCall}>
            <span className="flex items-center gap-2">
              <h3 className="font-medium tracking-wide text-xs whitespace-nowrap text-white">
                {user?.role === "TUTOR" ? "End Call" : "Leave Call"}
              </h3>
              <Call className="text-white text-lg" />
            </span>
          </Button>
        </aside>
      </div>
    </>
  );
};

export default CallButtons;
