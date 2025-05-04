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

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Notification Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Notification Section */}
          <div className="mb-4">
            <h5 className="mb-3">Notification Settings</h5>
            <p>Receive a notification whenever there is a new message</p>
            <div className="d-flex gap-4">
              <div className="border p-3 rounded text-center" style={{ flex: 1 }}>
                <img src="/laptop_on.png" alt="On" style={{ width: "50px" }} />
                <div>
                  <input type="radio" name="notify" defaultChecked /> On
                </div>
              </div>
              <div className="border p-3 rounded text-center" style={{ flex: 1 }}>
                <img src="/laptop_off.png" alt="Off" style={{ width: "50px" }} />
                <div>
                  <input type="radio" name="notify" /> Off
                </div>
              </div>
            </div>
          </div>

          {/* Sound Section */}
          <div className="border-top pt-3">
            <h5 className="mb-2">Notification Sound</h5>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="soundSwitch" defaultChecked />
              <label className="form-check-label" htmlFor="soundSwitch">
                Play sound for new messages & notifications
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
