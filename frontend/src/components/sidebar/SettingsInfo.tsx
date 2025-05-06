import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
//import "./Settings.css"; // Optional, để custom thêm

export default function Settings() {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip id="tooltip-settings">Cài đặt</Tooltip>}
    >
      <div className="settings-icon">
        <FontAwesomeIcon icon={faGear} size="lg" color="#ccc" />
      </div>
    </OverlayTrigger>
  );
}
