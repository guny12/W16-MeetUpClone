// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateEventForm from "./CreateEventForm";
import { Button } from "react-bootstrap";

function CreateEventFormModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button variant="dark" onClick={() => setShowModal(true)}>
				Create A Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateEventForm group={group} />
				</Modal>
			)}
		</>
	);
}

export default CreateEventFormModal;
