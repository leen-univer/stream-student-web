import {
  AccountCircleRounded,
  DeleteOutline,
  Preview,
  Search,
} from "@mui/icons-material";
import { Pagination, Tooltip } from "@mui/material";
import { AddCourseDialog, UpdateCourseDialog } from "components/forms";
import { TutorPanelLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { currencyFormatter } from "utils";
import showError from "utils/error";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import {
  deleteContent,
  tutorAddCoursePage,
  tutorCourseDetailContent,
} from "locale";
import Link from "next/link";
import { tutorCourseArrType } from "types/tutorCourseCard";
import { sliceSentence } from "utils/SliceSentence";

const ManageCourses = () => {
  const [openEditPrescriptionDrawer, setOpenEditPrescriptionDrawer] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { selectedLanguage } = useAppContext();
  const [pageNo, setPageNo] = useState(1);

  const { user } = useAuth();
  const tutorId = user?._id;

  // const { data, isValidating, mutate } = useSWRAPI(
  //   `tutor/all-course/${tutorId}`
  // );

  const {
    data: searchData,
    isValidating: searchIsValidating,
    mutate: searchMutate,
  } = useSWRAPI(
    `contact/get-search?perPage=10&pageNo=${pageNo}&searchTitle=${searchValue}`
  );
  const filteredData = searchData?.data?.data?.data;

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <TutorPanelLayout title="Manage Course | StreamStudent">
      <h1 className="text-4xl font-bold text-primary">
        {tutorAddCoursePage(selectedLanguage).yourCourses}
      </h1>
      <div className="flex mb-6 gap-6 items-center justify-end mr-9">
        <div className="flex gap-2 border-2 border-primary items-center px-2 rounded-md">
          <Search className="text-3xl text-gray-700" />
          <input
            type="search"
            value={searchValue}
            onChange={handleSearch}
            className="outline-none p-2 text-lg font-medium"
            placeholder={tutorAddCoursePage(selectedLanguage).searchCourses}
          />
        </div>
      </div>
      <section className="w-full flex flex-col items-center justify-center">
        {searchIsValidating ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="w-full flex items-center">
            <div className="h-40 w-80">
              <AddCourseDialog mutate={searchMutate} />
            </div>
            {/* <div className="text-2xl">No data Found</div> */}
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <AddCourseDialog mutate={searchMutate} />
            </div>
            {filteredData?.map((data: tutorCourseArrType) => (
              <PanelCourseCard
                key={data?._id}
                course={data}
                mutate={searchMutate}
              />
            ))}
          </div>
        )}
      </section>
      <div className="w-full flex items-center justify-center py-4 mt-2 ">
        <Pagination
          count={Math.ceil(
            Number(searchData?.data?.data?.totalCount || 1) /
              Number(searchData?.data?.data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div>
    </TutorPanelLayout>
  );
};

export const PanelCourseCard = ({
  course,
  mutate,
}: {
  course: tutorCourseArrType;
  mutate: () => void;
}) => {
  const { selectedLanguage } = useAppContext();
  const { mutation } = useMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCourse = async () => {
    try {
      setIsLoading(true);
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).yes,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await mutation(`tutor/delete-course/${course?._id}`, {
            method: "DELETE",
            isAlert: true,
          });
          mutate();
        }
        setIsLoading(false);
      });
    } catch (error) {
      showError(error);
      setIsLoading(false);
    }
  };
  const goToAddSection = () => {
    router.push(`add-section/${course?._id}`);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-full border border-primary/40  bg-[#e5f4ed] rounded-3xl">
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4.709zM12 20a8 8 0 01-8-8H0c0 6.627 5.373 12 12 12v-4zm-2-7a6 6 0 016-6V0C11.373 0 6 5.373 6 12h4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-primary">
              {deleteContent(selectedLanguage).Deleting}
            </p>
          </div>
        </div>
      ) : (
        <article className="relative group flex flex-col  bg-[#e5f4ed] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl  overflow-hidden">
          <div className="flex justify-center py-2  bg-primary"></div>
          <div className=" flex justify-center px-4">
            <img
              src={course?.thumbnailUrl}
              alt=""
              className="h-48 w-52 mt-2 object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1.5 px-4 py-2">
            <p className=" tracking-wide font-semibold text-primary  capitalize">
              {tutorCourseDetailContent(selectedLanguage).courseName}:{" "}
              <span className="text-primary font-medium">
                {course?.courseName}
              </span>{" "}
            </p>
            <p className=" tracking-wide font-semibold text-primary  capitalize">
              {tutorCourseDetailContent(selectedLanguage).Category}:{" "}
              <span className="text-primary font-medium">
                {course?.Categories?.name}
              </span>
            </p>
            {course?.SubCategory?.name == null ? (
              ""
            ) : (
              <p className=" tracking-wide font-semibold text-primary  capitalize">
                {tutorCourseDetailContent(selectedLanguage).subCategory}:{" "}
                <span className="text-primary font-medium">
                  {course?.SubCategory?.name}
                </span>
              </p>
            )}
            <p className="tracking-wide font-semibold text-primary  capitalize">
              {tutorCourseDetailContent(selectedLanguage).Description}:{" "}
              <span className="text-primary font-medium">
                {sliceSentence(course?.description, 20)}
              </span>
            </p>
            <p className="font-semibold text-primary">
              {tutorAddCoursePage(selectedLanguage).price}:{" "}
              <span className="font-medium text-primary line-through">
                {currencyFormatter(course?.mrpPrice)}
              </span>
            </p>
            <p className="font-semibold text-primary">
              {tutorAddCoursePage(selectedLanguage).salePrice}:{" "}
              <span className="text-primary font-medium">
                {currencyFormatter(course?.salePrice)}
              </span>
            </p>
            <p className="tracking-wide font-semibold text-primary  capitalize flex flex-row gap-3">
              {tutorCourseDetailContent(selectedLanguage).Language}:{" "}
              <span className="text-primary font-medium flex flex-row gap-3 flex-wrap">
                {course?.language?.map((item: tutorCourseArrType) => (
                  <p
                    key={item?._id}
                    className="bg-primary/5 px-2 py-1 rounded-lg text-sm"
                  >
                    {item?.options}
                  </p>
                ))}
              </span>
            </p>
          </div>

          <div className=" invisible absolute top-14 right-0 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible">
            <Link href={`/tutor-account/courses/view-students/${course?._id}`}>
              <Tooltip
                title={tutorCourseDetailContent(selectedLanguage).viewStudents}
                followCursor
                placement="top-start"
                arrow
              >
                <button className="w-8 h-8 grid place-items-center rounded-full border border-blue-500 bg-blue-500/10 text-blue-500">
                  <AccountCircleRounded fontSize="small" />
                </button>
              </Tooltip>
            </Link>
            <Link href={`/tutor-account/courses/section/${course?._id}`}>
              <Tooltip
                title={tutorCourseDetailContent(selectedLanguage).viewall}
                followCursor
                placement="top-start"
                arrow
              >
                <button className="w-8 h-8 grid place-items-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500">
                  <Preview fontSize="small" />
                </button>
              </Tooltip>
            </Link>

            <UpdateCourseDialog course={course} mutate={mutate} />
            <Tooltip
              title={tutorCourseDetailContent(selectedLanguage).deletecourse}
              followCursor
              placement="top-start"
              arrow
            >
              <button
                className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
                onClick={handleDeleteCourse}
              >
                <DeleteOutline fontSize="small" />
              </button>
            </Tooltip>
          </div>
        </article>
      )}
    </>
  );
};

export default ManageCourses;
