/* eslint-disable @next/next/no-img-element */
import {
  Book,
  Close,
  DeleteOutline,
  LibraryBooksOutlined,
  Preview,
  Search,
} from "@mui/icons-material";
import {
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Tooltip,
} from "@mui/material";
import { AddBundleDialog, UpdateBundleDialog } from "components/forms";
import BundleSkeleton from "components/skeleton/BundleSkeleton";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import { deleteContent, tutorAddCoursePage } from "locale";
import { useState } from "react";
import Swal from "sweetalert2";
import { bundleDataType, coursesArrType } from "types";
import showError from "utils/error";
import { sliceSentence } from "utils/SliceSentence";

const ManageBundles = () => {
  const { user } = useAuth();
  const tutorId = user?._id;
  const [searchValue, setSearchValue] = useState("");
  const [pageNo, setPageNo] = useState(1);
  // const {
  //   data: bundleData,
  //   mutate: bundleMutate,
  //   isValidating: bundleValidating,
  // } = useSWRAPI(
  //   `bundles/get-all-bundles?perPage=6&pageNo=${pageNo}&tutorId=${tutorId}`
  // );
  const {
    data: searchData,
    isValidating: searchIsValidating,
    mutate: searchMutate,
  } = useSWRAPI(
    `bundles/get-search-bundle?perPage=10&pageNo=${pageNo}&searchTitle=${searchValue}`
  );
  const filteredData = searchData?.data?.data?.data;

  const { selectedLanguage } = useAppContext();

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <TutorPanelLayout title="Manage bundles | StreamStudent">
      <h1 className="text-4xl font-bold text-primary">
        {tutorAddCoursePage(selectedLanguage).Bundles}
      </h1>
      <div className="flex mb-6 gap-6 items-center justify-end mr-9">
        <div className="flex gap-2 border-2 border-primary items-center px-2 rounded-md">
          <Search className="text-3xl text-gray-700" />
          <input
            type="search"
            value={searchValue}
            onChange={handleSearch}
            className="outline-none p-2 text-lg font-medium"
            placeholder={tutorAddCoursePage(selectedLanguage).searchBundles}
          />
        </div>
      </div>
      <section className="w-full flex flex-col items-center justify-center">
        {searchIsValidating ? (
          <aside className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
          </aside>
        ) : filteredData?.length === 0 ? (
          <aside className="w-full flex items-center">
            <div className="h-40 w-80">
              <AddBundleDialog mutate={searchMutate} />
            </div>
          </aside>
        ) : (
          <aside className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <AddBundleDialog mutate={searchMutate} />
            </div>
            {searchIsValidating && filteredData ? (
              <BundleSkeleton />
            ) : (
              <>
                {filteredData?.map((data: bundleDataType) => (
                  <BundleCard
                    key={data?._id}
                    bundle={data}
                    mutate={searchMutate}
                  />
                ))}
              </>
            )}
          </aside>
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

const BundleCard = ({
  bundle,
  mutate,
}: {
  bundle: bundleDataType;
  mutate: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const { mutation } = useMutation();
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { selectedLanguage } = useAppContext();

  const handleDeleteBundle = async () => {
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
          const res = await mutation(`bundles/delete/${bundle?._id}`, {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <section className="relative group bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src={bundle?.thumbnailUrl}
            alt={bundle?.thumbnailPath}
            className="w-full h-40 object-cover object-center"
          />
          <p className="absolute top-3 left-3 text-sm text-white font-medium py-1 px-2 bg-gray-900 rounded">
            {bundle?.Courses?.length}-{" "}
            {tutorAddCoursePage(selectedLanguage).courseBundle}
          </p>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {bundle?.name}
          </h3>
          <p className="text-gray-600 mb-2">
            {sliceSentence(bundle?.description, 20)}
          </p>
          <p className="text-gray-600 mb-2">
            <LibraryBooksOutlined className="mr-2" /> {bundle?.Courses?.length}{" "}
            {tutorAddCoursePage(selectedLanguage).courses}
          </p>
        </div>
        <div className="flex justify-between p-4 bg-gray-100">
          <span className="text-gray-600 font-semibold text-xl">
            {tutorAddCoursePage(selectedLanguage).mrpPrice}: ${bundle?.mrpPrice}
          </span>
          <span className="text-red-500 ">
            {tutorAddCoursePage(selectedLanguage).salePrice}: $
            {bundle?.salePrice}
          </span>
        </div>
        <div className="invisible absolute top-14 right-0 opacity-0 flex flex-col gap-2 common-transition group-hover:right-2 group-hover:opacity-100 group-hover:visible group-hover:bg-gray-900 p-2 rounded-md">
          <Tooltip
            title={tutorAddCoursePage(selectedLanguage).viewCourses}
            followCursor
            placement="top-start"
            arrow
          >
            <button
              onClick={() => handleClickOpen()}
              className="w-8 h-8 grid place-items-center rounded-full border border-emerald-500 bg-emerald-500/10 text-emerald-500"
            >
              <Preview fontSize="small" />
            </button>
          </Tooltip>

          <UpdateBundleDialog bundle={bundle} mutate={mutate} />
          <Tooltip
            title={tutorAddCoursePage(selectedLanguage).deleteBundle}
            followCursor
            placement="top-start"
            arrow
          >
            <button
              className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
              onClick={handleDeleteBundle}
            >
              <DeleteOutline fontSize="small" />
            </button>
          </Tooltip>
        </div>
      </section>

      <>
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle className="flex items-center justify-center">
            <h1 className="text-3xl font-bold py-2">
              {tutorAddCoursePage(selectedLanguage).details}
            </h1>
          </DialogTitle>
          <DialogContent>
            <div className="">
              <h2 className="text-gray-800 text-2xl font-semibold mb-2">
                {tutorAddCoursePage(selectedLanguage).bundleCourses}
              </h2>
              <div className="w-full grid grid-cols-2 gap-10">
                {bundle?.Courses?.map(
                  (course: coursesArrType, index: number) => (
                    <CourseCard course={course} key={index} />
                  )
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions className="absolute top-2 right-5">
            <Close
              onClick={handleClose}
              className="text-red-600 cursor-pointer"
            />
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

const CourseCard = ({ course }: { course: coursesArrType }) => {
  const { selectedLanguage } = useAppContext();

  return (
    <section className=" border border-gray-200 rounded-lg">
      <img
        src={course?.thumbnailUrl}
        alt={course?.thumbnailPath}
        className="rounded-lg h-[14rem] w-full"
      />
      <CardHeader
        title={course?.courseName}
        // subheader={course?.category}
        avatar={<Book />}
      />
      <div className="space-y-3 my-2 px-3">
        <p className="text-gray-700 text-base">
          {sliceSentence(course?.description, 15)}
        </p>
        <div className="flex justify-between mt-2">
          <p className="text-primary font-semibold text-xl">
            {tutorAddCoursePage(selectedLanguage).mrpPrice}: ${course?.mrpPrice}
          </p>
          <p className="text-red-800 font-semibold text-xl">
            {tutorAddCoursePage(selectedLanguage).salePrice}: $
            {course?.salePrice}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ManageBundles;
