import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_MACHINE,GET_METER_DETAILS,DELETE_METER_DETAILS,UPDATE_MACHINE_DETAIL,DELETE_MULTIPLE_METER_DETAILS}  from '../actionCreators/index'


  
export  function addMeter(meterDetailId,flatDetailId){
    const request= axios.post(`${URN}/meter `,{flatDetailId,meterDetailId} ,{headers:authHeader()})
    return{
        type :ADD_MACHINE,
        payload:request
    }
}
export  function viewMeter(){
    const request= axios.get(`${URN}/meter`,{headers:authHeader()}).then(response=> response.data)
    return{
        type :GET_METER_DETAILS,
        payload:request
    }
}
export function deleteMeter(meterId,isActive){
    const request = axios.put(`${URN}/meter/delete/` +meterId,{ isActive }, {headers:authHeader()})
    return{
        type:DELETE_METER_DETAILS,
        payload:request
    }
}
export function updateMeter( meterId,flatDetailId,meterDetailId){
    const request =axios.put(`${URN}/meter/`+meterId,{flatDetailId,meterDetailId},{headers:authHeader()})
    return{
        type:UPDATE_MACHINE_DETAIL,
        payload:request
    }
}
export function deleteSelectedMeterMasterDetails(ids){
    const request = axios.put(`${URN}/meter/delete/deleteSelected`, {ids}, {headers: authHeader()})
    .catch(err => err)

    return {
        type: DELETE_MULTIPLE_METER_DETAILS,
        payload: request
    }
}