import {
  CallEnd,
  Mic,
  OpenWith,
  Send,
  Settings,
  Videocam,
} from "@mui/icons-material";
import Head from "next/head";

const VideoCall = () => {
  return (
    <section className="bg-primary/5 lg:h-screen py-8 lg:py-16">
      <Head>
        <title>Video Call Ongoing</title>
      </Head>
      <article className="main-container h-[calc(100vh-128px)] flex flex-col lg:flex-row lg:justify-between gap-4 2xl:gap-6">
        <section className="relative w-full lg:w-[70%] h-full bg-cover bg-[url('/Image/Ada.jpg')] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl ">
          <aside className="flex flex-col gap-5 absolute top-8 right-8">
            <img
              className="w-24 h-24 object-cover rounded-2xl border-4 border-white"
              src="/Image/Ada.jpg"
              alt=""
            />
            <img
              className="w-24 h-24 object-cover rounded-2xl border-4 border-white"
              src="/Image/sarah.jpg"
              alt=""
            />
            <img
              className="w-24 h-24  object-cover rounded-2xl border-4 border-white"
              src="/Image/sarkan.jpg"
              alt=""
            />
            <img
              className="w-24 h-24  object-cover rounded-2xl border-4 border-white"
              src="/Image/murat.jpg"
              alt=""
            />
          </aside>
          <aside className="w-full flex items-center justify-center mt-4">
            <div className="w-32 p-3 bg-black/30 flex items-center justify-center gap-2 rounded-xl">
              <div className="w-3 h-3 rounded-full flex items-center justify-center border-4">
                <p className="w-1 h-1 rounded-full bg-red-500"></p>
              </div>
              <p className="text-white font-semibold">03:20</p>
            </div>
          </aside>

          <aside className="absolute bottom-7 w-full flex items-center justify-center gap-5">
            <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white">
              <OpenWith fontSize="medium" className="" />
            </button>
            <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white">
              <Mic fontSize="medium" className="" />
            </button>
            <button className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center text-white">
              <CallEnd fontSize="large" className="" />
            </button>
            <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white">
              <Videocam fontSize="medium" className="" />
            </button>
            <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center text-white">
              <Settings fontSize="medium" className="" />
            </button>
          </aside>
        </section>
        <section className="w-full lg:w-[30%] p-4 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl">
          <ChatScreen />
        </section>
      </article>
    </section>
  );
};

//? chat screen section
const ChatScreen = () => {
  return (
    <article className="relative h-full">
      <aside className="flex flex-col gap-4 h-[calc(100%-64px)] overflow-hidden overflow-y-scroll">
        <ReceiverEndChatBox chat="Hello Ada" />
        <SenderEndChatBox chat="Hello Sarah" />
        <ReceiverEndChatBox chat="What are doing" />
        <SenderEndChatBox chat="Nothing muchNothing muchNothing muchNothing much" />
      </aside>

      <aside className="absolute bottom-0 w-full bg-gray-100 flex justify-between items-center px-2 py-3 rounded-md">
        <input
          type="text"
          placeholder="Write your message.."
          className="outline-none w-full bg-transparent"
        />
        <Send fontSize="medium" className="text-primary" />
      </aside>
    </article>
  );
};

//? receiver end chat box
const ReceiverEndChatBox = ({ chat }: { chat: string }) => {
  return (
    <div className="w-full flex items-end gap-2">
      <img
        className="w-5 h-5 object-cover rounded-full border"
        src="/Image/sarah.jpg"
        alt="Tutor"
      />
      <p className="relative min-w-[8rem] max-w-[75%] bg-gray-200 p-2 rounded-t-md rounded-br-md">
        {chat}
        <span className="absolute bottom-0 right-full border-t-8 border-t-gray-200 border-l-8 border-l-white rotate-90"></span>
      </p>
    </div>
  );
};

//? sender end chat box
const SenderEndChatBox = ({ chat }: { chat: string }) => {
  return (
    <div className="w-full flex items-end justify-end pr-1.5 gap-2">
      <p className="relative min-w-[8rem] max-w-[75%] bg-primary/20 p-2 rounded-t-md rounded-bl-md text-primary">
        {chat}
        <span className="absolute bottom-0 left-full border-t-8 border-t-primary/20 border-l-8 border-l-white rotate-180"></span>
      </p>
    </div>
  );
};

export default VideoCall;
