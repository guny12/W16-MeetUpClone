import { csrfFetch } from "./csrf";

//action type variables
const SET_SESSION = "session/SET_SESSION";
const REMOVE_SESSION = "session/REMOVE_SESSION";

// action creators
const setSessionUser = (user) => ({
	type: SET_SESSION,
	user,
});

const removeSessionUser = () => ({
	type: REMOVE_SESSION,
});

// thunk action creators
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({ credential, password }),
	});
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const signUp = (user) => async (dispatch) => {
	const { username, email, password } = user;
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", { method: "DELETE" });
	dispatch(removeSessionUser());
	return response;
};

// reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_SESSION:
			newState = Object.assign({}, state);
			newState.user = action.user ? action.user : null;
			return newState;
		case REMOVE_SESSION:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
