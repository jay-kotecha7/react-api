import { combineReducers } from 'redux';
import {reducer as formReducer } from 'redux-form'
import LoginReducer from './reducer_login';
import BusinessReducer from "./reducer_business";
 
//import AppointmentReducer from './reducer_Appointment';
//import ServiceReducer from './reducer_Service';
import UserReducer from './reducer_user'
//import BookAppReducer from './reducer_BookApp';

const rootReducer = combineReducers({
    form : formReducer,
    userData: LoginReducer,
    business: BusinessReducer,
  //  appointment: AppointmentReducer,
  //  service: ServiceReducer,
    user: UserReducer,
  //  bookApp: BookAppReducer,
});
 
export default rootReducer;