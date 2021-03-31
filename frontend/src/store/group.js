import { csrfFetch } from "./csrf";

//action type variables
// you need to export these, so that when you run these actions, you will update the EVENTs as well
export const SET_GROUP = "group/SET_GROUP";
export const UPDATE_GROUP = "group/UPDATE_GROUP";
export const REMOVE_GROUP = "group/REMOVE_GROUP";

// action creators
const setGroups = (groups) => ({
	type: SET_GROUP,
	payload: groups,
});

const updateGroup = (group) => ({
	type: UPDATE_GROUP,
	payload: group,
});

const removeGroup = (group) => ({
	type: REMOVE_GROUP,
  payload: group
});

// thunk action creators
export const getGroups = ({group, userId}) => async (dispatch) => {
	const response = await csrfFetch("/api/group")
	const data = await response.json();
	dispatch(setGroups(data.));
	return response;
};

const initialState = {};

const sessionReducer = (groupState = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_GROUP:
			return newState;
    case UPDATE_GROUP:
        return newState;
		case REMOVE_GROUP:
      return newState;
		default:
			return groupState;
	}
};

export default sessionReducer;
