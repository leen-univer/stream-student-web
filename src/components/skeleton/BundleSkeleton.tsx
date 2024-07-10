import { Skeleton } from "@mui/material";

const BundleSkeleton = () => {
  return (
    <section className="rounded-lg  overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <Skeleton className="w-full h-80" />
      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-bold">
          <Skeleton />
        </h1>
        <h3 className="capitalize text-lg font-semibold">
          <Skeleton />
        </h3>
        <div className="flex">
          <Skeleton width={100} height={30} />
        </div>
        <p className="flex items-center justify-between gap-2">
          <span className="font-semibold">
            <Skeleton width={50} />
          </span>
          <span className="text-gray-500 text-sm font-semibold">
            <Skeleton width={50} />
          </span>
        </p>
      </div>
    </section>
  );
};
export default BundleSkeleton;
