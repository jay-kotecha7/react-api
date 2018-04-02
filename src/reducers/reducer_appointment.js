import { FETCH_APPOINTMENTS } from "../actions/index";

export default function AppointmentReducer(state=[],action) {
    switch(action.type) {
        case FETCH_APPOINTMENTS: {
            console.log('in case fetch appointment',)
            return action.payload.data
        }
        default:
            return state;
    }
}