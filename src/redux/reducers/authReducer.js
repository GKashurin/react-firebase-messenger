import {FETCH_USERS_FAILURE, LOG_IN, LOG_OUT} from "../actions/authActions";

const initialState = {
	firstName: '',
	secondName: '',
	email: '',
	isLoggedIn: false,
	error: null,
	uid: ''
};

export const authReducer = (state = initialState, action) => {

	switch (action.type) {
		case LOG_IN: {
			return {
				...state,
				...action.payload,
				isLoggedIn: true,
			}
		}

		case FETCH_USERS_FAILURE: {
			return {
				...state,
				error: action.payload
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
