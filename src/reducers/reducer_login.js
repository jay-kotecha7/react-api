
import { SET_CURRENT_USER } from "../actions/index";
export default function LoginReducer(state={ isAuthenticated : false, user:{}}, action){

    switch(action.type) {

        
        case SET_CURRENT_USER: {
           console.log('Inside Case set current user', localStorage.getItem('jwtToken'))
           console.log('action-user', action.user)
            return {
            isAuthenticated: localStorage.getItem('jwtToken') ? true : false,
            user: action.user
            }
        }

        default : 
            return state;

    
    } 
}