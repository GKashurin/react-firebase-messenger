import {GET_USERS} from "../actions/usersActions";
import {ADD_MESSAGE, GET_MESSAGES} from "../actions/messageActions";

const initialState = {
	users: [],
	conversations: []
};

export const usersReducer = (state = initialState, action) => {

	switch (action.type) {
		case GET_USERS: {
			return {
				...state,
				users: action.payload
			}
		}
		case ADD_MESSAGE: {
			return {
				...state,
				conversations: action.payload
			}
		}
		case GET_MESSAGES: {
			return {
				...state,
				conversations: action.payload
			}
		}

		default:
			return state;
	}
}
