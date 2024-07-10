import {
  CloseOutlined,
  Delete,
  FiberManualRecord,
  VisibilityOutlined,
} from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import { NOTIFICATION } from "assets/animations";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { AccountLayout, PublicLayout } from "layouts";
import { deleteContent, studentNotificationContent } from "locale";
import { useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import NotificationType from "types/notification";
const Notifications = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NOTIFICATION,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedLanguage } = useAppContext();
  const { data, mutate } = useSWRAPI(`notification/get-notification`);
  const { mutation } = useMutation();

  const { data: unread, mutate: markReadMutate } = useSWRAPI(
    "contact/all-unread-notification"
  );

  const handleReadAll = async () => {
    try {
      const res = await mutation(`notification/mark-all-read`, {
        method: "PUT",
      });
      if (res?.status === 200) {
        mutate();
        markReadMutate();
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleDeleteAll = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttodelete,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).yes,
      cancelButtonText: deleteContent(selectedLanguage).No,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(`notification/notification-delete`, {
            method: "DELETE",
          });
          mutate();
          markReadMutate();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };
  return (
    <PublicLayout
      title="Notifications | StreamStudent"
      footerBgColor="bg-primary/20"
    >
      <AccountLayout>
        <section className="w-full max-h-[40rem] min-h-[31rem] overflow-y-scroll">
          <h1 className="title-styling text-center pb-6 lg:pb-12">
            {studentNotificationContent(selectedLanguage).All}{" "}
            <span className="text-primary">
              {studentNotificationContent(selectedLanguage).Notifications}
            </span>
          </h1>
          {data?.data?.data?.length ? (
            <aside className="flex flex-col gap-4">
              <div className="flex items-center justify-center lg:justify-end gap-0.5">
                <Tooltip
                  title="Read All"
                  placement="top-start"
                  followCursor
                  arrow
                >
                  <IconButton onClick={handleReadAll}>
                    <VisibilityOutlined
                      fontSize="small"
                      className="!text-blue-500"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Delete All"
                  placement="top-start"
                  followCursor
                  arrow
                >
                  <IconButton onClick={handleDeleteAll}>
                    <Delete fontSize="small" className="!text-red-500" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2">
                {data?.data?.data?.map(
                  (curElm: NotificationType, index: number) => (
                    <NotificationCard
                      key={curElm?._id}
                      curElm={curElm}
                      sl={index + 1}
                      mutate={mutate}
                      markReadMutate={markReadMutate}
                    />
                  )
                )}
              </div>
            </aside>
          ) : (
            <Lottie options={defaultOptions} height={500} width={550} />
          )}
        </section>
      </AccountLayout>
    </PublicLayout>
  );
};

export const NotificationCard = ({
  curElm,
  sl,
  mutate,
  markReadMutate,
}: {
  curElm: NotificationType;
  sl: number;
  mutate: KeyedMutator<{
    data: any;
    res: Response;
  }>;
  markReadMutate: () => void;
}) => {
  const { selectedLanguage } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutation } = useMutation();
  const handleRemove = async (id: string) => {
    setIsDeleting(true);
    const res = await mutation(`notification/delete-notification/${id}`, {
      method: "DELETE",
    });
    mutate();
    markReadMutate();
    setIsDeleting(false);
  };
  const handleRead = async (id: string) => {
    setLoading(true);
    try {
      const res = await mutation(`notification/mark-as-read/${id}`, {
        method: "PUT",
      });
      if (res?.status === 200) {
        mutate();
        markReadMutate();
      } else {
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <section className="border rounded-md">
      <div className="flex flex-col items-center md:flex-row justify-between gap-2 md:gap-4 lg:gap-2 tracking-wider p-2">
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold">
            <span className="text-sm pr-2 font-normal">{sl}.</span>
            {curElm?.title}
          </p>
          <p className="text-primary">
            {curElm?.isRead ? (
              curElm?.message
            ) : (
              <>
                {curElm?.message?.slice(0, 40)}...
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleRead(curElm?._id)}
                >
                  {loading ? "Loading..." : "Read more"}
                </span>
              </>
            )}
          </p>
        </div>
        <div className="w-full lg:w-20 flex items-center justify-end gap-2">
          <div className="w-full lg:w-20 flex items-center justify-end gap-2">
            <Tooltip title="Delete" placement="top-start" followCursor arrow>
              <IconButton>
                {isDeleting ? (
                  <CircularProgress size={20} />
                ) : (
                  <CloseOutlined
                    onClick={() => handleRemove(curElm?._id)}
                    className="text-youtube text-xl"
                  />
                )}
              </IconButton>
            </Tooltip>
          </div>

          {curElm?.isRead ? (
            <FiberManualRecord className="!text-white !text-xs" />
          ) : (
            <FiberManualRecord className="!text-green-600 !text-xs !cursor-pointer" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
