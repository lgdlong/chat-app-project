import { createContext, useContext, useState, ReactNode } from "react";
//import { getProfile } from "../api/authApi"; // use api here 
//this is global object if after login -> api -> home with right use
// https://docs.google.com/document/d/1gRq5bOlCfL_8_YgUszfQ2A5soauqBSdPbg5rcOOqSzM/edit?fbclid=IwY2xjawJ-P95leHRuA2FlbQIxMABicmlkETFIZmNLM1I3Vk5jZGk0SnFxAR7bJocMdS1XSYbV8fxFgP8yHSibne_hGKzYkrnFjD_k7ylb0nPrdC25TEpFAQ_aem_VousFE37-bzmum-RdSHg9w&tab=t.s7a9vofjyfnh
//this diagram 

export interface User {
  id: number;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  picUrl: string;
}

const defaultUser: User = {
  id: 1,
  displayName: "Phung Luu Hoang Long",
  username: "lgdlong",
  email: "phungluuhoanglong@gmail.com",
  phone: "0123456789",
  picUrl: "https://picsum.photos/id/237/200/300",
};

const UserContext = createContext<{
  user: User;
  setUser: (user: User) => void;
}>({
  user: defaultUser,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
