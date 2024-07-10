import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AgoraCall = dynamic(() => import("../../components/videos/AgoraCall"), {
  ssr: false,
});

const ViewClass = () => {
  const { classId } = useRouter().query;

  return <AgoraCall classId={classId?.toString()} />;
};

export default ViewClass;
