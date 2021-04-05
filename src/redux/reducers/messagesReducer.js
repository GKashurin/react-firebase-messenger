// import {ADD_MESSAGE, SET_INITIAL_MESSAGE} from "../actions/actions"
//
// let initialState = []
//
// export const messagesReducer = (state = initialState, action) => {
// 	let newMessages;
//
// 	switch (action.type) {
// 		case SET_INITIAL_MESSAGE:
// 			newMessages = action.payload
// 			return newMessages
//
// 		case ADD_MESSAGE:
// 			newMessages = [...state, action.payload];
// 			return newMessages
//
// 		default: return state
// 	}
// }