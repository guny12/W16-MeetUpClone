import { csrfFetch } from "./csrf";

// need these so you can update event slice of state when you modify groups (aka cascade deletes)
// import { REMOVE_GROUP, UPDATE_GROUP, SET_GROUP } from "./group";
export const SET_Events = "events/SET_Events";

// action creators
const setEvents = (events) => ({
	type: SET_Events,
	payload: events,
});

// thunk action creators
export const getEvents = () => async (dispatch) => {
	const response = await csrfFetch("/api/events");
	if (response.ok) {
		const data = await response.json();
		dispatch(setEvents(data));
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
	previousJoinedEvents: {},
	joinedEventIds: [],
};

const eventReducer = (eventState = initialState, action) => {
	switch (action.type) {
		case SET_Events:
			let { joinedUpcomingEvents, joinedEventIds, notJoinedUpcomingEvents } = action.payload;
			let JoinedUpcomingEvents = joinedUpcomingEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			let NotJoinedEvents = notJoinedUpcomingEvents.reduce((newEvents, event) => {
				return { ...newEvents, [event.id]: event };
			}, {});
			return {
				...eventState,
				JoinedEvents: JoinedUpcomingEvents,
				joinedEventIds: joinedEventIds,
				notJoinedEvents: NotJoinedEvents,
			};
		default:
			return eventState;
	}
};

export default eventReducer;
