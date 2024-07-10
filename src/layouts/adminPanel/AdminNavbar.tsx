import {
  BadgeOutlined,
  KeyOutlined,
  KeyboardDoubleArrowRight,
  Language,
  LogoutOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import { Avatar, Badge, Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ICONS } from "assets";
import { useAppContext } from "contexts";
import { useAdminSidebarItems, useAuth, useSWRAPI } from "hooks";
import { adminNavbarContent, deleteContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { removeSessionStorage } from "utils";
import showError from "utils/error";
import ResponsiveDrawer from "./ResponsiveDrawer";

const AdminNavbar = () => {
  const { user } = useAuth();
  const { selectedLanguage, changeLanguage } = useAppContext();
  const MenuItems = useAdminSidebarItems();
  const { data } = useSWRAPI("notification/get-notification");
  const { data: unread } = useSWRAPI("contact/all-unread-notification");

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openProfile = Boolean(profileAnchorEl);
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  //? handle logout
  const onLogout = async () => {
    try {
      const { value } = await Swal.fire({
        title: deleteContent(selectedLanguage).areyousure,
        text: deleteContent(selectedLanguage).wanttologout,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5B50A1",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).yeslogout,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      });
      if (!value) return;
      removeSessionStorage("ACCESS_TOKEN");
      return router.replace("/");
    } catch (error) {
      showError(error);
    }
  };

  return (
    <nav className="sticky top-5 z-[90] w-full h-16 flex items-center mb-5">
      <section className="w-full flex justify-between gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <ResponsiveDrawer />
          <div className="w-[30%] md:w-full overflow-x-auto overflow-y-hidden">
            <h2 className="flex items-center text-sm md:text-lg lg:text-2xl tracking-wider font-semibold capitalize">
              {MenuItems.find((item) => item.route === router.pathname)?.title}
              {
                MenuItems?.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.title
              }
              {MenuItems.find((item) =>
                item?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )
              )?.title ? (
                <span className="text-primary px-2 pb-1">
                  <KeyboardDoubleArrowRight className="!text-lg" />
                </span>
              ) : (
                <span> </span>
              )}
              {
                MenuItems?.find((item) =>
                  item?.submenus?.find(
                    (submenus) => submenus.route === router?.pathname
                  )
                )?.submenus?.find(
                  (submenus) => submenus.route === router?.pathname
                )?.title
              }
            </h2>
          </div>
          <aside className="w-1/4 flex gap-5 items-center justify-end">
            <div className="group">
              {/* <p className="flex items-center gap-1 cursor-pointer">
                <Language className=" cursor-pointer" />
              </p>
              <div className="w-40 right-0 top-18 leading-loose  hidden group-hover:block absolute hover:bg-transparent py-7 rounded-md">
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
            </div>
            <div className="mr-2">
              <Badge
                badgeContent={Number(unread?.data?.data) || 0}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#0e0e66",
                  },
                }}
              >
                <Link href="/admin/notifications">
                  <span className="text-primary">
                    <NotificationsOutlined className="!text-3xl" />
                  </span>
                </Link>
              </Badge>
            </div>
            <div className="">
              {/* <Avatar
                src={user?.profileUrl}
                sx={{
                  height: "2.5rem",
                  width: "2.5rem",
                  backgroundColor: "#0e0e66",
                }}
              ></Avatar> */}

              {/* <section className="absolute top-full right-0 w-72 scale-0 origin-top-right pt-2 bg-white text-primary rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 group-hover:scale-100 transition-all duration-200 ease-in-out">
                <aside className="flex flex-col px-3 pb-2">
                  <p className="text-xl font-semibold capitalize">
                    {user?.name}
                  </p>
                  <h3>{user?.email}</h3>
                </aside>
                <Divider />
                <div className="flex flex-col py-2">
                  <Link href="/admin/my-profile">
                    <p className="flex gap-2 items-center px-3 hover:bg-primary/10 py-2 text-base tracking-wider font-medium cursor-pointer">
                      <BadgeOutlined className="!text-primary !text-3xl" />
                      {adminNavbarContent(selectedLanguage).MyProfile}
                    </p>
                  </Link>
                  <Link href="/admin/change-password">
                    <p className="flex gap-2 items-center px-3 hover:bg-primary/10 py-2 text-base tracking-wider font-medium cursor-pointer">
                      <KeyOutlined className="!text-primary !text-3xl" />
                      {adminNavbarContent(selectedLanguage).ChangePassword}
                    </p>
                  </Link>
                  <div
                    className="flex gap-2 items-center px-3 hover:bg-primary/10 cursor-pointer py-2 text-base tracking-wider font-medium"
                    onClick={onLogout}
                  >
                    <LogoutOutlined className="!text-primary !text-3xl" />
                    <p className="">
                      {" "}
                      {adminNavbarContent(selectedLanguage).LogOut}{" "}
                    </p>
                  </div>
                </div>
              </section> */}
              <Button
                id="basic-button"
                aria-controls={openProfile ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfile ? "true" : undefined}
                onClick={handleProfileClick}
              >
                <Avatar
                  src={user?.profileUrl}
                  sx={{
                    height: "2.5rem",
                    width: "2.5rem",
                    backgroundColor: "#0e0e66",
                  }}
                ></Avatar>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={profileAnchorEl}
                open={openProfile}
                onClose={handleProfileClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <aside className="flex flex-col px-3 pb-2">
                    <p className="text-lg font-semibold capitalize">
                      {user?.name}
                    </p>
                    <p className="text-lg font-medium">{user?.email}</p>
                  </aside>{" "}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleProfileClose}>
                  <Link href="/admin/my-profile">
                    <p className="flex gap-2 items-center px-3 hover:bg-primary/10 py-2 text-base tracking-wider font-medium cursor-pointer">
                      <BadgeOutlined className="!text-primary !text-3xl" />
                      {adminNavbarContent(selectedLanguage).MyProfile}
                    </p>
                  </Link>{" "}
                </MenuItem>
                <MenuItem onClick={handleProfileClose}>
                  <Link href="/admin/change-password">
                    <p className="flex gap-2 items-center px-3 hover:bg-primary/10 py-2 text-base tracking-wider font-medium cursor-pointer">
                      <KeyOutlined className="!text-primary !text-3xl" />
                      {adminNavbarContent(selectedLanguage).ChangePassword}
                    </p>
                  </Link>{" "}
                </MenuItem>
                <MenuItem onClick={handleProfileClose}>
                  {" "}
                  <div
                    className="flex gap-2 items-center px-3 hover:bg-primary/10 cursor-pointer py-2 text-base tracking-wider font-medium"
                    onClick={onLogout}
                  >
                    <LogoutOutlined className="!text-primary !text-3xl" />
                    <p className="">
                      {" "}
                      {adminNavbarContent(selectedLanguage).LogOut}{" "}
                    </p>
                  </div>
                </MenuItem>
              </Menu>
            </div>
          </aside>
        </div>
      </section>
    </nav>
  );
};

export default AdminNavbar;
