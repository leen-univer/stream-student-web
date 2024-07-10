import Loader from "components/core/Loader";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useAuth from "./useAuth";

const withProtectedStudent = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push, asPath } = useRouter();
    const urlRole = asPath.split("/")[1];
    let mounted = useRef<boolean>(false);
    useEffect(() => {
      mounted.current = true;
      if (!isUserLoading && (!user?._id || !user?.role)) push("/");
      if (!isUserLoading && user?.isBlocked) push("/");
      if (
        !isUserLoading &&
        user?.role &&
        user?.role === "STUDENT" &&
        urlRole !== "my-account"
      )
        push("/");
      if (
        !isUserLoading &&
        urlRole === "my-account" &&
        user?.role !== "STUDENT"
      )
        push("/");
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push, urlRole, asPath]);

    return (
      <>
        {user?._id && user?.role ? (
          <PassedComponent {...props} />
        ) : (
          <Loader visible={true} />
        )}
      </>
    );
  };

export default withProtectedStudent;
