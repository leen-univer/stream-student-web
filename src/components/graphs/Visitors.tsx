import { useState } from "react";

type Props = {
  title: string;
  content: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon: React.ReactElement;
  //   onClick: any;
};

export default function Visitors({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
}: //   onClick,
Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      //   onClick={onClick}
      className={`w-full flex flex-col !items-center rounded-[16px] pb-2 pt-2 !shadow-none border border-primary/30 ${className} `}
    >
      <div
        className={`text-center !items-center  bg-gray-100 !justify-center ${iconClassName} !rounded-xl p-1   `}
      >
        <div className="h-full !text-center !items-center   !justify-center !text-md px-1  py-0">
          {icon}
        </div>
      </div>
      <div className="flex  flex-col items-center gap-1 p-4">
        <h1
          className={`font-semibold text-2xl ${contentClassName} !text-black `}
        >
          {content}
        </h1>
        <h1 className={`${titleClassName}  !text-black text-md font-semibold`}>
          {title}
        </h1>
      </div>
    </div>
  );
}
