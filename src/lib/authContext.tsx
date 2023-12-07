import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

interface User {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: string[];
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, unknown>;
  registration: string;
  status: boolean;
}

interface AuthContextType {
  user: User | null;
  loginUser: (userInfo: { email: string; password: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  registerUser: (userInfo: {
    email: string;
    password1: string;
    name: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo: { email: string; password: string }) => {
    setLoading(true);

    console.log("userInfo", userInfo);

    try {
      await account.createEmailSession(userInfo.email, userInfo.password);
      const accountDetails = await account.get();
      setUser(accountDetails as User);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const registerUser = async (userInfo: {
    email: string;
    password1: string;
    name: string;
  }) => {
    setLoading(true);

    try {
      await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password1,
        userInfo.name
      );
      await account.createEmailSession(userInfo.email, userInfo.password1);
      const accountDetails = await account.get();
      setUser(accountDetails as User);
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails as User);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const contextData: AuthContextType = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext) as AuthContextType;

export default AuthContext;
