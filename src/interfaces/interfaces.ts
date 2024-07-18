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
