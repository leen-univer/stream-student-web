import { Language, Person, Search } from "@mui/icons-material";
import { ICONS } from "assets";
import { Empty } from "components/core";
import { SeacrhcategorySkeleton } from "components/skeleton";
import { useAppContext } from "contexts";
import { useAuth } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { navbarMenu, studentPanel } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import ResponsiveNavbar from "./ResponsiveNavbar";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface NavArr_Type {
  _id: string;
  title: string;
  path: string;
}

export interface categoryData {
  name: string;
}

export const CLASS_ARR = [
  {
    _id: "1",
    title: "Class One",
    list: [
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
    ],
  },
  {
    _id: "2",
    title: "Class Two",
    list: [
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
    ],
  },
  {
    _id: "3",
    title: "Class Three",
    list: [
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
      {
        name: "Class 1",
        path: "",
      },
    ],
  },
];

const Navbar = () => {
  // const { data: categoryData, isValidating: categoryValidating } = useSWRAPI(
  //   "contact/all-category"
  // );
  const { selectedLanguage, changeLanguage } = useAppContext();
  const { user } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { asPath } = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const {
    data: searchData,
    isValidating: searchIsValidating,
    mutate: searchMutate,
  } = useSWRAPI(`contact/searching?searchTitle=${searchValue}`);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const showLogin = (id: any) => {
    if (user?._id) {
      router?.push(`courses/${id}`);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "You must be logged in to view the course.",
      });
    }
  };

  return (
    <nav className="w-full bg-inherit sticky z-[999] top-0 bg-white shadow-sm">
      <article className="hidden lg:block main-container py-2">
        <section className="relative w-full flex justify-between gap-10">
          <aside className="w-4/5 lg:flex flex-wrap items-center text-base tracking-wide gap-5 font-medium ">
            {user?.role === "STUDENT" ? (
              asPath === "/my-account" ? (
                ""
              ) : (
                <Link href="/my-account/my-dashboard">
                  <div className="bg-primary px-4 py-1 rounded-lg flex gap-1 items-center">
                    <span>
                      <Person className="text-white text-sm" />
                    </span>
                    <span className="text-white text-sm">
                      {navbarMenu(selectedLanguage).MyAccount}
                    </span>
                  </div>
                </Link>
              )
            ) : (
              <>
                <Link href="/register">
                  <button className="btn-primary w-32 h-10">
                    {navbarMenu(selectedLanguage).Register}
                  </button>
                </Link>
                <Link href="/login">
                  <button className="btn-primary w-32 h-10">
                    {navbarMenu(selectedLanguage).Login}
                  </button>
                </Link>
              </>
            )}
            <Link href="/tutors">
              <p className="flex items-center cursor-pointer hover:text-primary">
                {navbarMenu(selectedLanguage).Tutor}
              </p>
            </Link>
            <Link href="/courses">
              <p className="flex items-center cursor-pointer py-5 hover:text-primary">
                {navbarMenu(selectedLanguage).Courses}
              </p>
            </Link>
            <Link href="/knowledge-test">
              <p className="flex items-center cursor-pointer py-5 hover:text-primary">
                {navbarMenu(selectedLanguage).testYourKnowledge}
              </p>
            </Link>
            {/* <CategoryList categoryData={categoryData} /> */}
            <SearchBar
              // showLogin={showLogin}
              searchValue={searchValue}
              handleSearch={handleSearch}
              searchIsValidating={searchIsValidating}
              searchData={searchData}
            />
          </aside>
          <aside className="w-1/5 flex justify-end items-center gap-6 font-medium text-gray-900 ">
            <Link href="/">
              <img src="/main_logo.png" alt="main-logo" className="w-52" />
            </Link>

            {/* <div className="group">
              <p className="flex items-center  gap-1  cursor-pointer">
                <Language className=" cursor-pointer" />
              </p>
              <div className="w-40  leading-loose  hidden group-hover:block absolute hover:bg-transparent py-7 rounded-md">
                <span className="flex flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer">
                  <p
                    className="flex items-center gap-2 transition-colors duration-200 px-2 py-2 text-normal whitespace-nowrap hover:bg-primary/5"
                    onClick={() => {
                      changeLanguage?.("ar");
                    }}
                  >
                    <ICONS.TranslateAR />
                    {"عربي"}
                  </p>
                  <p
                    className="flex items-center gap-2 transition-colors duration-200 px-2 py-2 text-normal whitespace-nowrap hover:bg-primary/5"
                    onClick={() => {
                      changeLanguage?.("en");
                    }}
                  >
                    <ICONS.TranslateEng />
                    English
                  </p>
                </span>
              </div>
            </div> */}

            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Language className=" cursor-pointer" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  {" "}
                  <p
                    className="flex items-center gap-2 transition-colors duration-200 px-2 py-2 text-normal whitespace-nowrap hover:bg-primary/5"
                    onClick={() => {
                      changeLanguage?.("ar");
                    }}
                  >
                    <ICONS.TranslateAR />
                    {"عربي"}
                  </p>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  {" "}
                  <p
                    className="flex items-center gap-2 transition-colors duration-200 px-2 py-2 text-normal whitespace-nowrap hover:bg-primary/5"
                    onClick={() => {
                      changeLanguage?.("en");
                    }}
                  >
                    <ICONS.TranslateEng />
                    English
                  </p>
                </MenuItem>
              </Menu>
            </div>
          </aside>
        </section>
      </article>
      <ResponsiveNavbar
        showLogin={showLogin}
        // COURSE_ARR={categoryData?.data?.data?.data}
        CLASS_ARR={CLASS_ARR}
      />
    </nav>
  );
};

export default Navbar;

export const SearchBar = ({
  // showLogin,
  searchValue,
  handleSearch,
  searchIsValidating,
  searchData,
}: {
  // showLogin: any;
  searchValue: string;
  handleSearch?: any;
  searchIsValidating?: any;
  searchData: any;
}) => {
  const { selectedLanguage } = useAppContext();
  const router = useRouter();

  return (
    <div className="relative lg:w-60 w-full flex justify-between items-center rounded-xl border border-primary bg-white px-1">
      <input
        type="search"
        value={searchValue}
        onChange={handleSearch}
        className="p-2 rounded-xl outline-none"
        placeholder={navbarMenu(selectedLanguage).placeholder}
      />
      <Search className="!text-primary" />
      {searchValue && (
        <section className="absolute z-[999] top-12 left-0 min-h-[35vh] h-[35vh] w-[35rem] border border-[#04977d] rounded-md overflow-y-scroll bg-white">
          <div className="flex flex-col gap-4 px-6 py-4">
            {searchIsValidating ? (
              <SeacrhcategorySkeleton
                i={searchData?.data?.data?.data?.length || 3}
              />
            ) : searchData?.data?.data?.data.length >= 1 ? (
              searchData?.data?.data?.data?.map((item: any) => (
                <div
                  key={item?._id}
                  onClick={() => router.push(`/courses/${item?._id}`)}
                  className=" cursor-pointer flex justify-between border-2 rounded-md p-2 shadow-md shadow-[#04977d] ease-in-out duration-300 scale-100 hover:scale-105"
                >
                  <div className="flex flex-row gap-2  justify-center items-center ">
                    <img
                      src={item?.thumbnailUrl}
                      alt=""
                      className="w-10 h-8 rounded-md object-cover"
                    />
                    <h1 className="font-semibold tracking-wide ">
                      {item?.courseName}
                    </h1>
                    <span className="flex gap-0 ">
                      <p>{studentPanel(selectedLanguage).Price}:</p>
                      <p className="line-through">${item?.mrpPrice}</p>
                    </span>
                    <span className="flex gap-0 ">
                      <p>{studentPanel(selectedLanguage).Sale}:</p>
                      <p className="">${item?.salePrice}</p>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <span className="col-span-12">
                <Empty title={studentPanel(selectedLanguage).nocourse} />
              </span>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
// export const CategoryList = ({ categoryData }: { categoryData: any }) => {
//   const { selectedLanguage } = useAppContext();

//   return (
//     <article className="relative">
//       <Link href="/courses">
//         <p className="flex items-center cursor-pointer py-5">
//           {navbarMenu(selectedLanguage).Courses}
//           {/* <span>
//             <ExpandMore
//               fontSize="small"
//               className="text-primary group-hover:-rotate-180 common-transition"
//             />
//           </span> */}
//         </p>
//       </Link>
//       {/* <section className="absolute hidden group-hover:block top-full left-0 w-[43rem] rounded-md bg-green-200 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
//         <div
//           className="w-full h-32 bg-center bg-cover bg-no-repeat flex items-center justify-start"
//           style={{ backgroundImage: "url(/home/course_bg_img.png)" }}
//         >
//           <div className="w-1/2 text-white pl-8">
//             <h1 className="capitalize text-xl font-bold tracking-wide">
//               All Course List
//             </h1>
//             <p className="tracking-wider text-sm pt-4">
//               This paragraph should contain a short description about all the
//               courses
//             </p>
//           </div>
//         </div>
//         <aside className="grid grid-cols-2 gap-y-2 gap-x-8 bg-white p-4">
//           {categoryData?.data?.data?.slice(0, 10)?.map((item: any) => (
//             <SubCategoryList item={item} key={item?._id} />
//           ))}
//         </aside>
//       </section> */}
//     </article>
//   );
// };
// const SubCategoryList = ({ item }: any) => {
//   const {
//     data: subCategoryData,
//     isValidating,
//     mutate,
//   } = useSWRAPI(`category/getAllSubCategory?categoryId=${item?._id}`);
//   const router = useRouter();
//   return (
//     <div className="relative category-div">
//       <div className="flex items-center justify-between gap-1 transition-colors duration-200 px-3 py-2 hover:bg-primary/5 hover:text-primary rounded-md cursor-pointer">
//         <span className="capitalize">{item?.name}</span>
//         {subCategoryData?.data?.data?.data?.length ? (
//           <ChevronRight className="!text-base" />
//         ) : null}
//       </div>
//       {subCategoryData?.data?.data?.data?.length ? (
//         <div className="hidden sub-category-div flex-col absolute z-10 top-0 left-full w-60 min-h-[37vh] h-[37vh] overflow-y-scroll bg-white text-black rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden">
//           {subCategoryData?.data?.data?.data?.map((innerItem: any) => (
//             <Link
//               href={`/courses?category=${innerItem?._id}`}
//               key={innerItem?._id}
//             >
//               <p
//                 className="flex items-center justify-between border mb-1 transition-colors duration-200 p-3 text-sm whitespace-nowrap hover:bg-primary/5 hover:text-primary rounded-md cursor-pointer"

//                 // onClick={() => router.push(`/courses?category=${innerItem?.id}`)}
//               >
//                 <span className="capitalize text-lg">{innerItem?.name}</span>
//                 {/* <ChevronRight className="!text-base" /> */}
//               </p>
//             </Link>
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// navbar
