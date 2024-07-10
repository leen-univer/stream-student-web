/* eslint-disable @next/next/no-img-element */
import { Add, Close, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { CategoryForm } from "components/forms";
import { AdminPanelLayout } from "layouts";
import Link from "next/link";
import { adminCourseArrType } from "types/adminCourseCard";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
} from "@mui/material";
import { useAppContext } from "contexts";
import { adminManageCategoryContent, deleteContent } from "locale";
import useSWRAPI from "hooks/useSWRAPI";
import useMutation from "hooks/useMutataion";
import Swal from "sweetalert2";
import { CategorySkeleton } from "../../../components/skeleton";
import { Empty } from "components/core";

const ManageCourses = () => {
  const { selectedLanguage } = useAppContext();
  const [pageNo, setPageNo] = useState(1);
  const { data, isValidating, mutate } = useSWRAPI(
    `category/getAllCategory?perPage=10&pageNo=${pageNo}`
  );
  return (
    <AdminPanelLayout title="Manage Course | StreamStudent">
      <article className="">
        <section className="w-full">
          <h1 className="title-styling text-center t pb-8">
            {adminManageCategoryContent(selectedLanguage).AllCategories}
          </h1>
          <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            <AddCategoryButton mutate={mutate} />
            {isValidating ? (
              <>
                <CategorySkeleton i={data?.data?.length || 8} />
              </>
            ) : data?.data?.data?.data.length >= 1 ? (
              <>
                {data?.data?.data?.data?.map((item: adminCourseArrType) => (
                  <AdminCategoryCard
                    key={item?._id}
                    item={item}
                    mutate={mutate}
                  />
                ))}
              </>
            ) : (
              <span className="col-span-12">
                <Empty
                  title={
                    adminManageCategoryContent(selectedLanguage)
                      .NoCategoriesFound
                  }
                />
              </span>
            )}
          </aside>
        </section>

        <div className="w-full flex items-center justify-center py-4 mt-2 ">
          <Pagination
            count={Math.ceil(
              Number(data?.data?.data?.totalCount || 1) /
                Number(data?.data?.data?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div>
      </article>
    </AdminPanelLayout>
  );
};

const AddCategoryButton = ({ mutate }: { mutate: () => void }) => {
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
        className="w-full h-32 flex items-center justify-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <Add className="text-5xl text-primary" />
        <h1 className="text-3xl text-primary font-bold">
          {adminManageCategoryContent(selectedLanguage).AddCategory}
        </h1>
      </div>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <h2 className="text-3xl font-bold py-4 text-center">
          {adminManageCategoryContent(selectedLanguage).AddCategory}
        </h2>

        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <CategoryForm handleClose={handleClose} mutate={mutate} />
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

const AdminCategoryCard = ({
  item,
  mutate,
}: {
  item: adminCourseArrType;
  mutate?: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const ID = item?._id;
  const { selectedLanguage } = useAppContext();

  const handleRemoveCategory = async (ID: any) => {
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
          const res = await mutation(
            `category/delete-category?categoryId=${ID}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );

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
      className="group relative w-full flex items-center justify-between gap-4 bg-white rounded-xl overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
    >
      <section className="flex flex-col gap-2">
        <img
          className="w-32 h-32 object-cover"
          src={item.thumbnailUrl || "/Image/student_1.webp"}
          alt="category_thumbnailUrl"
        />
      </section>

      <aside className="w-full">
        <div className="flex flex-col gap-1 w-48">
          <Link href={`/admin/category/${item?._id}`} key={item._id}>
            <p className="lg:text-lg lg:w-40 font-bold text-primary hover:text-blue-500 hover:underline">
              {item.name}
            </p>
          </Link>
          <p>
            {item.subcategoryCount}{" "}
            {adminManageCategoryContent(selectedLanguage).Subcategories}
          </p>
        </div>
      </aside>

      <div className="absolute top-2 right-2 flex-col gap-5  text-primary hidden group-hover:block">
        <EditCategoryButton id={item._id} mutate={mutate} />

        <button
          className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
          onClick={() => handleRemoveCategory(ID)}
        >
          <DeleteOutline fontSize="small" />
        </button>
      </div>
    </article>
  );
};

const EditCategoryButton = ({
  id,
  mutate,
}: {
  id: string;
  mutate?: () => void;
}) => {
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
      <button
        className="w-8 h-8 grid place-items-center mb-2 rounded-full border border-blue-500 bg-blue-500/10 text-blue-500"
        onClick={handleClickOpen}
      >
        <EditOutlined fontSize="small" />
      </button>

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <h2 className="text-3xl font-bold py-4 text-center text-secondary">
          {adminManageCategoryContent(selectedLanguage).EditCategory}
        </h2>

        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <CategoryForm
              isEdit
              handleClose={handleClose}
              id={id}
              mutate={mutate}
            />
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

export default ManageCourses;
