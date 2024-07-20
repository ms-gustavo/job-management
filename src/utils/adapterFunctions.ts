import { User } from "@/interfaces/interfaces";
import { handleJobDelete, handleUpdateStatus } from "./serverRequests";

export const handleJobDeleteAdapter = (
  jobId: string,
  token: string,
  setUserData: React.Dispatch<React.SetStateAction<User | null>>,
  successToast: (message: string) => void,
  errorToast: (message: string) => void
) => {
  handleJobDelete({
    jobId,
    token,
    setUserData,
    successToast,
    errorToast,
  });
};

export const handleUpdateStatusAdapter = async (
  jobId: string,
  updatedStatus: string,
  token: string,
  setHasJobChanged: React.Dispatch<React.SetStateAction<boolean>>,
  errorToast: (message: string) => void
) => {
  handleUpdateStatus({
    jobId,
    updatedStatus,
    setHasJobChanged,
    token,
    errorToast,
  });
};
