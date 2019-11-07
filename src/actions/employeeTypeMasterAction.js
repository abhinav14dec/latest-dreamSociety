import { authHeader } from "../helper/authHeader";
import axios from 'axios';
import {URN,ADD_EMPLOYEE,GET_EMPLOYEE_TYPE,GET_EMPLOYEE,GET_EMPLOYEE_WORK_TYPE,UPDATE_EMPLOYEE,DELETE_EMPLOYEE,DELETE_MULTIPLE_EMPLOYEE_TYPE} from '../actionCreators/index';



export function  AddEmployee(serviceType,employeeTypeId,employeeWorkTypeId){
    console.log("hede");
    const request =axios.post(`${URN}/employeeDetail`,{serviceType,employeeTypeId,employeeWorkTypeId},{headers:authHeader()})
    .then()
    console.log(request,"drfde")
return{
    type:ADD_EMPLOYEE,
    payload:request
}

}

export function  getEmployee(){
    const request =axios.get(`${URN}/employeeDetail`,{headers:authHeader()})
    .then(res=>res.data)
    return{
        type:GET_EMPLOYEE,
        payload:request
    }
}



export  function getEmployeeType(){
    const request = axios.get(`${URN}/employeeType`,{headers:authHeader()})
    .then(res=>res.data)
    return{
        type:GET_EMPLOYEE_TYPE,
        payload:request
    }
}

export  function getEmployeeWorkType(){
    console.log('hi');
    const request =axios.get(`${URN}/employeeWorkType`,{headers:authHeader()})
    .then(res=>res.data)
    return{
        type:GET_EMPLOYEE_WORK_TYPE,
        payload:request
    }
}

export function updateEmployee(employeeDetailId,employeeTypeId, employeeWorkTypeId, serviceType){
    const request =axios.put(`${URN}/employeeDetail/`+employeeDetailId,{employeeTypeId, employeeWorkTypeId, serviceType},{headers:authHeader()})


    return{
        type:UPDATE_EMPLOYEE,
        payload:request
    }
}
export function deleteEmployee(employeeDetailId,isActive){
    const request = axios.put(`${URN}/employeeDetail/delete/`+employeeDetailId,{isActive}, {headers:authHeader()} )

    return{
        type:DELETE_EMPLOYEE,
        payload:request
    }


}



export function deleteMultipleEmployee(ids){
    const request = axios.put(`${URN}/employeeDetail/delete/deleteSelected`,{ids}, {headers:authHeader()} ).then(response=>response.data)

    return{
        type:DELETE_MULTIPLE_EMPLOYEE_TYPE,
        payload:request
    }


}