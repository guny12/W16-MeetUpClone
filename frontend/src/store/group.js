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
	const response = await csrfFetch("/api/:groupid", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getGroups());
		return data;
	}
};

export const joinGroup = (groupData) => async (dispatch) => {
	const response = await csrfFetch("/api/groups", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	}
};

export const updateGroupData = (groupData) => async (dispatch) => {
	const response = await csrfFetch("/api/:groupid", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(groupData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getGroups());
		return data;
	}
};

export const deleteGroup = (groupId) => async (dispatch) => {
	const response = await csrfFetch("/api/:groupid", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(groupId),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getGroups());
		return data;
	}
};

// reducer
const initialState = {
	publicGroups: {},
	privateGroups: {},
	newPublicGroups: {},
	newPrivateGroups: {},
	joinedGroupIds: [],
};

const groupReducer = (groupState = initialState, action) => {
	switch (action.type) {
		case SET_GROUP:
			let { publicGroups, privateGroups, newPublicGroups, newPrivateGroups, joinedGroupIds } = action.payload;
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
				joinedGroupIds: joinedGroupIds,
			};
		default:
			return groupState;
	}
};

export default groupReducer;
