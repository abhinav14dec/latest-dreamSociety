import axios from 'axios';
import { authHeader } from '../helper/authHeader';
import{URN,DEACTIVATE_MEMBER,GET_DEACTIVE_LIST,GET_ROLES1,DEACTIVATE_MULTIPLE_MEMBER,DELETE_MULTIPLE_MEMBER1, DELETE_SELECTED_USERS,GET_ACTIVE_LIST,RELEASE_RESOURCE} from '../actionCreators/index';

export function getRoles(){
    const request = axios.get(`${URN}/user/role/activate`, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_ROLES1,
        payload:request
    }
}

export function showActiveList(values){
    console.log(values)
    const request = axios.get(`${URN}/user/active/${values}` , {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_ACTIVE_LIST,
        payload:request
    }
}

export function deactivateMember(userId,type){
    console.log(userId,type)
    const request = axios.put(`${URN}/user/deactivate/user`,{userId,type} , {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: DEACTIVATE_MEMBER,
        payload:request
    }
}

export function deleteSelectedActiveMembers(ids,type){
    console.log(ids,type)
    const request = axios.put(`${URN}/user/multiple/deactivate`,{ids,type} , {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: DEACTIVATE_MULTIPLE_MEMBER,
        payload:request
    }
}



export function showDeactiveList(values){
    console.log(values)
    const request = axios.get(`${URN}/user/deactive/${values}` , {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_DEACTIVE_LIST,
        payload:request
    }
}

export function  activateMember(userId,type){
    console.log(userId,type)
    const request = axios.put(`${URN}/user/activate`, {userId,type}, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: GET_DEACTIVE_LIST,
        payload:request
    }
}

export function deleteSelectedDeactivatedMember(ids,type){
    console.log(ids,type)
    const request = axios.put(`${URN}/user/multiple/activate`, {ids,type}, {headers:authHeader()})
    .then((response =>response.data))

    return {
        type: DELETE_MULTIPLE_MEMBER1,
        payload:request
    }
}

export function releaseResource(userId,type){
    console.log(userId,type)
    const request= axios.put(`${URN}/release/resources`,{userId,type},{headers:authHeader()})
    .then((response =>response.data))
    return{
        type:RELEASE_RESOURCE,
        payload:request
    }

}