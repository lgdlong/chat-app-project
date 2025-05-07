import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import { useState } from "react";

export default function Settings() {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <OverlayTrigger
        placement="right"
        overlay={<Tooltip id="tooltip-settings">Settings</Tooltip>}
      >
        <div
          className="settings-icon"
          onClick={handleOpen}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          <FontAwesomeIcon icon={faGear} size="lg" color="#ccc" />
        </div>
      </OverlayTrigger>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
      </Modal>
    </>
  );
}
