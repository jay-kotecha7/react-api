import axios from 'axios';

export const CREATE_USER='create_user';

const url=`http://localhost:1337`

export function createUser(data){
    const request=axios.post(`${url}/user/createUser`,data);
    request.then((result)=>{
        console.log('Login Data',result.data);
        return {
            type: CREATE_USER,
            payload: result
        }
    })
     
}