import {FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS, LOG_IN, LOG_OUT} from "../actions/actions";

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	isLoggedIn: false,
	error: null,
};

export const authReducer = (state = initialState, action) => {
	console.log(action)

	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				...action.payload.user,
				isLoggedIn: true,
			}
		}
		case FETCH_USERS_SUCCESS: {
			return {
				...state,
				isLoggedIn: true
			}
		}
		case FETCH_USERS_FAILURE: {
			return {
				...state,
				error: action.payload.error
			}
		}
		case LOG_OUT: {
			return {
				isLoggedIn: false
			}
		}
		default:
			return state;
	}
}
