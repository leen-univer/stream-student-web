import useSWR, { SWRConfiguration } from "swr";
import { BASE_URL, getFromLocalStorage, getFromSessionStorage } from "utils";
const useSWRAPI = <T>(url?: string | null, options?: SWRConfiguration) => {
  const fetcher = async (url: string, options?: any) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromSessionStorage("ACCESS_TOKEN")}`,
      },
    });
    const data: T | any = await res.json();
    return { data, res };
  };

  const { data, error, mutate, isValidating } = useSWR(
    url
      ? `${BASE_URL}/${url}`?.includes("undefined")
        ? null
        : `${BASE_URL}/${url}`
      : null,
    fetcher,
    {
      ...options,
      errorRetryCount: options?.errorRetryCount || 1,
      revalidateOnFocus: options?.revalidateOnFocus || false,
    }
  );
  return {
    data,
    error,
    isValidating,
    mutate,
  };
};
export default useSWRAPI;
