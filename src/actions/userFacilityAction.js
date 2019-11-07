import axios from 'axios';
import {authHeader} from '../helper/authHeader';
import {URN,ADD_USER_FACILITY,GET_USER_FACILITY,NOT_IN_USE_FACILITY,UPDATE_USER_FACILITY} from '../actionCreators/index';

export function addUserFacility(facilities){
    console.log(facilities)
    const request = axios.post(`${URN}/user/facility`,{facilities}, {headers:authHeader()})
   
    return {
        type:ADD_USER_FACILITY,
        payload:request
    }
 
}


export function notInFacility(){
    
    const request = axios.get(`${URN}/user/facility/deactivated`, {headers:authHeader()})
   
    return {
        type:NOT_IN_USE_FACILITY,
        payload:request
    }
 
}

export function getUserFacility(){
    
    const request = axios.get(`${URN}/user/facility`, {headers:authHeader()})
   
    return {
        type:GET_USER_FACILITY,
        payload:request
    }
 
}

export function updateUserFacility(facilitiesUser){
    let facilities=facilitiesUser;
    console.log(facilities,"facilities update=============>")
    const request = axios.put(`${URN}/user/facility/update`,{facilities}, {headers:authHeader()})
    
    console.log(request,"result===================>")
   
    return {
        type:UPDATE_USER_FACILITY,
        payload:request
    }
 
}