import { Delete, VisibilityOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { NOTIFICATION } from "assets/animations";
import { useAppContext } from "contexts";
import { useSWRAPI } from "hooks";
import useMutation from "hooks/useMutataion";
import { TutorPanelLayout } from "layouts";
import { deleteContent, forgotPassAndNotificationPage } from "locale";
import { NotificationCard } from "pages/my-account/notifications";
import { Fragment, useState } from "react";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import NotificationType from "types/notification";

const TutorNotifications = () => {
  const { mutation } = useMutation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NOTIFICATION,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [pageNo, setPageNo] = useState(0);
  const { data, mutate, isValidating } = useSWRAPI(
    `notification/get-notification`
  );

  const { data: unread, mutate: markReadMutate } = useSWRAPI(
    "contact/all-unread-notification"
  );

  const handleReadAll = async () => {
    try {
      const res = await mutation(`notification/mark-all-read`, {
        method: "PUT",
      });
      mutate();
      markReadMutate();
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

  const { selectedLanguage } = useAppContext();
  return (
    <TutorPanelLayout>
      <section className="w-full">
        <h1 className="title-styling text-center pb-6 lg:pb-12">
          {forgotPassAndNotificationPage(selectedLanguage).all}{" "}
          <span className="text-primary">
            {forgotPassAndNotificationPage(selectedLanguage).notifications}
          </span>
        </h1>
        {data?.data?.data?.length ? (
          <aside className="flex flex-col gap-4">
            <div className="flex items-center justify-center lg:justify-end gap-4">
              <Tooltip
                title="Read All"
                placement="top-start"
                followCursor
                arrow
              >
                <IconButton onClick={handleReadAll}>
                  <VisibilityOutlined className="!text-blue-500" />
                </IconButton>
              </Tooltip>
              <Tooltip
                title="Delete All"
                placement="top-start"
                followCursor
                arrow
              >
                <IconButton onClick={handleDeleteAll}>
                  <Delete className="!text-red-600" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-2">
              {data?.data?.data?.map(
                (curElm: NotificationType, index: number) => (
                  <Fragment key={curElm?._id}>
                    <NotificationCard
                      curElm={curElm}
                      sl={index + 1}
                      mutate={mutate}
                      markReadMutate={markReadMutate}
                    />
                  </Fragment>
                )
              )}
            </div>
          </aside>
        ) : (
          <Lottie options={defaultOptions} height={500} width={550} />
        )}
      </section>
    </TutorPanelLayout>
  );
};

export default TutorNotifications;
