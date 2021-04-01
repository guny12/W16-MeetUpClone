import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as groupActions from "../../store/group";
import { useDispatch } from "react-redux";
import "./CreateGroupForm.css";
import { Button, Form } from "react-bootstrap";

const CreateGroupForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [isPublic, setIsPublic] = useState(false);
	const [imgURL, setimgURL] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(groupActions.createGroup({ name, description, isPublic, imgURL }))
			.then((response) => history.push(`/${response.newGroup.id}`))
			.catch(async (res) => {
				const data = await res.json();
				if (data.errors.includes("name must be unique"))
					data.errors[data.errors.indexOf("name must be unique")] =
						"Good choice! But someone already used that name. Please pick another one.";
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<Form onSubmit={handleSubmit} className="CreateGroupForm__Form">
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
					placeholder="Awesome Group Name Here..."
				/>
			</Form.Group>
			<Form.Group controlId="Form.ControlTextarea">
				<Form.Label>Enter Group Description Here</Form.Label>
				<Form.Control
					as="textarea"
					rows={10}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter Good Group Description Here...                                                                                                For Example:                                                                                            What will the Group do? What kind of people are you hoping will join? "
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
					checked={isPublic}
					onChange={() => {
						setIsPublic(!isPublic);
						console.log(isPublic, "IS IT PUBLIC?????");
					}}
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Create Your Group!
			</Button>
		</Form>
	);
};
export default CreateGroupForm;
