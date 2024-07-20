export interface LoginFormProps {
  toggleForm: () => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface Job {
  id?: string;
  title: string;
  company: string;
  status: string;
  appliedAt: string;
  site: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  jobs: Job[];
}

export interface UserActionsProps {
  handleLogout: () => void;
  toggleJobForm: () => void;
  toggleJobList: () => void;
}

export interface JobFormProps {
  isSubmitting?: boolean;
  userId?: string;
  onSubmit: (values: Job) => void;
}

export interface JobListProps {
  jobs: Job[];
  onDelete: (jobId: string) => void;
  onUpdateStatus: (jobId: string, status: string) => void;
}

export interface ToastsProps {
  errorToast: (message: string) => void;
  successToast: (message: string) => void;
}

export interface FetchUserDataProps {
  token: string;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  errorToast: (message: string) => void;
}

export interface HandleJobSubmitProps {
  values: Job;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setHasJobChanged: React.Dispatch<React.SetStateAction<boolean>>;
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
}

export interface HandleJobDeleteProps {
  jobId: string;
  token: string;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  errorToast: (message: string) => void;
  successToast: (message: string) => void;
}

export interface HandleUpdateStatusProps {
  jobId: string;
  updatedStatus: string;
  token: string;
  setHasJobChanged: React.Dispatch<React.SetStateAction<boolean>>;
  errorToast: (message: string) => void;
}
