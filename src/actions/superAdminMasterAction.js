import axios from 'axios';
import { authHeader } from '../helper/authHeader';

import{URN,ADD_USER,UPDATE_USER,GET_ROLES,GET_USERS,DELETE_USER, DELETE_SELECTED_USERS} from '../actionCreators/index';


export function addUser(values) {
    const request = axios.post(`${URN}/auth/signup`, values, {headers: authHeader() })
                    return {
                        type: ADD_USER,
                        payload: request
                    }
                }

export function getUsers(){
    const request = axios.get(`${URN}/user`,  {headers:authHeader()}).then((response) => response.data)
    .then()

    return {
        type: GET_USERS,
        payload:request
    }
}

export function getRoles(){
    const request = axios.get(`${URN}/user/userRole`, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_ROLES,
        payload:request
    }
}

export function updateUser(userId, roleName, firstName, lastName, userName, email,towerName, contact,towerId){
    const request = axios.put(`${URN}/user/`+ userId, {
        userId, roleName, firstName, lastName, userName, email,towerName, contact,towerId
        }, { headers: authHeader() })
        .then(response => response.data)
    .then(() => this.getUsers())

    return {
        type: UPDATE_USER,
        payload:request
    }
} 

export function deleteUser(userId, isActive){
   const request = axios.put(`${URN}/user/delete/`  + userId, { isActive }, { headers: authHeader() })
    .then((response) => response.data)
    .then(() => this.getUsers())

    return {
        type:DELETE_USER,
        payload:request
    }
}

export function deleteSelectedUsers(ids){
    const request = axios.put(`${URN}/user/delete/deleteSelected`, { ids}, { headers: authHeader() })
    .then((response) => response.data)
    .then(() => this.getUsers());

    return {
        type: DELETE_SELECTED_USERS,
        payload:request
    }
}