import {
  Lock,
  Notifications,
  NotificationsOutlined,
  PowerSettingsNew,
  Topic,
  VideoChat,
  WorkspacePremium,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Avatar, Badge } from "@mui/material";
import { useAppContext } from "contexts";
import { useAuth, useSWRAPI, withProtectedStudent } from "hooks";
import useMutation from "hooks/useMutataion";
import { accountLayoutContent, deleteContent } from "locale";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { removeSessionStorage } from "utils";
import showError from "utils/error";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const AccountLayout = ({ children = <></> }: Props) => {
  const { user } = useAuth();
  const { data: unread } = useSWRAPI("contact/all-unread-notification");

  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { mutation } = useMutation();
  const LogOut = async () => {
    try {
      Swal.fire({
        title: deleteContent(selectedLanguage).areyousure,
        text: deleteContent(selectedLanguage).wanttologout,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#5B50A1",
        cancelButtonColor: "#d33",
        confirmButtonText: deleteContent(selectedLanguage).yeslogout,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await mutation(
            `screenTime/update-timeOfOut/${user?._id}`,
            {
              method: "PUT",
            }
          );

          removeSessionStorage("ACCESS_TOKEN");
          Swal.fire(
            "Success",
            deleteContent(selectedLanguage).logoutSuccess,
            "success"
          );
          return router.replace("/");
        }
      });
    } catch (error) {
      showError(error);
    }
  };

  return (
    <article className="bg-primary/20 py-8 md:py-16">
      <section className="relative main-container flex flex-col lg:flex-row items-start gap-6">
        <aside className="lg:sticky lg:top-[112px] w-full lg:w-2/5 2xl:w-[35%] flex flex-col bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-3xl">
          <div className="flex flex-row items-center justify-between gap-2 border-b-2 border-primary p-4 md:p-6">
            <div className="flex flex-row gap-2">
              <Avatar
                src={user?.profileUrl}
                alt="Profile"
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              ></Avatar>

              <div className="tracking-wide">
                <p className="font-semibold text-xl">{user?.name}</p>
                <p className="font-semibold md:text-lg text-sm">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="mr-2">
              <Badge
                badgeContent={Number(unread?.data?.data) || 0}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#EF4444",
                  },
                }}
              >
                <Link href="/my-account/notifications">
                  <span className="text-red-500">
                    <NotificationsOutlined className="!text-3xl" />
                  </span>
                </Link>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-4 md:p-6">
            <Link href="/my-account/my-dashboard">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <DashboardIcon className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyDashboard}
              </p>
            </Link>
            <Link href="/my-account">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <Person4RoundedIcon className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyProfile}
              </p>
            </Link>

            <Link href="/my-account/my-courses">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <Topic className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyCourses}
              </p>
            </Link>
            <Link href="/my-account/my-certificates">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <WorkspacePremium className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyCertificates}
              </p>
            </Link>
            <Link href="/my-account/my-reviews">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <ReviewsOutlinedIcon className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyReviews}
              </p>
            </Link>
            <Link href="/my-account/my-cart">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <ShoppingCartIcon className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).MyCart}
              </p>
            </Link>
            <Link href="/my-account/notifications">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <Notifications className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).Notifications}
              </p>
            </Link>
            <Link href="/my-account/online-classes">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <VideoChat className="!text-primary" />
                {accountLayoutContent(selectedLanguage).LiveClasses}
              </p>
            </Link>
            <Link href="/my-account/change-password">
              <p className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition">
                <Lock className="!text-primary" />{" "}
                {accountLayoutContent(selectedLanguage).ChangePassword}
              </p>
            </Link>
            <p
              className="flex items-center gap-2 rounded-md py-2 hover:bg-primary/5 hover:px-2 common-transition cursor-pointer"
              onClick={LogOut}
            >
              <PowerSettingsNew className="!text-primary" />{" "}
              {accountLayoutContent(selectedLanguage).Logout}
            </p>
          </div>
        </aside>
        <aside className="w-full lg:w-3/5 2xl:w-[65%] p-4 md:p-6 bg-white rounded-3xl">
          {children}
        </aside>
      </section>
    </article>
  );
};

export default withProtectedStudent(AccountLayout);
