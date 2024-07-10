import Beenhere from "@mui/icons-material/Beenhere";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CircularProgressWithLabel } from "components/core";
import AccountRadialBar from "components/graphs/StudentGraph";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { downloadFile } from "hooks/useText";
import { studentPanel } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";

const DisplayProgressBox = ({
  courseDATA,
  finalExamData,
  finalCreateData,
  getFinalResult,
  progress,
  progressMutate,
}: {
  courseDATA: any;
  finalExamData: any;
  finalCreateData: any;
  getFinalResult: any;
  progress: any;
  progressMutate: () => void;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const { mutation, isLoading } = useMutation();
  const [downloading, setDownloading] = useState(false);

  const downLoadCertificate = async () => {
    try {
      setDownloading(true);
      const res: any = await downloadFile({
        url: `/certificate/create-certificate`,
        method: "POST",
        body: {
          name: user?.name,
          tutorName: getCourse?.Tutor?.name,
          courseName: getCourse?.courseName,
        },
      });
      setDownloading(false);
      // if (res.status !== 200) throw new Error("Something went wrong");
      Swal.fire(
        `Success`,
        studentPanel(selectedLanguage).DownloadSuccessfully,
        "success"
      );
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

  const handleCompleteCourse = async () => {
    try {
      const res: any = await mutation(
        `courseCompleted/course-completed-status?courseId=${router?.query?.courseID}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
    } finally {
    }
  };

  const finalHandle = () => {
    downLoadCertificate();
    handleCompleteCourse();
  };

  const getCourse = courseDATA?.data?.data?.data?.[0];
  const { selectedLanguage } = useAppContext();

  function countContentTypes(course: any) {
    const counts = {
      video: 0,
      linkMaterial: 0,
      questions: 0,
      studyMaterial: 0,
    };
    course?.Section?.forEach((section: any) => {
      counts.video += section.videoSection?.length ?? 0;
      counts.linkMaterial += section?.linkMaterial?.length ?? 0;
      // counts.questions += section?.questions?.length ?? 0;
      counts.studyMaterial += section?.studyMaterial?.length ?? 0;
    });

    return counts;
  }
  // Get the counts
  const contentCounts = countContentTypes(getCourse);

  return (
    <section>
      <div className="lg:p-6 p-3 lg:my-3 bg-gray-800 rounded-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg border-4 hover:border-yellow-400">
            <p className="text-center text-xl font-bold">
              {studentPanel(selectedLanguage).OverallProgress}
            </p>
            <AccountRadialBar
              valueSize="20px"
              height={220}
              type={"radialBar"}
              value={progress?.data?.overallCompletionRate || 0}
              colors={["#0e0e66"]}
            />
          </div>

          {/* Certificate Download Section */}
          <div className="text-left text-gray-200 font-semibold lg:text-xl p-5">
            {/* Display Certificate Download Section if all conditions are met */}
            {progress?.data?.overallCompletionRate === 100 &&
            finalExamData?.data?.data &&
            finalExamData?.data?.data?.examData?.length > 0 &&
            Boolean(getFinalResult?.isPass) &&
            progress?.data?.overallCompletionRate === 100 ? (
              <div className="text-left">
                <p className="text-xl text-white mb-4 font-semibold">
                  <span className="text-green-400">
                    {studentPanel(selectedLanguage).congratulation}
                  </span>{" "}
                  {
                    studentPanel(selectedLanguage)
                      .Youhavesuccessfullycompletedallthecoursematerials
                  }
                </p>
                <p className="text-sm text-gray-200 mb-4">
                  {
                    studentPanel(selectedLanguage)
                      .Youcannowclickthebuttonbelowtogenerateyourcertificate
                  }
                </p>
                <button
                  onClick={finalHandle}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 text-base rounded border border-white common-transition"
                >
                  {downloading
                    ? studentPanel(selectedLanguage).downloading
                    : studentPanel(selectedLanguage).DownloadCertificate}
                </button>
              </div>
            ) : (
              <div>
                {/* Display Instructions if conditions are not met */}
                <p className="text-lg text-gray-200 mb-4 mt-4">
                  {
                    studentPanel(selectedLanguage)
                      .Toearnyourcertificatepleasemakesureto
                  }
                  :
                </p>
                <ul className="list-disc pl-6 text-green-400">
                  <li>
                    {" "}
                    {studentPanel(selectedLanguage).Watchallcoursevideos}
                  </li>
                  <li>
                    {studentPanel(selectedLanguage).Readallstudymaterials}
                  </li>
                  {finalCreateData?.data?.data?.[0] &&
                    finalExamData?.data?.data &&
                    finalExamData?.data?.data?.examData?.length > 0 && (
                      <li>{studentPanel(selectedLanguage).Givethefinaltest}</li>
                    )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:p-6 p-3 my-6 bg-primary rounded-xl text-black">
        <div
          className={`${
            Boolean(
              finalCreateData?.data?.data?.[0] &&
                finalExamData?.data?.data &&
                finalExamData?.data?.data?.examData?.length > 0
            )
              ? "lg:grid-cols-4 md:grid-cols-2"
              : "lg:grid-cols-3 md:grid-cols-3"
          } grid  grid-cols-1 lg:gap-5 gap-3`}
        >
          {/* Video Material Progress */}
          <div className="text-center space-y-1 bg-gray-100 p-4 rounded-lg shadow-lg border-4 hover:border-yellow-400">
            <p className="text-primary/80 font-semibold">
              {studentPanel(selectedLanguage).videomaterialprogress}
            </p>
            <CircularProgressWithLabel
              value={progress?.data?.videoCompletionRate || 0}
            />
            <p className="font-medium">
              {studentPanel(selectedLanguage).TotalVideos}:{" "}
              {contentCounts?.video}
            </p>
            <p className="font-medium">
              {studentPanel(selectedLanguage).Youhavewatched}{" "}
              {progress?.data?.watchedVideos || 0}{" "}
              {studentPanel(selectedLanguage).outof}{" "}
              {progress?.data?.totalVideos || 0}{" "}
              {studentPanel(selectedLanguage).videos}.
            </p>
          </div>
          {/* Document Progress */}
          <div className="text-center space-y-1 bg-gray-100 p-4 rounded-lg shadow-lg border-4 hover:border-yellow-400">
            <p className="text-primary/80 font-semibold">
              {studentPanel(selectedLanguage).Documentprogress}
            </p>
            <CircularProgressWithLabel
              value={progress?.data?.studyMaterialCompletionRate || 0}
            />
            <p className="font-medium">
              {studentPanel(selectedLanguage).TotalStudyMaterial}:{" "}
              {contentCounts?.studyMaterial}
            </p>
            <p className="font-medium">
              {studentPanel(selectedLanguage).Youhaveread}{" "}
              {progress?.data?.readStudyMaterials || 0}{" "}
              {studentPanel(selectedLanguage).outof}{" "}
              {progress?.data?.totalStudyMaterials || 0}{" "}
              {studentPanel(selectedLanguage).documents}.
            </p>
          </div>
          {/* LinkMaterial Progress */}
          <div className="text-center space-y-1 bg-gray-100 p-4 rounded-lg shadow-lg border-4 hover:border-yellow-400">
            <p className="text-primary/80 font-semibold text-md">
              {studentPanel(selectedLanguage).linkmaterialprogress}
            </p>
            <CircularProgressWithLabel
              value={progress?.data?.linkMaterialCompletionRate || 0}
            />
            <p className="font-medium">
              {studentPanel(selectedLanguage).Totallinkmaterial}:{" "}
              {contentCounts?.linkMaterial}
            </p>
            <p className="font-medium">
              {studentPanel(selectedLanguage).Youhaveread}{" "}
              {progress?.data?.clickedLinks || 0}{" "}
              {studentPanel(selectedLanguage).outof}{" "}
              {progress?.data?.totalLinkMaterials || 0}{" "}
              {studentPanel(selectedLanguage).links}.
            </p>
          </div>
          {/* Final Exam Progress */}
          <div className="group border border-none">
            {finalCreateData?.data?.data?.[0] &&
              finalExamData?.data?.data &&
              finalExamData?.data?.data?.examData?.length > 0 && (
                <aside className="flex flex-col gap-2 items-center space-y-1 bg-gray-100 p-8 rounded-lg shadow-lg border-4 group-hover:border-yellow-400 ">
                  <p className="text-primary/80 font-semibold text-center">
                    {studentPanel(selectedLanguage).FinalExamProgress}
                  </p>
                  <div className="">
                    {getFinalResult?.isPass ? (
                      <Beenhere className="text-green-600 !text-4xl" />
                    ) : (
                      <HighlightOffIcon className="text-red-600 !text-5xl" />
                    )}
                  </div>
                  <div className="text-center">
                    {getFinalResult?.isPass == true ? (
                      <div className="text-center">
                        <p className="text-green-600 font-semibold">
                          {
                            studentPanel(selectedLanguage)
                              .Youhavepassedthefinalexam
                          }
                          .
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-red-600 font-medium">
                          {
                            studentPanel(selectedLanguage)
                              .Youhavenotcompletedthefinalexam
                          }
                          .
                        </p>
                      </div>
                    )}
                  </div>
                </aside>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayProgressBox;
