// https://docs.google.com/document/d/1gRq5bOlCfL_8_YgUszfQ2A5soauqBSdPbg5rcOOqSzM/edit?fbclid=IwY2xjawJ-P95leHRuA2FlbQIxMABicmlkETFIZmNLM1I3Vk5jZGk0SnFxAR7bJocMdS1XSYbV8fxFgP8yHSibne_hGKzYkrnFjD_k7ylb0nPrdC25TEpFAQ_aem_VousFE37-bzmum-RdSHg9w&tab=t.s7a9vofjyfnh
import { createContext, useState, ReactNode } from "react";
import { User, defaultUser } from "../interfaces/User"; // use types here
import { useEffect } from "react";
import { getCurrentUser } from "../api/authApi"; // use api here
import { ACCESS_TOKEN_KEY } from "../constants/storageKeys";

export const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      getCurrentUser()
        .then((userData) => setUser(userData))
        .catch((err) => {
          console.error("Không thể lấy lại thông tin người dùng:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
          }
          setUser(defaultUser);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
