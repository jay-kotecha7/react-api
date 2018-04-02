import axios from 'axios';
import setAuthorizationToken from './Set_Authorization';
import jwt_decode from 'jwt-decode';
import {store} from '../../src/index';
export const CREATE_USER='create_user';
export const ADD_ROLE ='add_role'
export const SET_CURRENT_USER='select_current_user';
export const FETCH_USERS= 'fetch_user';
export const SET_UP_BUS= 'set_up_bus';
export const FETCH_BUSINESSES='fetch_businesses'
export const SELECTED_BUSINESS='selected_business'
export const CREATE_APP='create_app'
export const FETCH_APPOINTMENTS='fetch_appointments'

const url=`http://localhost:1337`


export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export function setBusiness(result){
    return {
        type: SET_UP_BUS,
        result
    }
}


export function createUser(data,callback) {
    const request = axios.post(`${url}/user/createUser`, data);
    request.then(result => {
        var jwt = result.data;
        localStorage.setItem('jwtToken', jwt);
        setAuthorizationToken(localStorage.jwtToken);
        const pdata = jwt_decode(localStorage.jwtToken);
        store.dispatch(setCurrentUser(pdata));
    },callback());
}


export function addRole(values){
    const request=axios.post(`${url}/role/addRoles`,values);
        request.then((result)=>{
          //  console.log('Post data:',result);
            return {
                type: ADD_ROLE,
                payload: result
            }
        })
}

export function fetchUser(id) {
    const request = axios.get(`${url}/user/fetchUsers/${id}`);
        request.then((result) => {
        //    console.log('Users:', result.data);
            store.dispatch({
                type: FETCH_USERS,
                payload: result
            })
        })
}

export function setupBusiness(data,callback){
    const request = axios.post(`${url}/user/setupBusiness/${data.id}`,data);
    request.then(result=>{
        store.dispatch(setBusiness(result))
        },callback());
}

export function logout(callback){
    console.log('inside action/logout')
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        store.dispatch(setCurrentUser(),callback());

}

export function fetchBusinessList(value) {
    const request = axios.get(`${url}/user/listOfBusiness/${value}`);
    request.then( (result) => {
        // return dispatch => dispatch({ type: FETCH_BUSINESSES, payload: result });
        store.dispatch({
        type: FETCH_BUSINESSES,
        payload: result
        })
    })
}
     
export function selectBusiness(business){
    store.dispatch({ type: SELECTED_BUSINESS, payload: business });
}

export function createAppt(data) {
    const request = axios.post(`${url}/appt/create`,data);
        request.then( (result) => {
            type: CREATE_APP
            //push callback();
        }
    )
}
export async function fetchAllAppointments(){
    const request = axios.get(`${url}/appt/getAllAppointments`);
    request.then( (result) => {
    store.dispatch({ type: FETCH_APPOINTMENTS, payload: result });
    } )
     
    }