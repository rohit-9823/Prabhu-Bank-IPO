import { userIpoActionTypes } from "../actions/userIpoActions";

export const userIpoDetailsReducer=(state,action)=>{
    switch (action.type) {
        case userIpoActionTypes.SET_IPO_DETAILS:
            return {
                ...state,
                ipoDetails:action.payload
            }
        case userIpoActionTypes.SET_PERSONAL_DETAILS:
            return {
                ...state,
                personalDetails:action.payload
            }
        case userIpoActionTypes.SET_IPO_META_DETAILS:
            return {
                ...state,
                ipoMetaDetails:action.payload
            }
            
        default:
            return {
                ...state
            }
    }
}