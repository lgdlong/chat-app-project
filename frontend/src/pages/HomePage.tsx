import "./HomePage.css";
import "../css/variables.css";

import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";

export default function HomePage() {
  return (
    <div className="d-flex flex-row">
      <SideBar />
      <ChatView />
    </div>
  );
}
