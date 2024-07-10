import { Add, Close, DeleteOutline } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { Empty } from "components/core";
import { UpdateMainQuizForm } from "components/forms/adminForms";
import AddMainQuizForm from "components/forms/adminForms/AddMainQuizForm";
import LanguageForm from "components/forms/adminForms/LaguageForm";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import useSWRAPI from "hooks/useSWRAPI";
import { AdminPanelLayout } from "layouts";
import { adminManageCategoryContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { CategorySkeleton } from "../../../components/skeleton";

const ManageQuizzes = () => {
  const { selectedLanguage } = useAppContext();
  const [pageNo, setPageNo] = useState(1);
  const { data, isValidating, mutate } = useSWRAPI(`quiz/all-quiz`);
  return (
    <AdminPanelLayout title="Manage Quiz | StreamStudent">
      <article className="">
        <section className="w-full">
          <h1 className="title-styling text-center t pb-8">
            {adminManageCategoryContent(selectedLanguage).AllQuizzes}
          </h1>
          <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            <AddQuiz mutate={mutate} />
            {isValidating ? (
              <>
                <CategorySkeleton i={data?.data?.data?.data?.length || 8} />
              </>
            ) : data?.data?.data?.data?.length >= 1 ? (
              <>
                {data?.data?.data?.data?.map((item: any) => (
                  <QuizCard key={item?._id} item={item} mutate={mutate} />
                ))}
              </>
            ) : (
              <span className="col-span-12">
                <Empty
                  title={adminManageCategoryContent(selectedLanguage).noQuiz}
                />
              </span>
            )}
          </aside>
        </section>

        {/* <div className="w-full flex items-center justify-center py-4 mt-2 ">
          <Pagination
            count={Math.ceil(
              Number(data?.data?.data?.totalCount || 1) /
                Number(data?.data?.data?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </article>
    </AdminPanelLayout>
  );
};

const AddQuiz = ({ mutate }: { mutate: () => void }) => {
  const { selectedLanguage } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="w-full h-[8rem] flex items-center justify-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <Add className="text-5xl text-primary" />
        <h1 className="text-3xl text-primary font-bold">
          {adminManageCategoryContent(selectedLanguage).AddQuiz}
        </h1>
      </div>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <h2 className="text-3xl font-bold py-4 text-center">
          {adminManageCategoryContent(selectedLanguage).AddQuiz}
        </h2>

        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <AddMainQuizForm handleClose={handleClose} mutate={mutate} />
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const QuizCard = ({ item, mutate }: { item: any; mutate?: () => void }) => {
  const { mutation, isLoading } = useMutation();
  const ID = item?._id;
  const { selectedLanguage } = useAppContext();
  const router = useRouter();

  const handleRemoveQuiz = async (ID: any) => {
    try {
      Swal.fire({
        title: deleteContent(selectedLanguage).Warning,
        text: deleteContent(selectedLanguage).Areyousureyouwanttoremovethis,
        icon: "warning",
        iconColor: "#FF4D49",
        confirmButtonColor: "#FF4D49",
        confirmButtonText: deleteContent(selectedLanguage).YesRemoveit,
        cancelButtonText: deleteContent(selectedLanguage).Nocancel,
        showCancelButton: true,
      }).then(async (result) => {
        if (result?.isConfirmed) {
          const res = await mutation(`quiz/delete-quiz/${ID}`, {
            method: "DELETE",
            isAlert: true,
          });
          mutate?.();
        }
      });
    } catch (error) {
      // CatchError(error);
    }
  };
  return (
    <article
      key={item._id}
      className="group relative w-full h-[8rem] z-10 flex items-center justify-between gap-4 bg-white rounded-xl overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] cursor-pointer "
    >
      <aside className="w-full text-center">
        <p
          onClick={() => router?.push(`quizzes/${item?._id}`)}
          className="lg:text-2xl text-center font-bold text-primary hover:text-blue-500"
        >
          {item.title}
        </p>
      </aside>

      <div className="absolute z-20 top-2 right-2 flex-col gap-5 bg-black p-2 rounded-lg  text-primary hidden group-hover:block">
        <UpdateMainQuizForm data={item} mutate={mutate} />
        <button
          className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500 mt-2"
          onClick={() => handleRemoveQuiz(ID)}
        >
          <DeleteOutline fontSize="small" />
        </button>
      </div>
    </article>
  );
};

export default ManageQuizzes;
