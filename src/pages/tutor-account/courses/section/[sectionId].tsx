import {
  Add,
  Article,
  ArticleOutlined,
  DeleteOutline,
  EditOutlined,
  LiveHelpOutlined,
  Preview,
  QuestionAnswer,
  QuestionAnswerOutlined,
} from "@mui/icons-material";
import { CircularProgress, Tooltip } from "@mui/material";
import { LECTURE } from "assets/animations";
import {
  AddExamDrawer,
  AddSectionDialog,
  EditSectionDialog,
} from "components/forms";
import EditIntroVideoDialog from "components/forms/tutorForms/EditIntroVideoDialog";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import { courseSectionPage, dataContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { use, useState } from "react";
import Lottie from "react-lottie";
import Swal from "sweetalert2";
import { ICategories } from "types/tutorCourseCard";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LECTURE,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export interface ICourseDetails {
  _id: string;
  title: string;
  tutor: string;
  courseName: string;
  description: string;
  courseSubCategory: string;
  courseCategory: string;
  Category: ICategories;
  Section: ISection[];
  thumbnailUrl: string;
  mrpPrice: number;
  salePrice: number;
  thumbnailPath: string;
  publishStatus: string;
  createdAt: string;
  updatedAt: String;
}

export interface ISection {
  _id: string;
  topic: string;
  description: string;
  lec: string;
  hour: string;
  minutes: string;
}

const SectionId = () => {
  const router = useRouter();
  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false);
  const { selectedLanguage } = useAppContext();

  const { data, mutate, isValidating } = useSWRAPI(
    `tutor/all-section/${router?.query?.sectionId}`
  );
  return (
    <TutorPanelLayout title="Add Section | StreamStudent">
      <section className="w-full h-full space-y-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-bold text-primary uppercase lg:pr-12 md:pr-4">
              {data?.data?.courseName?.courseName}
            </h1>
          </div>
          <h2 className="text-xl font-medium tracking-wider lg:pr-12 md:pr-4">
            {data?.data?.courseName?.description}
          </h2>
          <div className=" text-lg font-semibold mt-4 text-white ">
            <p className="inline-block bg-primary/80  px-2 rounded-lg">
              {data?.data?.courseName?.Category?.name}
            </p>
          </div>
          {/* <h3 className="text-xl font-medium tracking-wider">
            {data?.data?.courseName?.Category?.description}
          </h3> */}
        </div>
        <div className="cursor-pointer flex md:justify-end flex-col md:flex-row gap-6 px-2">
          <AddSectionDialog mutate={mutate} />
          <EditIntroVideoDialog />
          <AddExamDrawer
            open={openEditPrescriptionDrawer}
            setOpenEditPrescriptionDrawer={() => setOpenEditPrescriptionDrawer}
            onClose={() => setOpenEditPrescriptionDrawer(false)}
          />
          <div
            className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
            onClick={() =>
              router.push(
                `/tutor-account/courses/exercises/${router?.query?.sectionId}`
              )
            }
          >
            <ArticleOutlined className="text-2xl" />
            <p className="text-lg font-medium">
              {dataContent(selectedLanguage).Longtypeques}
            </p>
          </div>
          <div
            className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
            onClick={() =>
              router.push(
                `/tutor-account/courses/student-questions/${router?.query?.sectionId}`
              )
            }
          >
            <LiveHelpOutlined className="text-2xl" />
            <p className="text-lg font-medium">
              {dataContent(selectedLanguage).studentsQuestions}
            </p>
          </div>
          <div
            className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded-md"
            onClick={() =>
              router.push(
                `/tutor-account/courses/faqs/${router?.query?.sectionId}`
              )
            }
          >
            <QuestionAnswerOutlined className="text-2xl" />
            <p className="text-lg font-medium">
              {dataContent(selectedLanguage).FAQs}
            </p>
          </div>
        </div>
        <div className="relative cursor-pointer">
          <div className="flex flex-col gap-6">
            {data?.data?.data?.map((item: any, index: number) => (
              <SectionCard key={index} sections={item} mutate={mutate} />
            ))}
          </div>
        </div>
      </section>
    </TutorPanelLayout>
  );
};

const SectionCard = ({ sections, mutate }: any) => {
  const router = useRouter();
  const { selectedLanguage } = useAppContext();
  const { mutation } = useMutation();
  const [isLoading, setIsLoading] = useState(false);

  const goToVideoSection = () => {
    router.push(
      `/tutor-account/courses/video-section/${sections?.sectionData?._id}`
    );
  };
  const handleDelete = async (id?: string) => {
    try {
      setIsLoading(true);
      const result = await Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).yes,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      });

      if (result.isConfirmed) {
        await mutation(`tutor/delete-section?sectionId=${id}`, {
          method: "DELETE",
          isAlert: true,
        });
        mutate();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {sections?.sectionData?.topic ? (
        <div className="bg-white py-4 px-6 flex items-center gap-4 justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md border-t-4 border-primary cursor-pointer hover:-translate-y-3 duration-300">
          <div className="flex flex-col gap-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-700">
                {sections?.sectionData?.topic}
              </h1>
              <p className="text-lg font-medium break-words">
                {sections?.sectionData?.description}
              </p>
              <p className="text-lg font-medium">
                {sections?.sectionData?.totalVideo}
                {courseSectionPage(selectedLanguage).lec}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Tooltip
              title={dataContent(selectedLanguage).Viewall}
              followCursor
              placement="top-start"
              arrow
            >
              <button
                className="w-8 h-8 grid place-items-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500"
                onClick={goToVideoSection}
              >
                <Preview />
              </button>
            </Tooltip>
            <EditSectionDialog data={sections?.sectionData} mutate={mutate} />
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Tooltip
                title={dataContent(selectedLanguage).DeleteLesson}
                followCursor
                placement="top-start"
                arrow
              >
                <button
                  disabled={isLoading}
                  onClick={() => handleDelete(sections?.sectionData?._id)}
                  className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
                >
                  <DeleteOutline />
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="capitalize font-semibold text-xl flex items-center justify-center">
            {dataContent(selectedLanguage).NoLecture}
          </p>
          <Lottie options={defaultOptions} height={500} width={550} />
        </div>
      )}
    </>
  );
};

export default SectionId;
