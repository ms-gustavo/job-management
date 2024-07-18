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
  id: string;
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
}
