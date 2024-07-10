/* eslint-disable @next/next/no-img-element */
import { Add, Close, DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Pagination,
} from "@mui/material";
import { Empty } from "components/core";
import { SubCategoryForm } from "components/forms";
import { CategorySkeleton } from "components/skeleton";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import useSWRAPI from "hooks/useSWRAPI";
import { AdminPanelLayout } from "layouts";
import { adminCategoryIDContent, deleteContent } from "locale";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubCategoryType } from "types";
import { sliceSentence } from "utils/SliceSentence";

const SubCategory = () => {
  const { selectedLanguage } = useAppContext();
  const [pageNo, setPageNo] = useState(1);
  const { categoryID } = useRouter().query;
  const { data, mutate, isValidating } = useSWRAPI(
    `category/getAllSubCategory?categoryId=${categoryID}&perPage=10&pageNo=${pageNo}`
  );

  return (
    <AdminPanelLayout title="Sub-categories | StreamStudent">
      <article>
        <section className="w-full grid">
          <h1 className="title-styling text-center pb-8">
            {adminCategoryIDContent(selectedLanguage).SubCategories}
          </h1>
          <aside className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            <AddSubCategoryButton categoryID={categoryID} mutate={mutate} />
            {isValidating && isValidating ? (
              <>
                <CategorySkeleton i={data?.data?.data?.data?.length || 8} />
              </>
            ) : data?.data?.data?.data?.length >= 1 ? (
              <>
                {data?.data?.data?.data.map(
                  (item: SubCategoryType, i: number) => (
                    <AdminSubCategoryCard key={i} item={item} mutate={mutate} />
                  )
                )}
              </>
            ) : (
              <span className="col-span-12">
                <Empty
                  title={adminCategoryIDContent(selectedLanguage).NoSubcategory}
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
const AdminSubCategoryCard = ({
  item,
  mutate,
}: {
  item: SubCategoryType;
  mutate: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useAppContext();
  const { mutation, isLoading } = useMutation();

  const handleRemoveSubCategory = async () => {
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
            `category/delete-subcategory?subCategoryId=${item?._id}`,
            {
              method: "DELETE",
              isAlert: true,
            }
          );
          mutate();
        }
      });
    } catch (error) {}
  };

  return (
    <section
      onClick={() => setIsOpen(!isOpen)}
      className="group relative w-full flex items-center justify-between gap-4 bg-white rounded-xl overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  "
    >
      <img
        className="w-32 h-32 object-cover"
        src={item.thumbnailUrl || "/home/categoryImage.jpg"}
        alt="category_image"
      />
      <aside className="w-full">
        <div className="flex flex-col gap-1 w-48">
          <p className="lg:text-lg lg:w-40 font-bold text-primary">
            {item?.name}
          </p>
          <p className=" break-all">{sliceSentence(item?.description, 5)}</p>
        </div>
      </aside>

      <div className="absolute hidden top-2 right-2 flex-col gap-2 text-primary common-transition group-hover:block">
        <EditSubCategoryButton item={item} mutate={mutate} />
        <button
          className="w-8 h-8 grid place-items-center rounded-full border border-red-500 bg-red-500/10 text-red-500"
          onClick={handleRemoveSubCategory}
        >
          <DeleteOutline fontSize="small" />
        </button>
      </div>
    </section>
  );
};

const AddSubCategoryButton = ({
  categoryID,
  mutate,
}: {
  categoryID: any;
  mutate: any;
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
      <div
        className="w-full h-32 flex items-center justify-center bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl cursor-pointer"
        onClick={handleClickOpen}
      >
        <Add className="text-5xl text-primary" />
        <h1 className="text-3xl text-primary font-bold">
          {adminCategoryIDContent(selectedLanguage).AddSubCategory}
        </h1>
      </div>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <h2 className="text-3xl font-bold py-4 text-center">
          {adminCategoryIDContent(selectedLanguage).AddSubCategory}
        </h2>

        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <SubCategoryForm
              categoryID={categoryID}
              handleClose={handleClose}
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
const EditSubCategoryButton = ({
  // subCategoryID,
  item,
  mutate,
}: {
  // subCategoryID: string;
  item: SubCategoryType;
  mutate: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const { selectedLanguage } = useAppContext();
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
          {adminCategoryIDContent(selectedLanguage).EditSubCategory}
        </h2>

        <DialogContent>
          <div className="max-h-full overflow-scroll">
            <SubCategoryForm
              isEdit
              // subCategoryID={subCategoryID}
              mutate={mutate}
              item={item}
              handleClose={handleClose}
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

export default SubCategory;
