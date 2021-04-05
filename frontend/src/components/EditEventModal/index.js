// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditEventForm from "./EditEventForm";
import { Button } from "react-bootstrap";

function EditEventFormModal({ event }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button style={{ margin: "20px" }} variant="dark" onClick={() => setShowModal(true)}>
				Edit Your Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditEventForm event={event} />
				</Modal>
			)}
		</>
	);
}

export default EditEventFormModal;
