import "../css/variables.css";

import SideBar from "../components/sidebar/SideBar";
import ChatView from "../components/chat/ChatView";

export default function HomePage() {
  return (
    <div className="d-flex flex-row">
      <SideBar />
      <ChatView />
    </div>
  );
}
