import { CREATE_USER } from '../actions/index'

export default function LoginReducer(state={}, action){
    
    switch(action.type) {
        
        case CREATE_USER: {
            console.log(action.payload.data);
            return [action.payload.data, ...state];
        }
        default:
        return state;

    }
}