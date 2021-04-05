// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditGroupForm from "./EditGroupForm";
import { Button } from "react-bootstrap";

function EditGroupFormModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button style={{ margin: "20px" }} variant="dark" onClick={() => setShowModal(true)}>
				Edit Your Group
			</Button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditGroupForm group={group} />
				</Modal>
			)}
		</>
	);
}

export default EditGroupFormModal;
