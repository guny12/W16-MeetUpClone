import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { Button, Form } from "react-bootstrap";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Username or Email</Form.Label>
				<Form.Control
					type="text"
					autoComplete="username"
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
					placeholder="Enter Username or Email"
				/>
			</Form.Group>
			<Form.Group controlId="formGroupPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Enter Password"
				/>
			</Form.Group>
			<Button variant="primary" type="submit">
				Log In
			</Button>
		</Form>
	);
};
export default LoginFormPage;
