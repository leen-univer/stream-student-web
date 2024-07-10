import {
  CheckCircleRounded,
  Close,
  LibraryBooksOutlined,
} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAuth } from "hooks";
import useMutation from "hooks/useMutataion";
import { useRouter } from "next/router";
import { useState } from "react";
import { currencyFormatter } from "utils";
import showError from "utils/error";
import { sliceSentence } from "utils/SliceSentence";
import PlaylistCard from "./PlaylistCard";
import { studentPanel } from "locale";
import { useAppContext } from "contexts";
const BundleCard = ({
  bundle,
  mutate,
}: {
  bundle: any;
  mutate: () => void;
}) => {
  const [addCart, setAddCart] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutation } = useMutation();
  const { selectedLanguage } = useAppContext();
  const router = useRouter();
  const { user } = useAuth();

  const handleAddToCart = async (bundleId: any) => {
    try {
      const res = await mutation(`cart/create-cart`, {
        method: "POST",
        body: {
          bundleId: bundleId,
        },
      });
      mutate?.();
    } catch (error) {
      showError(error);
    } finally {
    }
  };

  const showLogin = (id: any) => {
    if (user?._id && !bundle?.isInCart) {
      handleAddToCart(id);
    } else if (user?._id && bundle?.isInCart) {
      router?.push(`/my-account/my-cart`);
    } else {
      router?.push(`login`);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="relative group bg-white shadow-lg rounded-xl overflow-hidden border hover:border-teal-600/60">
        <div className="relative">
          <img
            src={bundle?.thumbnailUrl}
            alt={bundle?.thumbnailPath}
            className="w-full h-40 object-cover object-center"
          />
          <p
            onClick={() => handleClickOpen()}
            className="absolute top-3 left-3 text-sm text-white font-medium py-1 px-2 bg-gray-900 rounded cursor-pointer"
          >
            {bundle?.courses?.length}-{" "}
            {studentPanel(selectedLanguage).CourseBundle}
          </p>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {bundle?.name}
          </h3>
          <p className="text-gray-600 mb-2">
            {sliceSentence(bundle?.description, 20)}
          </p>
          <p
            onClick={() => handleClickOpen()}
            className="text-gray-600 mb-2 cursor-pointer"
          >
            <LibraryBooksOutlined className="mr-2" /> {bundle?.courses?.length}{" "}
            {studentPanel(selectedLanguage).Courses}
          </p>
        </div>
        <div className="flex justify-between p-4 ">
          <p className="text-gray-600 font-semibold text-2xl">
            <span>{currencyFormatter(bundle?.salePrice as number)}</span>
          </p>
          <span className="text-red-500 font-medium text-xl line-through">
            <span>{currencyFormatter(bundle?.mrpPrice as number)}</span>
          </span>
        </div>
        <div className="text-center w-full p-2">
          <button
            onClick={() => handleClickOpen()}
            className="w-full rounded px-5 py-2.5 overflow-hidden group bg-gray-200 relative hover:bg-gradient-to-r group-hover:from-gray-400 hover:to-gray-800  transition-all ease-out duration-300 flex items-center justify-center gap-2"
          >
            <span className="relative text-black font-semibold text-xl">
              {studentPanel(selectedLanguage).viewBundle}
            </span>
          </button>
        </div>
        <div className="text-center w-full p-2">
          {!bundle?.isInCart && bundle?.isPurchased ? (
            <button className="w-full rounded px-5 py-2.5 overflow-hidden bg-green-400/20">
              <span className="mr-1">
                {" "}
                <CheckCircleRounded
                  fontSize="medium"
                  className="text-green-500"
                />
              </span>
              <span className="text-green-800 font-semibold text-xl">
                {studentPanel(selectedLanguage).Enrolled}
              </span>
            </button>
          ) : (
            <button
              onClick={() => showLogin(bundle?._id)}
              className={`w-full rounded px-5 py-2.5 overflow-hidden group ${
                bundle?.isInCart
                  ? "bg-emerald-700/50 hover:bg-gradient-to-r group-hover:from-green-400/60 hover:to-green-800/20 text-black "
                  : "text-white bg-primary/80 relative hover:bg-gradient-to-r group-hover:from-secondary"
              }  hover:to-primary/50  hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 flex items-center justify-center gap-2`}
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-semibold text-xl">
                {bundle?.isInCart ? (
                  <ShoppingCartCheckoutIcon />
                ) : (
                  <AddShoppingCartIcon />
                )}
              </span>
              <span className="relative font-semibold text-xl">
                {bundle?.isInCart
                  ? studentPanel(selectedLanguage).Gotocart
                  : studentPanel(selectedLanguage).Addtocart}
              </span>
            </button>
          )}
        </div>
      </section>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        className="overflow-hidden"
      >
        <DialogTitle className="flex items-center justify-center py-6">
          <h1 className="text-3xl font-bold py-2">
            {studentPanel(selectedLanguage).FrequentlyBroughtTogether}
          </h1>
        </DialogTitle>
        <DialogContent>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-hidden">
            {bundle?.Courses?.map((course: any, index: number) => (
              <div key={index} className="relative">
                <PlaylistCard item={course} isbundle={true} />
                {index < bundle.Courses.length - 1 && (
                  <div className="absolute top-1/2 -right-7 transform -translate-y-1/2 bg-gray-100  h-12 w-12">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      height="100%"
                    >
                      <Typography variant="h2" color="text.secondary">
                        +
                      </Typography>
                    </Box>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="absolute top-2 right-5">
          <Close
            onClick={handleClose}
            className="text-red-600 cursor-pointer"
          />
        </DialogActions>
        <aside className="flex items-center md:justify-between md:flex-row flex-col px-8 my-3 md:gap-0 gap-6">
          <div>
            <p className="text-gray-900 text-2xl font-semibold">
              <span className="text-gray-600 text-2xl font-medium md:block hidden">
                {studentPanel(selectedLanguage).Price}:
              </span>{" "}
              {currencyFormatter(bundle?.salePrice as number)}
              <span className="text-red-500 font-medium text-xl ml-4 line-through">
                {currencyFormatter(bundle?.mrpPrice as number)}
              </span>
            </p>
          </div>
          <div className="">
            <button
              onClick={() => showLogin(bundle?._id)}
              className={`w-full rounded px-5 py-2.5 overflow-hidden group ${
                bundle?.isInCart
                  ? "bg-emerald-700/60 hover:bg-gradient-to-r group-hover:from-green-400/60 hover:to-green-800/20 text-green-950"
                  : "text-white  bg-primary/80 relative hover:bg-gradient-to-r group-hover:from-secondary hover:to-primary/50"
              }   hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 flex items-center justify-center gap-2`}
            >
              <div>
                <span className="relative font-semibold text-xl">
                  {bundle?.isInCart ? (
                    <>
                      <ShoppingCartCheckoutIcon />{" "}
                      {studentPanel(selectedLanguage).Gotocart}
                    </>
                  ) : (
                    <>
                      <AddShoppingCartIcon />{" "}
                      {studentPanel(selectedLanguage).Addtocart}
                    </>
                  )}
                </span>
              </div>
            </button>
          </div>
        </aside>
      </Dialog>
    </>
  );
};

export default BundleCard;
