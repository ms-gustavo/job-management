import { Job } from "@/interfaces/interfaces";

export const loginInitialValues = { email: "", password: "" };
export const registerInitialValues = { name: "", email: "", password: "" };
export const newJobInitialValues: Job = {
  title: "",
  company: "",
  status: "",
  appliedAt: "",
  site: "",
  userId: "",
};
