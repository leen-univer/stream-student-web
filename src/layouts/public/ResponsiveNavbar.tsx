import {
  Close,
  // Menu,
  ChevronRight,
  ExpandMore,
  Language,
  Search,
  Person,
  MenuBook,
  List,
} from "@mui/icons-material";
import { Collapse } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { CourseDataType } from "types/courseCard";

import useSWRAPI from "hooks/useSWRAPI";
import { SearchBar } from "./Navbar";
import { navbarMenu } from "locale";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import { useAppContext } from "contexts";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ICONS } from "assets";
import Icons from "assets/icons";

interface Props {
  // COURSE_ARR: CourseDataType[];
  CLASS_ARR: any;
  showLogin: any;
}

export interface categoryData {
  name: string;
}

const ResponsiveNavbar = ({ showLogin, CLASS_ARR }: Props) => {
  // const { data: categoryData, isValidating: categoryValidating } = useSWRAPI(
  //   "contact/all-category"
  // );
  const { user } = useAuth();
  const { asPath } = useRouter();
  const { selectedLanguage, changeLanguage } = useAppContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openLanguage = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [searchValue, setSearchValue] = useState("");
  const {
    data: searchData,
    isValidating: searchIsValidating,
    mutate: searchMutate,
  } = useSWRAPI(`contact/searching?searchTitle=${searchValue}`);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };
  const [open, setOpen] = useState(false);
  return (
    <section className="lg:hidden py-3 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="relative main-container h-full flex justify-between items-center">
        <span className="" onClick={() => setOpen(!open)}>
          {open ? (
            <Close className="!text-3xl !text-red-600" />
          ) : (
            <List className="!text-3xl !text-primary" />
          )}
        </span>
        <Link href="/" className="">
          <img src="/main_logo.png" alt="logo" className="w-36" />
        </Link>
        {/* <div className="group">
          <Language />
          <div className="group-hover:flex hidden absolute w-40 h-fit top-full right-0 flex-col bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <p className="p-2 hover:bg-gray-100">Arabic</p>
            <p className="p-2 hover:bg-gray-100">English</p>
          </div>
        </div> */}
        <div>
          <Button
            id="basic-button"
            aria-controls={openLanguage ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLanguage ? "true" : undefined}
            onClick={handleClick}
          >
            <Language className=" cursor-pointer" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openLanguage}
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
                <Icons.TranslateAR />
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
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <article className="bg-white w-full shadow-sm">
          <section className="main-container w-full flex flex-col gap-4 pt-4 font-medium">
            <div className="w-full">
              <SearchBar
                // showLogin={showLogin}
                searchValue={searchValue}
                handleSearch={handleSearch}
                searchIsValidating={searchIsValidating}
                searchData={searchData}
              />
            </div>

            <Link href="/courses">
              <p className="flex items-center cursor-pointer py-5">
                {navbarMenu(selectedLanguage).Courses}
              </p>
            </Link>
            <Link href="/tutors">
              <p className=" tracking-wider">
                {navbarMenu(selectedLanguage).Tutor}
              </p>
            </Link>
            {/* <ResponsiveCoursesList arr={categoryData} /> */}
            <div className="flex gap-4">
              {/* <Link href="/register">
                <button className="px-4 py-2 rounded-lg tracking-wider text-white font-semibold bg-primary">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="px-4 py-2 rounded-lg tracking-wider text-white font-semibold bg-primary">
                  Login
                </button>
              </Link> */}
              {user?.role === "STUDENT" ? (
                asPath === "/my-account" ? (
                  ""
                ) : (
                  <Link href="/my-account/my-dashboard">
                    <button className="bg-primary px-4 py-1 rounded-lg flex gap-1 items-center">
                      <Person className="text-white text-sm" />
                      <small className="text-white">
                        {" "}
                        {navbarMenu(selectedLanguage).MyAccount}
                      </small>
                    </button>
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
            </div>
          </section>
        </article>
      </Collapse>
    </section>
  );
};

const ResponsiveCoursesList = ({ arr }: any) => {
  const { data: categoryData, isValidating: categoryValidating } = useSWRAPI(
    "contact/all-category"
  );
  const [open, setIsOpen] = useState(false);

  return (
    <article className="">
      <p
        className="tracking-wider flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!open)}
      >
        Courses{" "}
        <span>
          <ExpandMore
            className={`common-transition ${open ? "-rotate-180" : ""}`}
          />
        </span>
      </p>

      <Collapse in={open} unmountOnExit>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 bg-white p-2">
          {arr?.data?.data?.slice(0, 10)?.map((item: any, index: any) => (
            <Link href={`/courses?category=${item.name}`} key={index}>
              <p className="flex items-center justify-between gap-1 transition-colors duration-200 px-3 py-2 text-sm text-black whitespace-nowrap rounded-md bg-primary/10">
                {item?.name}
              </p>
            </Link>
          ))}
        </div>
      </Collapse>
    </article>
  );
};

const ResponsiveClassesList = ({ arr }: any) => {
  const [open, setIsOpen] = useState(false);

  return (
    <article className="group">
      <p
        className="tracking-wider flex items-center justify-between  cursor-pointer"
        onClick={() => setIsOpen(!open)}
      >
        Classes{" "}
        <span>
          <ExpandMore
            className={`common-transition ${open ? "-rotate-180" : ""}`}
          />
        </span>
      </p>
      <Collapse in={open} unmountOnExit>
        <div className="h-[75vh] grid grid-cols-2 gap-y-2 gap-x-4 bg-white overflow-hidden overflow-y-scroll mt-3">
          {arr?.map((item: any, index: number) => (
            <div key={index}>
              <p className="uppercase text-xs font-semibold tracking-wide border-b border-gray-200 text-gray-500 whitespace-nowrap pb-2">
                {item?.title}
              </p>
              <div className="flex flex-col gap-2 pt-4">
                {item?.list?.map((innerList: any, i: number) => (
                  <Link href={innerList.path} key={i}>
                    <p
                      className={`capitalize text-gray-600 flex items-center justify-between gap-1 px-3 py-2 rounded-md ${
                        i % 2 === 0 ? "bg-gray-100" : "bg-primary/10"
                      }`}
                    >
                      {innerList?.name}
                      <ChevronRight className="!text-sm" />
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <aside className="flex flex-col gap-2">
            <div
              className="w-full flex items-center justify-start h-20 bg-no-repeat bg-center bg-cover rounded-md cursor-pointer"
              style={{
                backgroundImage: "url(/home/education_img.png",
              }}
            >
              <p className="capitalize flex items-center gap-1 text-black tracking-wide font-semibold pl-4">
                University
                <ChevronRight className="!text-base" />
              </p>
            </div>
            <div
              className="w-full flex items-center justify-start h-20 bg-no-repeat bg-center bg-cover rounded-md cursor-pointer"
              style={{
                backgroundImage: "url(/home/academy_img.png",
              }}
            >
              <p className="capitalize flex items-center gap-1 text-black tracking-wide font-semibold pl-4">
                Online Course
                <ChevronRight className="!text-base" />
              </p>
            </div>
            <div
              className="w-full flex items-center justify-start h-20 bg-no-repeat bg-center bg-cover rounded-md cursor-pointer"
              style={{
                backgroundImage: "url(/home/education_img.png",
              }}
            >
              <p className="capitalize flex items-center gap-1 text-black tracking-wide font-semibold pl-4">
                Education
                <ChevronRight className="!text-base" />
              </p>
            </div>
            <div
              className="w-full flex items-center justify-start h-20 bg-no-repeat bg-center bg-cover rounded-md cursor-pointer"
              style={{
                backgroundImage: "url(/home/academy_img.png",
              }}
            >
              <p className="capitalize flex items-center gap-1 text-black tracking-wide font-semibold pl-4">
                Academy
                <ChevronRight className="!text-base" />
              </p>
            </div>
          </aside>
        </div>
      </Collapse>
    </article>
  );
};

export default ResponsiveNavbar;
