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

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		let id = group.id;

		return dispatch(groupActions.updateGroupData({ id, name, description, isPublic, imgURL }))
			.then((response) => {
				console.log(response, "RESPONSE====================");
				history.push(`/${response.id}`);
				close.click();
				return response;
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data.errors.includes("name must be unique"))
					data.errors[data.errors.indexOf("name must be unique")] =
						"Cool Name! But someone already used that name. Please pick another one.";
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
					onChange={(e) => setName(e.target.value)}
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
			<Form>
				<Form.Group>
					<Form.File id="FormControlFile1" label="Optional Group Image CURRENTLY BROKEN! NEED TO ADD AWS" />
				</Form.Group>
			</Form>
			<Form.Group controlId="formBasicName">
				<Form.Label>Optional Image URL </Form.Label>
				<Form.Control
					type="text"
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
		</Form>
	);
};
export default EditGroupForm;
