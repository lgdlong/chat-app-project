// UserContext.tsx

import { createContext, useState, ReactNode } from "react";
import { User, defaultUser } from "../interfaces/User";

/**
 * Định nghĩa kiểu dữ liệu cho context người dùng,
 * bao gồm thông tin người dùng, setter, trạng thái loading và setter loading.
 */
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// ✅ Tạo context với giá trị mặc định để tránh lỗi null context
export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});

/**
 * Provider bọc toàn bộ app để cung cấp state người dùng cho các component bên trong.
 * Không gọi API trong đây — logic kiểm tra đăng nhập nên đặt ở AppInner để kiểm soát routing.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
