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

// const updateGroup = (group) => ({
// 	type: UPDATE_GROUP,
// 	payload: group,
// });

// const removeGroup = (group) => ({
// 	type: REMOVE_GROUP,
// 	payload: group,
// });

// thunk action creators
export const getGroups = () => async (dispatch) => {
	const response = await csrfFetch("/api/groups");
	if (response.ok) {
		const data = await response.json();
		dispatch(setGroups(data));
	}
};

export const createGroup = (groupData) => async (dispatch) => {
	const response = await csrfFetch("/api/groups", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setGroups(data));
	}
};

// reducer
const initialState = {
	publicGroups: {},
	privateGroups: {},
	newPublicGroups: {},
	newPrivateGroups: {},
};

const groupReducer = (groupState = initialState, action) => {
	switch (action.type) {
		case SET_GROUP:
			let { publicGroups, privateGroups, newPublicGroups, newPrivateGroups } = action.payload;
			let PublicGroups = publicGroups.reduce((newgroups, group) => {
				return { ...newgroups, [group.id]: group };
			}, {});
			let PrivateGroups = privateGroups.reduce((newgroups, group) => {
				return { ...newgroups, [group.id]: group };
			}, {});
			let NewPublicGroups = newPublicGroups.reduce((newgroups, group) => {
				return { ...newgroups, [group.id]: group };
			}, {});
			let NewPrivateGroups = newPrivateGroups.reduce((newgroups, group) => {
				return { ...newgroups, [group.id]: group };
			}, {});
			return {
				...groupState,
				publicGroups: PublicGroups,
				privateGroups: PrivateGroups,
				newPublicGroups: NewPublicGroups,
				newPrivateGroups: NewPrivateGroups,
			};
		case UPDATE_GROUP:
			return groupState;
		case REMOVE_GROUP:
			return groupState;
		default:
			return groupState;
	}
};

export default groupReducer;
