import { User } from "../interfaces/User"; // đường dẫn tùy theo project bạn
import { UserProfileProps } from "../interfaces/UserProfileProps";

export const mapUserToUserProfileProps = (user: User): UserProfileProps => {
  return {
    username: user.username,
    email: user.email,
    displayName: user.displayName ?? "No display name",
    picUrl: user.picUrl,
    status: user.status ?? "offline",
    phone: user.phone,
    createdAt: user.createdAt,
  };
};