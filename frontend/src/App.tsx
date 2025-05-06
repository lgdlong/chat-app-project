import { UserProvider } from "./context/UserContext";
import AppInner from "./AppInner";

export default function App() {
  return (
    <UserProvider>
      <AppInner />
    </UserProvider>
  );
}