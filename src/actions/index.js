import axios from 'axios';
import setAuthorizationToken from './Set_Authorization';
import jwt_decode from 'jwt-decode';
import {store} from '../../src/index';
export const CREATE_USER='create_user';
export const ADD_ROLE ='add_role'
export const SET_CURRENT_USER='select_current_user';
export const FETCH_USERS= 'fetch_user';
export const SET_UP_BUS= 'set_up_bus';
const url=`http://localhost:1337`


export function setCurrentUser(user){
   // console.log('set current user');
  //  console.log('Before Action SET_CURRENT_USER')
    return {
        type: SET_CURRENT_USER,
        user
    }
}


export function createUser(data) {
   // console.log('in createUser', data);
        const request = axios.post(`${url}/user/createUser`, data);
        request.then(result => {
          //  console.log('Call back for Create User , result data', result)
            var jwt = result.data;
            localStorage.setItem('jwtToken', jwt);
            setAuthorizationToken(localStorage.jwtToken);
           // console.log('Decoded Data', jwt_decode(jwt));
            const pdata = jwt_decode(localStorage.jwtToken);
            //return (dispatch)=>{
            store.dispatch(setCurrentUser(pdata));
            //    }
        });

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

export function setupBusiness(data){
   // console.log('before action data',data);
    const request = axios.post(`${url}/user/setupBusiness/${data.id}`,data);
    request.then((result) => {
      //  console.log('Business: ', result.data);
        return {
            type: SET_UP_BUS,
            payload: result
        }
    })
}

export function logout(){
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        store.dispatch(setCurrentUser({}));
    }
}