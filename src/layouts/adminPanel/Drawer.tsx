import { ExpandLess, ExpandMore, Logout } from "@mui/icons-material";
import { Collapse, List, ListItemButton, Tooltip } from "@mui/material";
import { useAppContext } from "contexts";
import { useAdminSidebarItems } from "hooks";
import { adminUseMenuItemsContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { removeSessionStorage } from "utils";
import showError from "utils/error";

const Drawer = () => {
  const { selectedLanguage } = useAppContext();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const router = useRouter();
  const MenuItems = useAdminSidebarItems();
  useEffect(() => {
    if (!MenuItems?.length || !router?.asPath) return;
    const isExists =
      MenuItems?.length &&
      MenuItems?.find(
        (item) =>
          item?.submenus?.length &&
          item?.submenus?.find((data) => data?.route === router?.asPath)
      );

    isExists && setSelectedSubMenu(isExists?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.asPath, MenuItems?.length]);
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
    <section
      className={`lg:block hidden sticky top-5 left-0 min-w-[15rem] w-60 h-[calc(100vh-40px)] overflow-y-scroll pb-20 bg-white rounded-3xl shadow-[rgba(0,_98,_90,_0.2)_0px_0px_12px]`}
    >
      <div className="grid place-items-center h-32">
        <img
          src="/main_logo.png"
          alt="StreamStudent"
          className="w-11/12 cursor-pointer"
          onClick={() => router.push("/admin")}
        />
      </div>

      {/* //? main menus section */}
      <div className="flex flex-col w-full">
        {MenuItems?.map((menuItem) => (
          <Fragment key={menuItem?._id}>
            <Tooltip
              title={menuItem?.title}
              followCursor
              arrow
              placement="top-end"
            >
              <div
                className={`w-full group flex items-center justify-between px-4 py-3 text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-150 ease-in-out cursor-pointer border-l-4  ${
                  router.asPath === menuItem.route
                    ? "bg-primary/10 text-primary border-primary/75"
                    : "border-transparent"
                }`}
                onClick={() => {
                  if (menuItem?.route) return router?.push(menuItem?.route);
                  menuItem?.submenus &&
                    setSelectedSubMenu((prev) =>
                      prev === menuItem._id ? "" : menuItem._id
                    );
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="">{menuItem?.icon}</span>

                  <p className={`font-medium whitespace-nowrap`}>
                    {menuItem?.title}
                  </p>
                </div>
                {menuItem?.submenus ? (
                  selectedSubMenu === menuItem?._id ? (
                    <span className="">
                      <ExpandLess />
                    </span>
                  ) : (
                    <span className="">
                      <ExpandMore />
                    </span>
                  )
                ) : null}
              </div>
            </Tooltip>

            {/* //? submenus section */}
            {menuItem?.submenus ? (
              <Collapse
                in={selectedSubMenu === menuItem?._id}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menuItem?.submenus?.map((submenu: any) => (
                    <ListItemButton
                      key={submenu?._id}
                      onClick={() => router.push(submenu?.route)}
                      sx={{ pl: 5 }}
                      selected={router.pathname === submenu.route}
                      className={`!flex !items-center !gap-1 hover:!bg-primary/10 !text-gray-500 hover:!text-primary !border-l-4 common-transition  ${
                        router.asPath === submenu.route
                          ? "!bg-primary/10 !text-primary !border-primary"
                          : "!border-transparent"
                      }`}
                    >
                      {submenu?.icon}
                      <h4 className="font-medium whitespace-nowrap">
                        {submenu?.title}
                      </h4>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            ) : null}
          </Fragment>
        ))}

        {/* //? logout section */}
        <Tooltip
          title={`${adminUseMenuItemsContent(selectedLanguage).LogOut}`}
          followCursor
          arrow
          placement="top-end"
          sx={{
            zIndex: "9900",
          }}
        >
          <div
            onClick={onLogout}
            className={`w-full group flex items-center justify-between text-gray-500 hover:text-primary px-5 py-3 hover:bg-primary/10 common-transition cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <span className="group-hover:text-primary">
                <Logout />
              </span>
              <p className="font-medium whitespace-nowrap">
                {adminUseMenuItemsContent(selectedLanguage).LogOut}
              </p>
            </div>
          </div>
        </Tooltip>
      </div>
    </section>
  );
};

export default Drawer;
