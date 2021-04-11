import { csrfFetch } from "./csrf";

// need these so you can update event slice of state when you modify groups (aka cascade deletes)
// import { REMOVE_GROUP, UPDATE_GROUP, SET_GROUP } from "./group";
export const SET_Events = "events/SET_Events";
export const SET_GroupEvents = "events/SET_GroupEvents";

// action creators
const setEvents = (events) => ({
	type: SET_Events,
	payload: events,
});

const setGroupEvents = (groupEvents) => ({
	type: SET_GroupEvents,
	payload: groupEvents,
});

// thunk action creators
export const getEvents = () => async (dispatch) => {
	const response = await csrfFetch("/api/events");
	if (response.ok) {
		const data = await response.json();
		dispatch(setEvents(data));
	}
};

export const getGroupEvents = (groupid) => async (dispatch) => {
	const response = await csrfFetch(`/api/:groupid/${groupid}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(setGroupEvents(data));
	}
};

export const createEvent = (eventData) => async (dispatch) => {
	const response = await csrfFetch("/api/:groupid/:eventid", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getEvents());
		return data;
	}
};

export const joinEvent = (eventData) => async (dispatch) => {
	const response = await csrfFetch("/api/events", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		return data;
	}
};

export const updateEventData = (eventData) => async (dispatch) => {
	const response = await csrfFetch("/api/:groupid/:eventid", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventData),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getEvents());
		return data;
	} else return response;
};

export const deleteEvent = (eventId) => async (dispatch) => {
	const response = await csrfFetch("/api/:groupid/:eventid", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(eventId),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(getEvents());
		return data;
	}
};

// reducer
const initialState = {
	JoinedEvents: {},
	notJoinedEvents: {},
	somePublicEvents: {},
	joinedEventIds: [],
	JoinedUpcomingGroupEvents: {},
	NotJoinedUpcomingGroupEvents: {},
	PreviousEvents: {},
	joinedGroupEventIds: [],
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_Events:
			let {
				joinedUpcomingEvents,
				joinedEventIds,
				notJoinedUpcomingEvents,
				somePublicEvents,
				previousEvents,
			} = action.payload;
			let JoinedUpcomingEvents = joinedUpcomingEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			let NotJoinedEvents = notJoinedUpcomingEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			let SomePublicEvents = somePublicEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			let newPreviousEvents = previousEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			return {
				...eventState,
				JoinedEvents: JoinedUpcomingEvents,
				joinedEventIds: joinedEventIds,
				notJoinedEvents: NotJoinedEvents,
				somePublicEvents: SomePublicEvents,
				PreviousEvents: newPreviousEvents,
			};
		case SET_GroupEvents:
			let {
				joinedUpcomingGroupEvents,
				notJoinedUpcomingGroupEvents,

				joinedGroupEventIds,
			} = action.payload;
			let newJoinedUpcomingGroupEvents = joinedUpcomingGroupEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			let newNotJoinedUpcomingGroupEvents = notJoinedUpcomingGroupEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});

			return {
				...eventState,
				JoinedUpcomingGroupEvents: newJoinedUpcomingGroupEvents,
				NotJoinedUpcomingGroupEvents: newNotJoinedUpcomingGroupEvents,
				joinedGroupEventIds,
			};
		default:
			return eventState;
	}
};

export default eventReducer;
