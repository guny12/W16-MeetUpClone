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
				Create A Group
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateGroupForm />
				</Modal>
			)}
		</>
	);
}

export default CreateGroupFormModal;
