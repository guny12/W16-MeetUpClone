import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/group";
import { useDispatch } from "react-redux";
import "./EditGroupForm.css";
import { Button, Form } from "react-bootstrap";

const EditGroupForm = ({ group }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState(group.name);
	const [description, setDescription] = useState(group.description);
	const [isPublic, setIsPublic] = useState(group.isPublic);
	const [imgURL, setimgURL] = useState(group.imgURL);
	const close = window.document.querySelector("#modal-background");
	const [changedName, setChangedName] = useState(false);

	let id = group.id;
	const deleteCurrentGroup = () => {
		return dispatch(groupActions.deleteGroup({ id }))
			.then((response) => {
				history.push(`/home`);
				return response;
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		if (changedName) {
			return dispatch(groupActions.updateGroupData({ id, name, description, isPublic, imgURL }))
				.then((response) => {
					history.push(`/${response.id}`);
					close.click();
				})
				.catch(async (res) => {
					const data = await res.json();
					if (data.message && data.message === "value too long for type character varying(255)") {
						data.errors = ["Please keep description under 255 characters"];
					}
					if (data.errors && data.errors.includes("name must be unique"))
						data.errors[data.errors.indexOf("name must be unique")] =
							"Cool Name! But someone already used that name. Please pick another one.";
					if (data && data.errors) setErrors(data.errors);
				});
		} else
			return dispatch(groupActions.updateGroupData({ id, description, isPublic, imgURL }))
				.then((response) => {
					history.push(`/${response.id}`);
					close.click();
				})
				.catch(async (res) => {
					const data = await res.json();
					if (data.message && data.message === "value too long for type character varying(255)") {
						data.errors = ["Please keep description under 255 characters"];
					}
					if (data && data.errors) setErrors(data.errors);
				});
	};

	return (
		<Form onSubmit={handleSubmit} className="EditGroupForm__Form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicName">
				<Form.Label>Enter Group Name Here</Form.Label>
				<Form.Control
					type="text"
					value={name}
					onChange={(e) => {
						setChangedName(true);
						setName(e.target.value);
					}}
					required
					placeholder="Group Name Here..."
				/>
			</Form.Group>
			<Form.Group controlId="Form.ControlTextarea">
				<Form.Label>Enter Group Description Here</Form.Label>
				<Form.Control
					as="textarea"
					rows={10}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Group Description Here...                                                                                                For Example:                                                                                            -What will the Group do?                                                             -What kind of people are you hoping will join? "
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.File id="FormControlFile1" label="Optional Group Image CURRENTLY BROKEN! NEED TO ADD AWS" />
			</Form.Group>
			<Form.Group controlId="formBasicName">
				<Form.Label>Optional Image URL </Form.Label>
				<Form.Control
					type="url"
					value={imgURL}
					onChange={(e) => setimgURL(e.target.value)}
					placeholder="Image URL..."
				/>
			</Form.Group>
			<Form.Group controlId="formBasicCheckbox">
				<Form.Check
					type="checkbox"
					label="Make Group Private"
					checked={!isPublic}
					onChange={() => {
						setIsPublic(!isPublic);
					}}
				/>
			</Form.Group>
			<Button variant="dark" type="submit">
				Update Your Group!
			</Button>
			<Button variant="danger" style={{ marginLeft: "120px" }} onClick={() => deleteCurrentGroup(id)}>
				Delete Your Group!
			</Button>
		</Form>
	);
};
export default EditGroupForm;
