import Swal from "sweetalert2";
import { BASE_URL } from "utils";
import { getAccessToken } from "./useMutataion";

export const downloadFile = async ({
  url,
  method = "GET",
  body,
}: // type,
{
  url: string;
  method: "GET" | "POST";
  // body?: BodyInit;
  body?: any;
  // type: "pdf" | "csv" | "excel";
}) => {
  try {
    // let ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");
    const token = getAccessToken();
    // console.log("Token--->", token);
    const response = await fetch(BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: body && JSON.stringify(body),
    });
    // console.log("Response--->", response);

    if (response?.status !== 200) throw new Error("Download failed.");
    console.log(response.headers.get("Content-Type") === "application/pdf");
    //convert to blob
    const blob = await response.blob();

    const fileUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = `${Date.now()}.pdf`; // Specify the desired file name
    downloadLink.click();

    window.URL.revokeObjectURL(fileUrl);

    // notify.success("File downloaded successfully.");
    Swal.fire(`Success`, `You have successfully downloaded!`, `success`);
  } catch (error) {
    if (error instanceof Error) {
      // notify.error(error?.message);
      Swal.fire("Error", error?.message || "Unable to Download", "error");
      return;
    }
    // notify.error("Download failed. Try again!");
    Swal.fire("Error", "Download failed. Try again!", "error");
  }
};
