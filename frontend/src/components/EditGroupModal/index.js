// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditGroupForm from "./EditGroupForm";
import { Button } from "react-bootstrap";

function EditGroupFormModal({ event }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button style={{ margin: "20px" }} variant="dark" onClick={() => setShowModal(true)}>
				Edit Your Event
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditGroupForm event={event} />
				</Modal>
			)}
		</>
	);
}

export default EditGroupFormModal;
