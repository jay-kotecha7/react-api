import { ADD_ROLE } from "../actions/index";
import {FETCH_USERS} from '../actions/index'
import _ from 'lodash';


export default function(state=[], action) {
    switch(action.type) {

        case ADD_ROLE:{
          //  console.log(action.payload.data);
            return [action.payload.data, ...state];
        }

        case FETCH_USERS: {
            return _.first(action.payload.data)
            //return _.mapKeys(action.payload.data, 'userId');
            // return [...state,action.payload.data];
        }

        default:
            return state;   
    }
}
