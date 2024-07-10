import { CloudUpload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef } from "react";
// import Swal from "sweetalert2";
type Props = {
  value?: any;
  variant?: "square" | "rounded" | "circular";
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  height?: any;
  width?: any;
  dimensions?: number;
  className?: string;
  txtName?: string;
  allowedTypes?: string;
  // setValue: any;
};
const FileUpload = ({
  value,
  // setValue,
  onChange,
  variant,
  height,
  width,
  dimensions,
  className,
  txtName,
  allowedTypes,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0];
      // setValue(e);
      if (!file) return;
      if (!dimensions) return onChange(e);
      // Swal.fire(
      //   "Invalid Dimensions",
      //   `Please use ${dimensions.width}x${dimensions.height} images`,
      //   "warning"
      // );
    } catch (error) {}
  };

  return (
    <>
      <Avatar
        variant={variant || "square"}
        src={
          value?.target?.files[0]
            ? URL.createObjectURL(value?.target?.files[0])
            : value
        }
        className={className}
        sx={{
          height: height || 120,
          width: width || "100%",
          cursor: "pointer",
          borderRadius: "0.375rem",
          backgroundColor: "#e5e7eb",
          objectFit: "contain",
        }}
        onClick={() => inputRef.current?.click()}
      >
        {typeof value === "string" && (
          <p className="text-black tracking-wider">{value}</p>
        )}
        {value instanceof File && value?.name && (
          <p className="text-black tracking-wider">{value?.name}</p>
        )}
        {value?.target?.files[0]?.name && (
          <p className="text-black tracking-wider">
            {value?.target?.files[0]?.name}
          </p>
        )}
        {!value && (
          <div className="h-full w-full flex flex-col gap-4 items-center justify-center border border-primary border-dashed rounded-md">
            <CloudUpload className="text-5xl" />
            <small className="text-gray-400 tracking-wider">{txtName}</small>
          </div>
        )}
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept={
          allowedTypes
            ? allowedTypes
            : "image/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .mp4"
        }
      />
    </>
  );
};

export default FileUpload;
