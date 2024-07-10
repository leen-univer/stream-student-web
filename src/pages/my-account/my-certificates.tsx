/* eslint-disable @next/next/no-img-element */
import { CERTIFICATE } from "assets/animations";
import { COURSEDEFAULT } from "assets/images";
import { useAppContext } from "contexts";
import dayjs from "dayjs";
import { useAuth, useSWRAPI } from "hooks";
import { downloadFile } from "hooks/useText";
import { AccountLayout, PublicLayout } from "layouts";
import { myCertificateContent, studentPanel } from "locale";
import { useState } from "react";
import Lottie from "react-lottie";
import Swal from "sweetalert2";

type certificateType = {
  _id?: string;
  courseData?: {
    courseName?: string;
    thumbnailUrl?: string;
    tutorData?: {
      name?: string;
    };
  };
  createdAt?: string;
};
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: CERTIFICATE,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const MyCertificates = () => {
  const { data } = useSWRAPI("student/allMyCompletedCourse");
  const { selectedLanguage } = useAppContext();
  return (
    <PublicLayout
      title="My Certificates | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-y-scroll">
          <h1 className="title-styling text-center pb-6 lg:pb-12">
            {myCertificateContent(selectedLanguage).My}{" "}
            <span className="text-primary">
              {myCertificateContent(selectedLanguage).Certificates}
            </span>
          </h1>
          {data?.data?.data?.data?.length ? (
            <aside className="grid md:grid-cols-2 grid-cols-1 gap-y-6 gap-x-4">
              {data?.data?.data?.data.map((item: certificateType) => (
                <CertificateCard item={item} key={item._id} />
              ))}
            </aside>
          ) : (
            <Lottie options={defaultOptions} height={400} width={400} />
          )}
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export default MyCertificates;

export const CertificateCard = ({ item }: { item: certificateType }) => {
  const { selectedLanguage } = useAppContext();
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);

  const downLoadCertificate = async () => {
    try {
      setDownloading(true);
      const res: any = await downloadFile({
        url: `/certificate/create-certificate`,
        method: "POST",
        body: {
          name: user?.name,
          tutorName: item?.courseData?.tutorData?.name,
          courseName: item?.courseData?.courseName,
        },
      });
      setDownloading(false);
      // if (res.status !== 200) throw new Error("Something went wrong");
      Swal.fire(`Success`, "Download successfully!!", "success");
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
    } finally {
      setDownloading(false);
    }
  };
  return (
    <article className="flex flex-col rounded-lg border-t-4 border-primary/30 p-3 shadow-lg  hover:translate-y-1 common-transition">
      <img
        className="w-full h-[10rem] object-cover rounded-md"
        src={item?.courseData?.thumbnailUrl || COURSEDEFAULT.src}
        alt="profile-image"
      />
      <div className="flex flex-col gap-1 items-start pt-4">
        <p className="flex items-center font-semibold text-base">
          {myCertificateContent(selectedLanguage).courseName}:
          <span className="text-base font-medium ml-4">
            {item?.courseData?.courseName || "Course Name is not given"}
          </span>
        </p>
        <p className="flex items-center font-semibold text-base">
          {myCertificateContent(selectedLanguage).tutorName}:
          <span className="text-base font-medium ml-4">
            {item?.courseData?.tutorData?.name || "Tutor Name is not given"}
          </span>
        </p>
        <p className="flex items-center font-semibold text-base">
          {myCertificateContent(selectedLanguage).CompletionDate}:
          <span className="text-base font-medium ml-4">
            {(item?.createdAt &&
              dayjs(item?.createdAt).format("	ddd, MMM D, YYYY h:mm A")) ||
              "Completion date is not given"}
          </span>
        </p>
        <div className="flex justify-center w-full py-3">
          <button
            onClick={downLoadCertificate}
            className="btn-primary px-3 py-1.5"
          >
            {downloading
              ? studentPanel(selectedLanguage).downloading
              : studentPanel(selectedLanguage).DownloadCertificate}
          </button>
        </div>
      </div>
    </article>
  );
};
