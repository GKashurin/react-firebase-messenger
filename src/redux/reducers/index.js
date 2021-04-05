import { combineReducers } from "redux";
import {messagesReducer} from "./messagesReducer";
import {authReducer} from "./authReducer";

const rootReducer = combineReducers(
	{
		messages: messagesReducer,
		auth: authReducer
	}
)
export default rootReducer