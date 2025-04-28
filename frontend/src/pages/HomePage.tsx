import "./HomePage.css";
import "../css/variables.css";

import SideBar from "../components/SideBar";
import ChatView from "../components/ChatView";

export default function HomePage() {
  return (
    <>
      <SideBar />
      <main>
        <ChatView />
      </main>
    </>
  );
}
