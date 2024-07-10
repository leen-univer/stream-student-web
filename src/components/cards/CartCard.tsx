import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, Tooltip } from "@mui/material";
import { useAppContext } from "contexts";
import useMutation from "hooks/useMutataion";
import { deleteContent, myCartContent } from "locale";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CartCard = ({
  cartData,
  checkOutMutate,
  mutate,
}: {
  cartData: any;
  checkOutMutate?: () => void;
  mutate?: () => void;
}) => {
  const { selectedLanguage } = useAppContext();

  return (
    <article className="">
      <div className="flex flex-col divide-y divide-gray-200">
        <div className="grid-cols-12 grid py-4 md:px-6 px-1">
          <h3 className="text-gray-900 md:col-span-3 col-span-3 font-bold text-xl">
            {myCartContent(selectedLanguage).Product}
          </h3>
          <h3 className="text-gray-900 md:col-span-5 col-span-7 font-bold text-xl">
            {myCartContent(selectedLanguage).Detail}
          </h3>
          <h3 className="text-gray-900 md:col-span-2 font-bold text-xl hidden md:block">
            {myCartContent(selectedLanguage).Cost}
          </h3>
          <h3 className="text-gray-900  col-span-2 font-bold text-xl">
            {myCartContent(selectedLanguage).Action}
          </h3>
        </div>
        <div>
          {cartData?.map((data: any) => (
            <div key={data?._id}>
              {data?.course && data?.courseId && (
                <SingleCartCard
                  cartId={data?._id}
                  key={data?._id}
                  item={data?.course}
                  checkOutMutate={checkOutMutate}
                  mutate={mutate}
                />
              )}

              {data?.bundle && data?.bundleId && (
                <SingleCartCard
                  cartId={data?._id}
                  key={data?.bundle[0]?._id}
                  item={data?.bundle[0]}
                  checkOutMutate={checkOutMutate}
                  mutate={mutate}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CartCard;

const SingleCartCard = ({
  cartId,
  item,
  checkOutMutate,
  mutate,
}: {
  cartId: any;
  item: any;
  checkOutMutate?: () => void;
  mutate?: () => void;
}) => {
  const { mutation, isLoading } = useMutation();
  const { selectedLanguage } = useAppContext();
  const handleDelete = async () => {
    Swal.fire({
      title: deleteContent(selectedLanguage).Warning,
      text: deleteContent(selectedLanguage).Areyousureyouwanttoremovethis,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: deleteContent(selectedLanguage).YesRemoveit,
      cancelButtonText: deleteContent(selectedLanguage).Nocancel,
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutation(`cart/delete-cart?cartId=${cartId}`, {
            method: "DELETE",
          });
          checkOutMutate?.();
          mutate?.();
        } catch (error: any) {
          toast.error(error);
        }
      }
    });
  };
  return (
    <>
      <div className="grid  grid-cols-12 py-4 md:px-6">
        <div className="md:col-span-3 col-span-3">
          <img
            src={item?.thumbnailUrl}
            alt="course-image"
            className="w-16 h-16 bg-gray-100/40 shadow-md rounded-2xl p-2"
          />
        </div>
        <div className="md:col-span-5 col-span-7">
          <p className="text-gray-900 font-medium break-words pr-6">
            {item?.name || item?.courseName}
          </p>
          <p className="font-medium text-red-600 md:hidden block">
            $ {item?.salePrice}
          </p>
        </div>
        <div className="md:col-span-2 hidden md:block">
          <h3 className="font-medium text-red-600">$ {item?.salePrice}</h3>
        </div>
        <div className="md:col-span-2 col-span-2">
          <Tooltip title="remove the item">
            <button
              onClick={() => handleDelete()}
              className="py-2 px-4 hover:text-red-600 text-red-400 rounded-lg"
            >
              {isLoading ? (
                <CircularProgress size={20} color={"warning"} />
              ) : (
                <DeleteIcon />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};
