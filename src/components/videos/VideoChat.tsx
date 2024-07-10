import { Chat, Close, Send } from "@mui/icons-material";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useAuth } from "hooks";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "contexts";
import Swal from "sweetalert2";

const VideoChat = ({
  classId,
  allChats,
  setAllChats,
  closeFn,
}: {
  classId?: string;
  allChats?: any[];
  setAllChats?: (arg: any) => void;
  closeFn?: () => void;
}) => {
  const [userMessage, setUserMessage] = useState("");

  const { socketRef } = useAppContext();

  const scrollRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  const handleSendMessage = () => {
    try {
      if (!userMessage?.trim()) return;

      socketRef?.emit("message-to-chat", {
        roomId: classId,
        message: {
          message: userMessage,
          user: {
            displayName: user?.name,
            photoUrl: user?.profileUrl,
            _id: user?._id,
          },
          createdAt: new Date().toISOString(),
          _id: Date.now() * Math.random(),
        },
      });

      setAllChats?.((prev: any) => [
        ...prev,
        {
          message: userMessage,
          user: {
            displayName: user?.name,
            photoUrl: user?.profileUrl,
            _id: user?._id,
          },
          createdAt: new Date().toISOString(),
          _id: Date.now() * Math.random(),
        },
      ]);

      setUserMessage("");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire("Error", error?.message, "error");
      } else {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (allChats?.length || 0 > 0) {
        scrollRef.current &&
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return;
    };
    scrollToBottom();
  }, [allChats]);

  return (
    <div className="w-full relative min-h-screen border-l-white shadow-lg !bg-[#F5F6F1] border-l rounded-tl-2xl">
      <div className="flex justify-between w-full text-white bg-primary items-center rounded-tl-2xl">
        <h3 className="font-semibold text-white text-2xl tracking-wide p-4 flex items-center gap-3">
          <Chat fontSize="large" />
          Live Chat
        </h3>
        <IconButton
          className="hover:bg-slate-500 rounded-full p-1"
          onClick={closeFn}
        >
          <Close className="text-white" />
        </IconButton>
      </div>
      <div className="w-full flex flex-col h-[85vh] overflow-y-auto pb-20">
        {allChats?.map((item, index) => {
          if (item?.user?._id !== user?._id) {
            return (
              <div
                className="w-full flex items-start gap-2 p-4 "
                key={item?._id + `-` + index}
                ref={scrollRef}
              >
                <div className="relative">
                  <Avatar
                    src={item?.user?.photoUrl}
                    className="object-cover rounded-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"
                  >
                    {item?.user?.displayName}
                  </Avatar>
                  <span className="absolute bottom-0 right-0 shadow-lg border bg-green-500 h-3 w-3 rounded-full"></span>
                </div>
                <span className="flex flex-col gap-1  max-w-[70%] justify-end ">
                  <small className="tracking-wide font-medium text-blue-900 p-2 text-sm">
                    {item?.user?.displayName}
                  </small>
                  <small className="tracking-wide bg-white rounded-r-3xl rounded-bl-3xl py-3 px-4 shadow-xl shadow-gray-200">
                    {item?.message}
                  </small>

                  <small className=" ml-4 text-xs text-theme text-right mt-1">
                    {dayjs(item?.createdAt).format("HH:mm A")}
                  </small>
                </span>
              </div>
            );
          } else {
            return (
              <div
                className="w-full flex items-start justify-end  gap-2 p-4 "
                key={item?._id + `-` + index}
                ref={scrollRef}
              >
                <span className="flex flex-col gap-1 max-w-[70%]  ">
                  <small className="tracking-wide bg-slate-100/50 text-black shadow-xl shadow-gray-200 rounded-l-3xl rounded-br-3xl py-3 px-4">
                    {item?.message}
                  </small>

                  <small className="ml-4 text-xs mt-1 ">
                    {dayjs(item?.createdAt).format("HH:mm A")}
                  </small>
                </span>
              </div>
            );
          }
        })}
      </div>
      <div className="absolute right-0 bottom-0 flex items-center gap-4 p-4 w-full bg-green-300/10 rounded-t-2xl ">
        <TextField
          type="text"
          fullWidth
          variant="standard"
          value={userMessage}
          placeholder="Type message..."
          className="border-theme !text-white"
          onKeyDown={(e: any) => {
            if (e?.key === "Enter") {
              setUserMessage(e?.target?.value);
              handleSendMessage();
            }
          }}
          onChange={(e) => setUserMessage(e.target.value)}
        />{" "}
        <Button
          className="flex items-center !bg-blue-200/30"
          onClick={handleSendMessage}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default VideoChat;

// import { Close } from "@mui/icons-material";
// import { Avatar, Button, IconButton, TextField } from "@mui/material";
// import dayjs from "dayjs";
// import { useAuth } from "hooks";
// import { useEffect, useRef, useState } from "react";
// import { useAppContext } from "contexts";
// import Swal from "sweetalert2";

// const VideoChat = ({
//   classId,
//   allChats,
//   setAllChats,
//   closeFn,
// }: {
//   classId?: string;
//   allChats?: any[];
//   setAllChats?: (arg: any) => void;
//   closeFn?: () => void;
// }) => {
//   const [userMessage, setUserMessage] = useState("");

//   const { socketRef } = useAppContext();

//   const scrollRef = useRef(null);

//   const { user } = useAuth();

//   const handleSendMessage = () => {
//     try {
//       if (!userMessage.trim()) return;

//       const newMessage = {
//         message: userMessage,
//         user: {
//           displayName: user?.displayName,
//           photoUrl: user?.photoUrl,
//           _id: user?._id,
//         },
//         createdAt: new Date().toISOString(),
//         _id: Date.now() * Math.random(),
//       };

//       socketRef?.emit("message-to-chat", {
//         roomId: classId,
//         message: newMessage,
//       });

//       // Update the chat with the new message
//       setAllChats((prevChats) => [...prevChats, newMessage]);

//       setUserMessage("");
//     } catch (error) {
//       if (error instanceof Error) {
//         Swal.fire("Error", error.message, "error");
//       } else {
//         Swal.fire("Error", "Something went wrong.", "error");
//       }
//     }
//   };

//   useEffect(() => {
//     const scrollToBottom = () => {
//       if (allChats && allChats.length > 0 && scrollRef.current) {
//         scrollRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     };
//     scrollToBottom();
//   }, [allChats]);

//   return (
//     <div className="w-full relative min-h-screen border-l-white-700 shadow-lg bg-gray-200 border-l">
//       <div className="flex justify-between w-full bg-theme items-center">
//         <h3 className="font-medium tracking-wide text-lg p-4">Live Chat</h3>
//         <IconButton onClick={closeFn}>
//           <Close />
//         </IconButton>
//       </div>
//       <div className="w-full flex flex-col h-[90vh] overflow-hidden overflow-y-auto pb-20">
//         {allChats?.map((item, index) => (
//           <div
//             className={`w-full flex items-start gap-2 p-4 ${
//               item.user._id === user?._id ? "justify-end" : ""
//             }`}
//             key={item._id + `-${index}`}
//             ref={scrollRef}
//           >
//             {item.user._id !== user?._id && (
//               <Avatar src={item.user.photoUrl}>
//                 {item.user.displayName[0]}
//               </Avatar>
//             )}
//             <div className="flex flex-col gap-1 max-w-[70%] justify-end">
//               <small className="tracking-wide text-white p-2">
//                 {item.user.displayName}
//               </small>
//               <small
//                 className={`tracking-wide p-2 rounded-r-full rounded-bl-full ${
//                   item.user._id === user?._id ? "bg-theme" : "bg-gray-200"
//                 }`}
//               >
//                 {item.message}
//               </small>
//               <small className="ml-4 text-xs text-theme text-right">
//                 {dayjs(item.createdAt).format("HH:mm A")}
//               </small>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="absolute right-0 bottom-0 flex items-center gap-4 p-4 w-full bg-theme">
//         <TextField
//           type="text"
//           fullWidth
//           variant="standard"
//           value={userMessage}
//           placeholder="Type message..."
//           className="border-theme text-white"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               setUserMessage(e.target.value);
//               handleSendMessage();
//             }
//           }}
//           onChange={(e) => setUserMessage(e.target.value)}
//         />
//         <Button className="bg-theme" onClick={handleSendMessage}>
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VideoChat;
