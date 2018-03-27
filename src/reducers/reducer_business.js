import { SET_UP_BUS,FETCH_BUSINESSES,SELECTED_BUSINESS } from '../actions/index'
 
export default function BusinessReducer(state=[], action){
    switch(action.type){
        case SET_UP_BUS: {
            console.log('Reducer_Business data:',action.data);
            return [...state,action.data];
        }
        case FETCH_BUSINESSES: {
            //return [...state, action.payload.data]
            return action.payload.data
            }
            case SELECTED_BUSINESS: {
            //console.log('selected_buisness', action.payload)
            return action.payload;
            }
        default:
            return state;
    }
}