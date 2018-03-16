import { SET_UP_BUS } from '../actions/index'
 
export default function BusinessReducer(state=[], action){
    switch(action.type){
        case SET_UP_BUS: {
            console.log('Reducer_Business data:',action.payload.data);
            return [...state,action.payload.data];
        }
        default:
            return state;
    }
}