// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateGroupForm from "./CreateGroupForm";
import { Button } from "react-bootstrap";

function CreateGroupFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button variant="dark" onClick={() => setShowModal(true)}>
				Log In
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Form />
				</Modal>
			)}
		</>
	);
}

export default CreateGroupFormModal;
