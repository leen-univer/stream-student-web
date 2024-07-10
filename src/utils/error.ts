import Swal from "sweetalert2";

const showError = (error: any) => {
  if (error instanceof Error) {
    return Swal.fire({
      title: "Error",
      text: error?.message,
      icon: "error",
    });
  }

  Swal.fire({
    title: "Error",
    text: "Something went wrong!",
    icon: "error",
  });
};

export default showError;
