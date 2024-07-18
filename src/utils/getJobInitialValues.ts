import { Job } from "@/interfaces/interfaces";
import { newJobInitialValues } from "./initialValues";

export const getJobInitialValues = (userId: string): Job => ({
  ...newJobInitialValues,
  userId: userId,
});
