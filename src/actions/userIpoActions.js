import { httpClient } from "../constants/httpClient"
import { notify } from "../constants/notify"

export const userIpoActionTypes={
    SET_IPO_DETAILS:"SET_IPO_DETAILS",
    SET_PERSONAL_DETAILS:"SET_PERSONAL_DETAILS",
    SUBMIT_IPO:"SUBMIT_IPO",
    SET_IPO_META_DETAILS:"SET_IPO_META_DETAILS",
}

export const setIpoDetails=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:userIpoActionTypes.SET_IPO_DETAILS,
            payload:params
        })
    }
}
export const setPersonDetails=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:userIpoActionTypes.SET_PERSONAL_DETAILS,
            payload:params
        })
    }
}
export const setIpoMetaDetails=(params)=>{
    return(dispatch)=>{
        dispatch({
            type:userIpoActionTypes.SET_IPO_META_DETAILS,
            payload:params
        })
    }
}


