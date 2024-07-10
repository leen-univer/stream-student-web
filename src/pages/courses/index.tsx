/* eslint-disable @next/next/no-img-element */
import { FilterList } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  Pagination,
} from "@mui/material";
import { LOADER } from "assets/animations";
import { BundleCard, PlaylistCard } from "components/cards";
import CardSkeleton from "components/skeleton/CourseCardSkeleton";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import { PublicLayout } from "layouts";
import { coursesContent, studentPanel } from "locale";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CourseDataType } from "types/courseCard";
import { FilterCardType } from "types/filterCard";

export type LectureDataType = {
  _id: string;
  subject: string;
  designation: string;
  description: string;
  rating?: number;
  numberOfLectures: string;
  fullName: string;
  thumbnailUrl?: string;
  courseName: string;
  title: string;
  courseCategory: string;
  salePrice?: number;
  mrpPrice?: number;
  Tutor: { name?: string };
  isInCart?: boolean;
  isPurchased?: boolean;
};

export const COURSE_DATA_ARR: any = [
  {
    _id: "1",
    image: "/Image/course_1.jpg",
    courseName: "Technology",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.4,
    mrpPrice: 19999,
    salePrice: 599,
    students: 250,
  },
  {
    _id: "2",
    image: "/Image/course_2.jpg",
    courseName: "Business",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.7,
    mrpPrice: 24999,
    salePrice: 799,
    students: 350,
  },
  {
    _id: "3",
    image: "/Image/course_3.jpg",
    courseName: "Arts",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.2,
    mrpPrice: 11999,
    salePrice: 399,
    students: 250,
  },
  {
    _id: "4",
    image: "/Image/course_4.jpg",
    courseName: "Music",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 3.8,
    mrpPrice: 49999,
    salePrice: 999,
    students: 250,
  },
  {
    _id: "5",
    image: "/Image/course_5.jpg",
    courseName: "Dance",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.9,
    mrpPrice: 749,
    salePrice: 26999,
    students: 150,
  },
  {
    _id: "6",
    image: "/Image/course_6.jpg",
    courseName: "Sports",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.9,
    mrpPrice: 28999,
    salePrice: 899,
    students: 550,
  },
  {
    _id: "7",
    image: "/Image/course_1.jpg",
    courseName: "Journalism",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.1,
    mrpPrice: 19999,
    salePrice: 499,
    students: 259,
  },
  {
    _id: "8",
    image: "/Image/course_2.jpg",
    courseName: "Finance",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.6,
    mrpPrice: 32999,
    salePrice: 769,
    students: 250,
  },
  {
    _id: "9",
    image: "/Image/course_4.jpg",
    courseName: "Political Science",
    tutorName: "Sarah Ali",
    title: "Introduction to programming languages",
    description:
      "Join The 90,000+ Students Who Are Learning Real-World Skills AND Earning Their CCNA!",
    rating: 4.8,
    mrpPrice: 1299,
    salePrice: 1999,
    students: 250,
  },
];
export const FILTER_CATEGORY_DATA_ARR: FilterCardType[] = [
  { _id: "1", title: "Python" },
  { _id: "2", title: "Oracle" },
  { _id: "3", title: "React" },
  { _id: "4", title: "Javascript" },
  { _id: "5", title: "Node" },
  { _id: "6", title: "Express" },
  { _id: "7", title: "MongoDB" },
];
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: LOADER,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const AllCourses = () => {
  const { selectedLanguage } = useAppContext();
  const ID = useRouter().query;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [bundle, setBundle] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const { data: languageData } = useSWRAPI(`language/get-all-language`);
  const { data: categoryData, isValidating: categoryValidating } = useSWRAPI(
    "contact/all-categories"
  );

  const allSubcategories = categoryData?.data?.data?.reduce(
    (result: any, category: any) => {
      const subcategories = category.SubCategory.map(
        (subcategory: any, index: number) => ({
          _id: subcategory._id,
          name: subcategory.name,
          key: index,
        })
      );
      return result.concat(subcategories);
    },
    []
  );

  // filter data show
  let url = `contact/all-filter-courses?perPage=6&pageNo=${pageNo}`;

  selectedLanguages?.length > 0 &&
    selectedLanguages.forEach((id) => {
      url += `&languageIds=${id}`;
    });

  selectedSubCategories?.length > 0 &&
    selectedSubCategories.forEach((id) => {
      url += `&subCategoryIds=${id}`;
    });

  selectedCategories?.length > 0 &&
    selectedCategories.forEach((id) => {
      url += `&categoryIds=${id}`;
    });

  const {
    data: LectureData,
    isValidating,
    mutate: filterCourseMutate,
  } = useSWRAPI(url);

  //bundle filter work
  const {
    data: bundleData,
    mutate: bundleMutate,
    isValidating: bundleValidating,
  } = useSWRAPI(`bundles/get-all-bundles-homepage?perPage=6&pageNo=${pageNo}`);

  useEffect(() => {
    const fetchData = async () => {
      if (bundle) {
        await bundleMutate();
      }
    };

    fetchData();
  }, [bundle, bundleMutate]);

  const handleClearFilter = () => {
    setSelectedSubCategories([]);
    setSelectedCategories([]);
    setSelectedLanguages([]);
    setBundle(false);
  };

  return (
    <PublicLayout title="All Courses | StreamStudent">
      <section className="py-8 md:py-16">
        <article className="relative main-container flex lg:flex-row flex-col justify-between gap-4 lg:gap-6">
          {/*-----web filter section start-----*/}
          <aside className="sticky top-[120px] w-1/4 h-fit hidden lg:flex flex-col gap-5 bg-white rounded-md p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <aside>
              {Boolean(
                selectedCategories.length ||
                  selectedSubCategories.length ||
                  selectedLanguages.length ||
                  bundle
              ) && (
                <button
                  className="px-4 py-1.5 rounded-md bg-red-500/10 border border-red-500 text-red-500 flex items-center gap-1 font-semibold text-sm"
                  onClick={handleClearFilter}
                >
                  <FilterList className="text-base" />{" "}
                  {studentPanel(selectedLanguage).ClearFilter}
                </button>
              )}
            </aside>
            <div className="w-full flex justify-between text-2xl font-semibold">
              <p>{coursesContent(selectedLanguage).filters}</p>
            </div>

            {/* --------------- filter by category------------------------------- */}
            {!bundle && (
              <div className="flex flex-col gap-3">
                <p className="flex items-center text-xl font-medium  text-primary pb-2">
                  {coursesContent(selectedLanguage).Categories}
                </p>
                <Divider />
                <div className="w-full flex flex-col gap-3">
                  <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll max-h-[13rem">
                    <div className="w-full flex flex-col gap-1">
                      {categoryData?.data?.data?.map(
                        (item: any, index: number) => (
                          <div
                            className="w-full flex gap-1 items-center "
                            key={index}
                          >
                            <Checkbox
                              size="small"
                              checked={selectedCategories.includes(item?._id)}
                              onClick={() => {
                                setSelectedCategories((prev) =>
                                  prev.includes(item?._id)
                                    ? prev.filter((id) => id !== item?._id)
                                    : [...prev, item?._id]
                                );
                              }}
                            />
                            <h3 className="font-medium tracking-wide text-sm">
                              {item?.name}
                            </h3>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {/* --------------- filter by Sub category------------------------------- */}
            {!bundle && (
              <div className="flex flex-col gap-3">
                <p className="flex items-center text-xl font-medium  text-primary pb-2">
                  {coursesContent(selectedLanguage).subCategories}
                </p>
                <Divider />
                <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll max-h-[13rem] ">
                  <div className="w-full flex flex-col gap-1">
                    {allSubcategories?.map((item: any, index: number) => (
                      <div
                        className="w-full flex gap-2 items-center "
                        key={index}
                      >
                        <Checkbox
                          size="small"
                          checked={selectedSubCategories.includes(item?._id)}
                          onClick={() => {
                            setSelectedSubCategories((prev) =>
                              prev.includes(item?._id)
                                ? prev.filter((id) => id !== item?._id)
                                : [...prev, item?._id]
                            );
                          }}
                        />
                        <h3 className="font-medium tracking-wide text-sm uppercase">
                          {item?.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* --------------- filter by Language------------------------------- */}
            {!bundle && (
              <div className="flex flex-col gap-3">
                <p className="flex items-center text-xl font-medium  text-primary ">
                  {coursesContent(selectedLanguage).language}
                </p>
                <Divider />
                <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll">
                  <div className="w-full flex flex-col gap-1">
                    {languageData?.data?.data?.map((item: any) => (
                      <div
                        className="w-full flex gap-1 items-center "
                        key={item?._id}
                      >
                        <Checkbox
                          size="small"
                          checked={selectedLanguages.includes(item?._id)}
                          onClick={() => {
                            setSelectedLanguages((prev) =>
                              prev.includes(item?._id)
                                ? prev.filter((id) => id !== item?._id)
                                : [...prev, item?._id]
                            );
                          }}
                        />
                        <h3 className="font-medium tracking-wide text-sm">
                          {item?.options}
                        </h3>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* --------------- filter by Bundles------------------------------- */}
            <div className="flex flex-col gap-3">
              <p className="flex items-center text-xl font-medium  text-primary ">
                {coursesContent(selectedLanguage).bundles}
              </p>
              <Divider />
              <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll">
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full flex gap-1 items-center ">
                    <Checkbox
                      size="small"
                      checked={bundle}
                      onClick={() => setBundle(!bundle)}
                    />
                    <h3 className="font-medium tracking-wide text-sm uppercase">
                      {studentPanel(selectedLanguage).Bundles}
                    </h3>
                  </div>
                </div>
              </section>
            </div>
          </aside>

          {/*responsive filter section start */}
          <section className="lg:hidden w-full flex items-center justify-between text-xl font-semibold bg-white p-3 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md">
            <div className="flex flex-row gap-4 items-center">
              <p>{coursesContent(selectedLanguage).filters}</p>
              <IconButton onClick={() => setIsOpen(!isOpen)}>
                <FilterList />
              </IconButton>
            </div>

            <aside>
              {Boolean(
                selectedCategories.length ||
                  selectedSubCategories.length ||
                  selectedLanguages.length ||
                  bundle
              ) && (
                <button
                  className="px-4 py-1.5 rounded-md bg-red-500/10 border border-red-500 text-red-500 flex items-center gap-1 font-semibold text-sm"
                  onClick={handleClearFilter}
                >
                  <FilterList className="text-base" />{" "}
                  {studentPanel(selectedLanguage).ClearFilter}
                </button>
              )}
            </aside>
            <Drawer
              anchor="bottom"
              open={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <section className="h-[65vh] flex flex-col gap-4 p-4 overflow-hidden overflow-y-scroll">
                {/* --------------- filter by category------------------------------- */}
                {!bundle && (
                  <div className="flex flex-col gap-3">
                    <p className="flex items-center text-xl font-medium  text-primary pb-2">
                      {coursesContent(selectedLanguage).Categories}
                    </p>
                    <Divider />
                    <div className="w-full flex flex-col gap-3">
                      <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll max-h-[13rem">
                        <div className="w-full flex flex-col gap-1">
                          {categoryData?.data?.data?.map(
                            (item: any, index: number) => (
                              <div
                                className="w-full flex gap-1 items-center "
                                key={index}
                              >
                                <Checkbox
                                  size="small"
                                  checked={selectedCategories.includes(
                                    item?._id
                                  )}
                                  onClick={() => {
                                    setSelectedCategories((prev) =>
                                      prev.includes(item?._id)
                                        ? prev.filter((id) => id !== item?._id)
                                        : [...prev, item?._id]
                                    );
                                  }}
                                />
                                <h3 className="font-medium tracking-wide text-sm">
                                  {item?.name}
                                </h3>
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                )}
                {/* --------------- filter by Sub category------------------------------- */}
                {!bundle && (
                  <div className="flex flex-col gap-3">
                    <p className="flex items-center text-xl font-medium  text-primary pb-2">
                      {coursesContent(selectedLanguage).subCategories}
                    </p>
                    <Divider />
                    <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll max-h-[13rem] ">
                      <div className="w-full flex flex-col gap-1">
                        {allSubcategories?.map((item: any, index: number) => (
                          <div
                            className="w-full flex gap-2 items-center "
                            key={index}
                          >
                            <Checkbox
                              size="small"
                              checked={selectedSubCategories.includes(
                                item?._id
                              )}
                              onClick={() => {
                                setSelectedSubCategories((prev) =>
                                  prev.includes(item?._id)
                                    ? prev.filter((id) => id !== item?._id)
                                    : [...prev, item?._id]
                                );
                              }}
                            />
                            <h3 className="font-medium tracking-wide text-sm uppercase">
                              {item?.name}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* --------------- filter by Language------------------------------- */}
                {!bundle && (
                  <div className="flex flex-col gap-3">
                    <p className="flex items-center text-xl font-medium  text-primary ">
                      {coursesContent(selectedLanguage).language}
                    </p>
                    <Divider />
                    <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll">
                      <div className="w-full flex flex-col gap-1">
                        {languageData?.data?.data?.map((item: any) => (
                          <div
                            className="w-full flex gap-1 items-center "
                            key={item?._id}
                          >
                            <Checkbox
                              size="small"
                              checked={selectedLanguages.includes(item?._id)}
                              onClick={() => {
                                setSelectedLanguages((prev) =>
                                  prev.includes(item?._id)
                                    ? prev.filter((id) => id !== item?._id)
                                    : [...prev, item?._id]
                                );
                              }}
                            />
                            <h3 className="font-medium tracking-wide text-sm">
                              {item?.options}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* --------------- filter by Bundles------------------------------- */}
                <div className="flex flex-col gap-3">
                  <p className="flex items-center text-xl font-medium  text-primary ">
                    {coursesContent(selectedLanguage).bundles}
                  </p>
                  <Divider />
                  <section className="flex flex-col gap-4 overflow-hidden overflow-y-scroll">
                    <div className="w-full flex flex-col gap-1">
                      <div className="w-full flex gap-1 items-center ">
                        <Checkbox
                          size="small"
                          checked={bundle}
                          onClick={() => setBundle(!bundle)}
                        />
                        <h3 className="font-medium tracking-wide text-sm uppercase">
                          {studentPanel(selectedLanguage).Bundles}
                        </h3>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </Drawer>
          </section>

          {/* show the course card filter */}
          <section className="flex flex-col gap-5 lg:w-3/4 w-full h-full">
            {bundleValidating ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-t-black"></div>
              </div>
            ) : (
              <>
                {bundleData && bundle ? (
                  <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                    {bundleData?.data?.data?.data?.map((item: any) => (
                      <BundleCard
                        bundle={item}
                        key={item?._id}
                        mutate={bundleMutate}
                      />
                    ))}
                  </aside>
                ) : (
                  <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                    {isValidating || !LectureData?.data?.data?.data ? (
                      LectureData?.data?.data?.data?.map(
                        (_: any, index: number) => <CardSkeleton key={index} />
                      )
                    ) : LectureData?.data?.data?.data?.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-2xl font-bold text-gray-700">
                          {studentPanel(selectedLanguage).nocourseavailable}
                        </p>
                      </div>
                    ) : (
                      LectureData?.data?.data?.data?.map(
                        (item: LectureDataType) => (
                          <PlaylistCard
                            key={item._id}
                            item={item}
                            filterCourseMutate={filterCourseMutate}
                          />
                        )
                      )
                    )}
                  </aside>
                )}
              </>
            )}

            <div className="w-full flex items-center justify-center py-4 mt-2 ">
              {bundle ? (
                <Pagination
                  count={Math.ceil(
                    Number(bundleData?.data?.data?.totalCount || 1) /
                      Number(bundleData?.data?.data?.perPage || 1)
                  )}
                  onChange={(e, v: number) => setPageNo(v)}
                  variant="outlined"
                  color="primary"
                />
              ) : (
                <Pagination
                  count={Math.ceil(
                    Number(LectureData?.data?.data?.totalCount || 1) /
                      Number(LectureData?.data?.data?.perPage || 1)
                  )}
                  onChange={(e, v: number) => setPageNo(v)}
                  variant="outlined"
                  color="primary"
                />
              )}
            </div>
          </section>
        </article>
      </section>
    </PublicLayout>
  );
};

export default AllCourses;
