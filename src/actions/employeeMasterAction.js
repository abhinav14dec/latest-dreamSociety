import {URN,ADD_EMP,GET_EMP,UPDATE_EMP,DELETE_EMP,GET_LOCATION_DETAIL,UPDATE_EMPLOYEE,DELETE_MULTIPLE_EMPLOYEE} from '../actionCreators/index'
import axios from 'axios';
import { authHeader } from '../helper/authHeader';

export function AddEmployee(data){
    
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
const request= axios.post(`${URN}/employee`,data,{headers:authHeader(),config})
  console.log(data,"1232423")
return{
    type:ADD_EMP,
    payload:request
}

}

export const getLocation = cityId => {

    
    const request = axios.get(`${URN}/location/${cityId}`, { headers: authHeader() })
        .then(response => response.data)
        .catch(error =>  error)

    return {
        type: GET_LOCATION_DETAIL,
        payload: request
    }
}

export function ViewEmployee(){
    const request = axios.get(`${URN}/employee`,{headers:authHeader()})
    return{
        type:GET_EMP,
        payload:request
    }
}


export function deleteEmployee(employeeId,isActive){
    const request = axios.put(`${URN}/employee/delete/`+employeeId,{isActive}, {headers:authHeader()} )

    return{
        type:DELETE_EMP,
        payload:request
    }


}


export function updateEmployee(employeeId,data){
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

    const request =axios.put(`${URN}/employee/`+employeeId,data,{headers:authHeader()},config)


    return{
        type:UPDATE_EMPLOYEE,
        payload:request
    }
}

export function deleteMultipleEmployee(ids){
    const request = axios.put(`${URN}/employee/delete/deleteSelected`,{ids}, {headers:authHeader()} ).then(response=>response.data)

    return{
        type:DELETE_MULTIPLE_EMPLOYEE,
        payload:request
    }


}