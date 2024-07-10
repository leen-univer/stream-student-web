import { MicOff, VideocamOff } from "@mui/icons-material";
import AgoraRTC, { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CallButtons from "./CallButtons";
import useMutation from "hooks/useMutataion";
import { AGORA_APP_ID } from "configs";
import { error } from "console";

const AgoraCall = ({ classId }: { classId?: string }) => {
  const { user } = useAuth();
  const { mutation } = useMutation();
  const { push, query } = useRouter();
  const [joinUsers, setJoinUsers] = useState<any[]>([]);

  const localStream = useRef<HTMLElement>(null);
  const client = useRef<any>();

  const videoTrack = useRef<any>();
  const audioTrack = useRef<IMicrophoneAudioTrack>();
  const shareScreenTrack = useRef<any>();
  const screenShareCheck = useRef(false);

  let checkPublish = useRef(false);

  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [audioMute, setAudioMute] = useState(false);
  const [videoMute, setVideoMute] = useState(false);
  const [joinToken, setJoinToken] = useState("");

  const isMounted = useRef(false);
  let count = useRef(0);

  const tokenCreateFn = async (uId: any, classID: string) => {
    try {
      const response = await mutation("agora/create-token", {
        method: "POST",
        body: {
          channelName: classID,
          uid: uId,
          role: "publisher",
          expireTime: 3600,
        },
        isFormData: false,
      });

      if (response?.results?.error) throw new Error(response?.results?.error);
      setJoinToken(response?.results?.data?.data?.token);
      return response?.results?.data?.data?.token;
    } catch (error: any) {
      new Error(error);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    (async () => {
      try {
        if (!user?.uId || !classId || !isMounted.current || !user?.role) return;

        if (count.current !== 0) return;
        count.current++;

        const token = await tokenCreateFn(user?.uId, classId);

        client.current = AgoraRTC.createClient({
          mode: "live",
          codec: "h264",
        });

        client.current.on("user-joined", (user: any, mediaType: any) => {});

        client.current.on(
          "user-published",
          async (user: any, mediaType: any) => {
            //subscribe to remote video
            await client.current.subscribe(user, mediaType);

            if (mediaType === "video") {
              const remoteVideoTrack = user.videoTrack;
              setJoinUsers((prevUsers) => {
                return [
                  ...prevUsers,
                  {
                    uid: user.uId,
                    audio: user.hasAudio,
                    video: user.hasVideo,
                    client: false,
                    videoTrack: remoteVideoTrack,
                  },
                ];
              });

              setVideoMute(false);

              document?.querySelector(`.localVideo`)?.remove();
              const localPlayerContainer = document.createElement("div");
              localPlayerContainer.id = "localVideo";
              localPlayerContainer.className = `localVideo w-full h-screen `;
              document
                ?.querySelector(".local-parent-div")
                ?.appendChild(localPlayerContainer);
              remoteVideoTrack && remoteVideoTrack.play("localVideo");
            }

            if (mediaType === "audio") {
              setAudioMute(false);
              const remoteAudioTrack = user.audioTrack;
              remoteAudioTrack.play();
              setJoinUsers((prevUsers) => {
                return prevUsers.map((User) => {
                  if (User.uId === user.uId) {
                    return { ...User, audio: user.hasAudio };
                  }
                  return User;
                });
              });
            }
          }
        );
        client.current.on(
          "user-unpublished",
          async (user: any, mediaType: any) => {
            if (mediaType === "audio") {
              setJoinUsers((prevUsers) => {
                return prevUsers.map((User) => {
                  if (User.uId === user.uId) {
                    return { ...User, audio: !User.audio };
                  }
                  return User;
                });
              });
              setAudioMute(true);
            }

            if (mediaType === "video") {
              setVideoMute(true);
              setJoinUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uId !== user.udI);
              });
            }
          }
        );

        await client.current.join(AGORA_APP_ID, classId, token, user?.uId);

        await client.current.setClientRole(
          user?.role === "STUDENT" ? "audience" : "host"
        );

        if (user?.role === "STUDENT") return;

        // media stream create
        const [microphoneTrack, cameraTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        videoTrack.current = cameraTrack;
        audioTrack.current = microphoneTrack;

        checkPublish.current = true;

        await client.current.publish([microphoneTrack, cameraTrack]);

        if (query?.joinWithoutAudio === "true") {
          muteAudio();
        }
        if (query?.joinWithoutVideo === "true") {
          muteVideo();
        }

        document?.querySelector(`.localVideo`)?.remove();
        const localPlayerContainer = document.createElement("div");
        localPlayerContainer.id = "localVideo";
        localPlayerContainer.className = `localVideo w-full h-screen `;
        document
          ?.querySelector(".local-parent-div")
          ?.appendChild(localPlayerContainer);
        cameraTrack && cameraTrack.play("localVideo");
        // client.current.enableAudioVolumeIndicator();
      } catch (error) {
        if (error instanceof Error) {
        } else {
        }
      }
    })();

    return () => {
      isMounted.current = false;
      if (checkPublish.current) {
        if (videoTrack.current?.enabled) {
          videoTrack.current?.setEnabled(false);
        }
        if (audioTrack.current?.enabled) {
          audioTrack.current?.setEnabled(false);
        }

        client.current?.leave();
      }
    };
  }, [
    user?.uId,
    classId,
    isMounted?.current,
    user?.role,
    query?.joinWithoutAudio,
    query?.joinWithoutVideo,
  ]);

  //handle share screen

  const shareScreen = async () => {
    if (isScreenSharing) {
      isMounted.current && setIsScreenSharing(false);
      screenShareCheck.current = false;
      videoTrack.current = await AgoraRTC.createCameraVideoTrack();
      shareScreenTrack.current.setEnabled(false);
      await client.current.unpublish(shareScreenTrack.current);
      await client.current?.publish(videoTrack.current);
      document?.querySelector(`.localVideo`)?.remove();
      const localPlayerContainer = document.createElement("div");
      localPlayerContainer.id = "localVideo";
      localPlayerContainer.className = "localVideo w-full h-screen";
      document
        ?.querySelector(".local-parent-div")
        ?.appendChild(localPlayerContainer);
      videoTrack.current.play("localVideo");
      return;
    }
    try {
      shareScreenTrack.current = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: "1080p_1",
        optimizationMode: "detail",
      });
      isMounted.current && setIsScreenSharing(true);
      screenShareCheck.current = true;
      videoTrack.current?.setEnabled(false);
      await client.current?.unpublish(videoTrack.current);
      await client.current.publish(shareScreenTrack.current);
      document?.querySelector(`.localVideo`)?.remove();
      const localPlayerContainer = document.createElement("div");
      localPlayerContainer.id = "localVideo";
      localPlayerContainer.className = "localVideo w-full h-screen";
      document
        ?.querySelector(".local-parent-div")
        ?.appendChild(localPlayerContainer);
      shareScreenTrack.current.play("localVideo");
    } catch (error: any) {
      new Error(error);
    }
  };

  useEffect(() => {
    (() => {
      isMounted.current = true;

      // When screen share stops this event will be triggered
      shareScreenTrack.current?.on("track-ended", async () => {
        try {
          if (!screenShareCheck.current) return;
          isMounted.current && setIsScreenSharing(false);
          screenShareCheck.current = false;
          videoTrack.current = await AgoraRTC.createCameraVideoTrack();
          shareScreenTrack.current.setEnabled(false);
          await client.current.unpublish(shareScreenTrack.current);
          await client.current?.publish(videoTrack.current);
          document?.querySelector(`.localVideo`)?.remove();
          const localPlayerContainer = document.createElement("div");
          localPlayerContainer.id = "localVideo";
          localPlayerContainer.className = "localVideo w-full h-screen";
          document
            ?.querySelector(".local-parent-div")
            ?.appendChild(localPlayerContainer);
          videoTrack.current.play("localVideo");
        } catch (error) {}
      });
    })();

    return () => {
      isMounted.current = false;
    };
  }, [isMounted.current, screenShareCheck.current, shareScreenTrack.current]);

  //handle user leave
  // const handleUserLeave = async () => {
  //   try {
  //   socketRef?.emit("user-leaving-class", {
  //     userId: user?._id,
  //     roomId: classId,
  //     user: {
  //       displayName: user?.displayName,
  //       photoUrl: user?.photoUrl,
  //       _id: user?._id,
  //     },
  //   });
  //     if (user?.role !== "STUDENT") return;
  //     //update student attendance
  //     const attendance = await mutation(
  //       `attendance/update-attendance?attendanceId=${}`,
  //       {
  //         method: "PUT",
  //         body: {},
  //       }
  //     );
  //     if (attendance?.data?.error) throw new Error(attendance?.data?.error);
  //   } catch (error) {}
  // };

  const handleUserAttendance = async () => {
    try {
      //first get all student of the batch
      //   const allStudent = await mutate({
      //     path: `attendance/${classId}`,
      //     method: "GET",
      //   });
      //   if (allStudent?.status === 200) {
      //     //then make attendance of all student who are absent
      //     let absentFormData = new FormData();
      //     allStudent?.data?.data?.data
      //       ?.filter((item: any) => item?.isPresent === false)
      //       ?.forEach((item: any) => {
      //         absentFormData?.append("user", item?.student?._id);
      //       });
      //     absentFormData.append("isAbsent", String(true));
      //     absentFormData.append("isPresent", String(false));
      //     absentFormData.append("classId", String(classId));
      //     await mutate({
      //       path: "attendance/create",
      //       method: "POST",
      //       body: absentFormData,
      //       isFormData: true,
      //     });
      //   }
    } catch (error) {
      //   notify.error("Failed creating student attendance.");
    }
  };

  const handleUserLeave = async () => {
    try {
      const attendance = await mutation(
        `attendance/update-timeOfOut?classId=${classId}`,
        {
          method: "PUT",
          body: {},
        }
      );
    } catch (error) {}
  };

  window.addEventListener("beforeunload", async (event) => {
    if (user?.role === "STUDENT") {
      await handleUserLeave();
    } else {
      await handleUserAttendance();
    }
  });

  //handle end call
  const endCall = async () => {
    client.current?.leave();

    if (user?.role === "STUDENT") {
      handleUserLeave();
      push(`/my-account/online-classes`);
    } else {
      await handleUserAttendance();
      push(`/tutor-account/schedule`);
    }
  };

  //handle mute video
  const muteVideo = () => {
    setVideoMute(Boolean(videoTrack.current?.enabled));
    videoTrack.current?.setEnabled(!videoTrack.current?.enabled);
  };

  //handle mute audio
  const muteAudio = () => {
    setAudioMute(Boolean(audioTrack.current?.enabled));
    audioTrack.current?.setEnabled(!audioTrack.current?.enabled);
  };

  return (
    <>
      {videoMute && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-gray-800 z-10 ">
          <div className="bg-theme z-[9999] flex-col gap-4 rounded-full flex items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-8 justify-center">
            <VideocamOff className="text-white !text-7xl " />
            <h3 className="font-medium tracking-wide text-xs">
              Video Turned Off
            </h3>
          </div>
        </div>
      )}
      {audioMute && (
        <div className="bg-gray-100/10 z-[9999] flex-col gap-4 rounded-xl flex items-center fixed lg:left-10 md: lg:bottom-10 p-4 justify-center">
          <MicOff className="text-white !text-5xl " />
          <h3 className="font-medium tracking-wide text-xs">
            Audio Turned Off
          </h3>
        </div>
      )}

      <div className="local-parent-div w-full min-h-screen text-white"></div>

      <CallButtons
        classId={classId?.toString()}
        shareScreen={shareScreen}
        endCall={endCall}
        muteVideo={muteVideo}
        muteAudio={muteAudio}
        isVideoMute={videoMute}
        isAudioMute={audioMute}
        isScreenSharing={isScreenSharing}
      />
    </>
  );
};

export default AgoraCall;
