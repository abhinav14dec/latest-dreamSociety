import { GET_SUB_MAINTENANCE,GET_SUB_MAINTENANCE_DETAILS,GET_MAINTENANCE_TYPE,UPDATE_SUB_MAINTENANCE_DETAILS,
     POST_SUB_MAINTENANCE,DELETE_SUB_MAINTENANCE_DETAILS,
     DELETE_MULTIPLE_SUB_MAINTENANCE_DETAILS, URN } from '../actionCreators/index';
import axios from 'axios';
import { authHeader } from '../helper/authHeader';

export function getMaintenanceSubSize(){
    const request = axios.get(`${URN}/size`, {headers: authHeader() })
    .then((response) => response.data);

    return{
        type: GET_SUB_MAINTENANCE,
        payload: request
    }
}

export function postMaintenanceSubMaster(values){
    const request = axios.post(`${URN}/maintenanceType`, values, {headers: authHeader()})
    return {
        type: POST_SUB_MAINTENANCE,
        payload: request
    }
}

export function getMaintenanceSubSizeDetails(){
    const request = axios.get(`${URN}/maintenanceType`, {headers: authHeader()})
    .then((response) => response.data);
    return {
        type: GET_SUB_MAINTENANCE_DETAILS,
        payload: request
    }
}

export function getMaintenanceType(){
    const request = axios.get(`${URN}/maintenance`, {headers: authHeader()})
    .then((response) => response.data);
    return{
        type: GET_MAINTENANCE_TYPE,
        payload:request
    }
}

export function deleteMaintenanceSubMasterDetail(maintenanceTypeId){
    const data = {
        isActive: false
    }
    const request = axios.put(`${URN}/maintenanceType/delete/`+ maintenanceTypeId, data, {headers: authHeader()})
    .then(() => this.getMaintenanceSubSizeDetails())
    return {
        type: DELETE_SUB_MAINTENANCE_DETAILS,
        payload: request
    }
}

export function deleteSelectedMaintenanceSubMasterDetail(ids){
    const request = axios.put(`${URN}/maintenanceType/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .then(() => this.getMaintenanceSubSizeDetails())
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_SUB_MAINTENANCE_DETAILS,
        payload: request
    }
}

export function updateMaintenanceSubMasterDetail(maintenanceTypeId,category, sizeType, rate, startDate, endDate, maintenanceId, sizeId ){
    const request = axios.put(`${URN}/maintenanceType/` +maintenanceTypeId, {category, sizeType, rate, startDate, endDate, maintenanceId, sizeId}, {headers: authHeader()})
    .then(() => this.getMaintenanceSubSizeDetails())
    return {
        type: UPDATE_SUB_MAINTENANCE_DETAILS,
        payload: request
    }
}