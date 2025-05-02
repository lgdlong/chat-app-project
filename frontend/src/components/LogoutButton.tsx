import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton() {
  const { logoutUser } = useAuth();

  return (
    <div className="leftbar-tab d-flex justify-content-center align-items-center">
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        id="logout-btn"
        color="white"
        onClick={logoutUser}
        style={{ color: "white", fontSize: "24px", cursor: "pointer" }}
      />
    </div>
  );
}
