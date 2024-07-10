import { useAppContext } from "contexts";
import Visitors from "./Visitors";
import { adminVisitorsGraphContent } from "locale";
import { useSWRAPI } from "hooks";
type FetchedDataType = {
  success: {
    data: {
      data: {
        _id: string;
        count: number;
      }[];
    };
  };
};
const VisitorAnalytics = () => {
  const { data } = useSWRAPI<FetchedDataType>("visitor/get-visitor");
  const visitorData = data?.data?.success?.data?.allVisitors?.data;

  const { selectedLanguage } = useAppContext();
  return (
    <div className="rounded-2xl bg-white p-3">
      <h2 className="px-5 mt-3  text-xl font-semibold">
        {adminVisitorsGraphContent(selectedLanguage).PageViewStatus}
      </h2>
      <div className="grid grid-cols-12 px-4 content-between gap-3  py-6">
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).TotalVisitors}
          content={data?.data?.success?.data?.count}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_1.jpg" />}
        />
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).FromMobile}
          content={
            visitorData?.find((data: { _id: string }) => data?._id === "MOBILE")
              ?.count || 0
          }
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_2.jpg" />}
        />
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).FromTablet}
          content={
            visitorData?.find((data: { _id: string }) => data?._id === "IOS")
              ?.count || 0
          }
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_3.jpg" />}
        />
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).FromDesktop}
          content={
            visitorData?.find(
              (data: { _id: string }) => data?._id === "DESKTOP"
            )?.count || 0
          }
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_4.png" />}
        />
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).FromMac}
          content={
            visitorData?.find((data: { _id: string }) => data?._id === "Mac")
              ?.count || 0
          }
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_5.png" />}
        />
        <Visitors
          title={adminVisitorsGraphContent(selectedLanguage).OtherVisitors}
          content={
            visitorData?.find(
              (data: { _id: string }) => data?._id === "Windows"
            )?.count || 0
          }
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
          icon={<img className="!h-14 !w-14 p-1" src="/Image/visitor_1.jpg" />}
        />
      </div>
    </div>
  );
};
export default VisitorAnalytics;
