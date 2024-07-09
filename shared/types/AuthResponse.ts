import { User } from "firebase/auth";

export interface AuthResponse {
  success: boolean;
  data?: User;
  message?: string;
  error?: ReferenceError | SyntaxError | TypeError | URIError;
} 