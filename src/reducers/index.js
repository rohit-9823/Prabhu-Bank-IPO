import { combineReducers } from "redux";
import { userIpoDetailsReducer } from "./userIpoDetailsReducer";

export const rootReducer=combineReducers({
    userIpoDetails:userIpoDetailsReducer
})