import {
  Add,
  BadgeOutlined,
  DashboardCustomizeOutlined,
  GridView,
  KeyOutlined,
  NotificationsOutlined,
  Payment,
  PeopleOutline,
  PersonOutline,
  QuizOutlined,
  ReviewsOutlined,
  SettingsOutlined,
  TopicOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { useAppContext } from "contexts";
import { adminUseMenuItemsContent } from "locale";

const useAdminSidebarItems = () => {
  const { selectedLanguage } = useAppContext();
  return [
    {
      _id: "1",
      title: adminUseMenuItemsContent(selectedLanguage).Dashboard,
      route: "/admin",
      icon: <GridView />,
    },
    {
      _id: "2",
      // title: "Courses",
      title: adminUseMenuItemsContent(selectedLanguage).Categories,
      icon: <TopicOutlined />,
      submenus: [
        {
          _id: "2-0",
          route: "/admin/category",
          title: adminUseMenuItemsContent(selectedLanguage).Dashboard,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "2-1",
          route: "/admin/category/manage-category",
          title: adminUseMenuItemsContent(selectedLanguage).ManageCategories,
          icon: <DashboardCustomizeOutlined className="!text-lg" />,
        },
        {
          _id: "2-1",
          route: "/admin/category/manage-language",
          title: adminUseMenuItemsContent(selectedLanguage).ManageLanguages,
          icon: <DashboardCustomizeOutlined className="!text-lg" />,
        },
      ],
    },
    {
      _id: "3",
      title: adminUseMenuItemsContent(selectedLanguage).Tutors,
      icon: <PersonOutline />,
      submenus: [
        {
          _id: "3-0",
          route: "/admin/tutors",
          title: adminUseMenuItemsContent(selectedLanguage).Dashboard,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "3-1",
          route: "/admin/tutors/pending-tutors",
          title: adminUseMenuItemsContent(selectedLanguage).PendingRequests,
          icon: <DashboardCustomizeOutlined className="!text-lg" />,
        },
        {
          _id: "3-2",
          route: "/admin/tutors/accepted-tutors",
          title: adminUseMenuItemsContent(selectedLanguage).AcceptedTutors,
          icon: <DashboardCustomizeOutlined className="!text-lg" />,
        },
        {
          _id: "3-3",
          route: "/admin/tutors/tutor-statistics",
          title: adminUseMenuItemsContent(selectedLanguage).Tutorstatistics,
          icon: <BarChartOutlinedIcon className="!text-lg" />,
        },
      ],
    },
    {
      _id: "4",
      title: adminUseMenuItemsContent(selectedLanguage).Students,
      icon: <PeopleOutline />,
      submenus: [
        {
          _id: "4-0",
          route: "/admin/students",
          title: adminUseMenuItemsContent(selectedLanguage).Dashboard,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "4-1",
          route: "/admin/students/student-details",
          title: adminUseMenuItemsContent(selectedLanguage).StudentDetails,
          icon: <GridView className="!text-lg" />,
        },
        {
          _id: "4-3",
          route: "/admin/students/studentstatistics",
          title: adminUseMenuItemsContent(selectedLanguage).statistics,
          icon: <BarChartOutlinedIcon className="!text-lg" />,
        },
      ],
    },
    {
      _id: "5",
      title: adminUseMenuItemsContent(selectedLanguage).Courses,
      route: "/admin/courses/course-details",
      icon: <TopicOutlined />,
    },
    {
      _id: "6",
      title: adminUseMenuItemsContent(selectedLanguage).quizzes,
      route: "/admin/quizzes",
      icon: <QuizOutlined />,
    },
    {
      _id: "7",
      title: adminUseMenuItemsContent(selectedLanguage).ManageReviews,
      route: "/admin/manage-reviews",
      icon: <ReviewsOutlined />,
    },
    {
      _id: "8",
      title: adminUseMenuItemsContent(selectedLanguage).payouts,
      route: "/admin/payouts",
      icon: <Payment />,
    },
    {
      _id: "9",
      title: adminUseMenuItemsContent(selectedLanguage).Settings,
      icon: <SettingsOutlined />,
      submenus: [
        {
          _id: "9-0",
          route: "/admin/my-profile",
          title: adminUseMenuItemsContent(selectedLanguage).MyProfile,
          icon: <BadgeOutlined />,
        },
        {
          _id: "9-1",
          route: "/admin/notifications",
          title: adminUseMenuItemsContent(selectedLanguage).Notifications,
          icon: <NotificationsOutlined />,
        },
        {
          _id: "9-2",
          route: "/admin/change-password",
          title: adminUseMenuItemsContent(selectedLanguage).ChangePassword,
          icon: <KeyOutlined />,
        },
      ],
    },
  ];
};
export default useAdminSidebarItems;
