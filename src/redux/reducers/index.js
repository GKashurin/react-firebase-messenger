import { combineReducers } from "redux";
import {messagesReducer} from "./messagesReducer";
import {authReducer} from "./authReducer";
import {usersReducer} from "./usersReducer";

const rootReducer = combineReducers(
	{
		messages: messagesReducer,
		auth: authReducer,
		users: usersReducer
	}
)
export default rootReducer