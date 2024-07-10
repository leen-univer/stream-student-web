import {
  AccountBalanceWalletOutlined,
  AppRegistrationOutlined,
  AssignmentOutlined,
  BadgeOutlined,
  CalendarMonth,
  DateRange,
  GridView,
  KeyOutlined,
  MoneyOutlined,
  NotificationsOutlined,
  PaymentOutlined,
  PlaylistAddCheck,
  SettingsOutlined,
  TopicOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import ThreePIcon from "@mui/icons-material/ThreeP";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import { useAppContext } from "contexts";
import { tutorUseMenuItemsContent } from "locale";

const useMenuItem = () => {
  const { selectedLanguage } = useAppContext();
  return [
    {
      _id: "1",
      title: tutorUseMenuItemsContent(selectedLanguage).Dashboard,
      route: "/tutor-account",
      icon: <GridView />,
    },
    {
      _id: "2",
      title: tutorUseMenuItemsContent(selectedLanguage).Students,
      route: "/tutor-account/student",
      icon: <AccountBoxOutlinedIcon />,
    },
    {
      _id: "3",
      title: tutorUseMenuItemsContent(selectedLanguage).Courses,
      icon: <TopicOutlined />,
      submenus: [
        {
          _id: "3-0",
          route: "/tutor-account/courses",
          title: tutorUseMenuItemsContent(selectedLanguage).Dashboard,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "3-1",
          route: "/tutor-account/courses/manage-courses",
          title: tutorUseMenuItemsContent(selectedLanguage).ManageCourses,
          icon: <AppRegistrationOutlined className="!text-lg" />,
        },
        {
          _id: "3-2",
          route: "/tutor-account/courses/manage-bundles",
          title: tutorUseMenuItemsContent(selectedLanguage).ManageBundles,
          icon: <AppRegistrationOutlined className="!text-lg" />,
        },
        {
          _id: "3-3",
          route: "/tutor-account/courses/course-statistics",
          title: tutorUseMenuItemsContent(selectedLanguage).courseStatistics,
          icon: <BarChartOutlinedIcon className="!text-lg" />,
        },
      ],
    },
    {
      _id: "4",
      title: tutorUseMenuItemsContent(selectedLanguage).Assignments,
      icon: <AssignmentOutlined />,
      submenus: [
        {
          _id: "4-0",
          route: "/tutor-account/assignments",
          title: tutorUseMenuItemsContent(selectedLanguage).Dashboard,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "4-1",
          route: "/tutor-account/assignments/view-assignments",
          title: tutorUseMenuItemsContent(selectedLanguage).ViewAllAssignments,
          icon: <VisibilityOutlined className="!text-lg" />,
        },
      ],
    },
    {
      _id: "5",
      title: tutorUseMenuItemsContent(selectedLanguage).LiveClass,
      icon: <CalendarMonth />,
      submenus: [
        {
          _id: "5-0",
          route: "/tutor-account/schedule",
          title: tutorUseMenuItemsContent(selectedLanguage).UpcomingClasses,
          icon: <DateRange className="!text-lg" />,
        },
        {
          _id: "5-1",
          route: "/tutor-account/schedule/student-response",
          title: tutorUseMenuItemsContent(selectedLanguage).studentResponse,
          icon: <ThreePIcon className="!text-lg" />,
        },
        {
          _id: "5-2",
          route: "/tutor-account/schedule/past-schedules",
          title: tutorUseMenuItemsContent(selectedLanguage).PastClasses,
          icon: <DateRange className="!text-lg" />,
        },
      ],
    },
    {
      _id: "6",
      title: tutorUseMenuItemsContent(selectedLanguage).Revenue,
      route: "/tutor-account/my-payments",
      icon: <AccountBalanceWalletOutlined />,
    },
    {
      _id: "7",
      title: tutorUseMenuItemsContent(selectedLanguage).Settings,
      icon: <SettingsOutlined />,
      submenus: [
        {
          _id: "7-0",
          route: "/tutor-account/my-profile",
          title: tutorUseMenuItemsContent(selectedLanguage).MyProfile,
          icon: <BadgeOutlined />,
        },
        {
          _id: "7-1",
          route: "/tutor-account/notifications",
          title: tutorUseMenuItemsContent(selectedLanguage).Notifications,
          icon: <NotificationsOutlined />,
        },
        {
          _id: "7-2",
          route: "/tutor-account/change-password",
          title: tutorUseMenuItemsContent(selectedLanguage).ChangePassword,
          icon: <KeyOutlined />,
        },
      ],
    },
  ];
};

export default useMenuItem;
