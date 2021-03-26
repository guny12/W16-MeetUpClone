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

// reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_SESSION:
			newState = Object.assign({}, state);
			newState.user = action.user;
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
