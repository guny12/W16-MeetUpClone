import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as eventActions from "../../store/event";
import { useDispatch } from "react-redux";
import "./CreateEventForm.css";
import { Button, Form } from "react-bootstrap";
import img from "../../images/CookOffPic.png";

const CreateEventForm = ({ group }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [eventType, setEventType] = useState("");
	const [eventDate, setEventDate] = useState(Date.now());
	const [availableSpots, setAvailableSpots] = useState(0);
	const [imgURL, setimgURL] = useState(img);
	const close = window.document.querySelector("#modal-background");
	const groupId = group.id;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		return dispatch(
			eventActions.createEvent({ name, groupId, description, imgURL, location, eventDate, eventType, availableSpots })
		)
			.then((response) => {
				setTimeout(() => {
					history.push(`/${response.groupId}/${response.newEvent.id}`);
					close.click();
				}, 500);
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
		<Form onSubmit={handleSubmit} className="EditEventForm__Form">
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicName">
				<Form.Label>Enter Event Name Here</Form.Label>
				<Form.Control
					type="text"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					required
					placeholder="Event Name Here..."
				/>
			</Form.Group>
			<Form.Group controlId="formBasicName">
				<Form.Label>Enter Event Location Here</Form.Label>
				<Form.Control
					type="text"
					value={location}
					onChange={(e) => {
						setLocation(e.target.value);
					}}
					placeholder="Event Location Here..."
				/>
			</Form.Group>
			<Form.Group controlId="Form.ControlTextarea">
				<Form.Label>Enter Event Description Here</Form.Label>
				<Form.Control
					as="textarea"
					rows={2}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Event Description Here...                                                                                                For Example:                                                                                            -What will people do at the event?                                                             -What kind of people are you hoping will join? "
					required
				/>
			</Form.Group>
			<Form.Group controlId="formBasicDate">
				<Form.Label>Enter Event Date and Time Here</Form.Label>
				<Form.Control
					type="datetime-local"
					value={eventDate}
					onChange={(e) => {
						setEventDate(e.target.value);
					}}
					placeholder="Event Date and Time Here..."
					required
				/>
			</Form.Group>
			<Form.Group controlId="formBasicType">
				<Form.Label>Enter Event Type Here</Form.Label>
				<Form.Control
					type="text"
					value={eventType}
					onChange={(e) => {
						setEventType(e.target.value);
					}}
					placeholder="Event Type Here..."
					required
				/>
			</Form.Group>
			<Form.Group controlId="formBasicType">
				<Form.Label>Enter Total Number of Attendees Allowed Here</Form.Label>
				<Form.Control
					type="number"
					value={availableSpots}
					onChange={(e) => {
						setAvailableSpots(e.target.value);
					}}
					placeholder="Total Number of Attendees Allowed Here..."
					required
				/>
			</Form.Group>
			<Form.Group>
				<Form.File id="FormControlFile1" label="Optional- Group Image CURRENTLY BROKEN! NEED TO ADD AWS" />
			</Form.Group>
			<Form.Group controlId="formBasicName">
				<Form.Label>Optional- Image URL </Form.Label>
				<Form.Control
					type="text"
					value={imgURL}
					onChange={(e) => setimgURL(e.target.value)}
					placeholder="Image URL..."
				/>
			</Form.Group>
			<Button variant="dark" type="submit">
				Create Your Event!
			</Button>
		</Form>
	);
};
export default CreateEventForm;
