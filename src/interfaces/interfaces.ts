export interface LoginFormProps {
  toggleForm: () => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}