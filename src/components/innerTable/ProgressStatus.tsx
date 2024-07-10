import { CircularProgress } from "@mui/material";
import { CircularProgressWithLabel } from "components/core";
import { useSWRAPI } from "hooks";
import React from "react";

const ProgressStatus = ({ userId, courseId }: any) => {
  const {
    data: progress,
    mutate: progressMutate,
    isValidating,
  } = useSWRAPI(`student/progress?courseId=${courseId}&userId=${userId}`);

  return (
    <div>
      {isValidating ? (
        <CircularProgress />
      ) : (
        <CircularProgressWithLabel
          value={progress?.data?.overallCompletionRate}
        />
      )}
    </div>
  );
};

export default ProgressStatus;
