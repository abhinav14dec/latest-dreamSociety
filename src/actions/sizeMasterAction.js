import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,ADD_SIZE,GET_SIZE,DELETE_SIZE, UPDATE_SIZE1,DELETE_MULTIPLE_SIZE} from '../actionCreators/index';
export   function AddSize(sizeType){
 
    const request =axios.post(`${URN}/size/`,{sizeType},{headers:authHeader()})
     .then(displaySize())
      return{  
          type:ADD_SIZE,
          payload: request
      }

}

export function displaySize(){
    const request = fetch(`${URN}/size`,{headers:authHeader()},{method:'GET'})
    .then(response => response.json())
    return {
        type:GET_SIZE,
        payload:request
    }
}

export function deleteSize(sizeId,isActive){
    const request =axios.put(`${URN}/size/delete/`+sizeId,{isActive}, { headers: authHeader() }).then()
    return{
        type:DELETE_SIZE,
        payload:request
    }
}

export function updateSize(sizeId,sizeType){
    const request =axios.put(`${URN}/size/` +sizeId, {
      sizeType
    }, { headers: authHeader() }).then((response)=>{

    })
    return{
        type:UPDATE_SIZE1,
        payload:request
    }
}

export function deleteMultipleSize(ids){
    const request =axios.put(`${URN}/size/delete/deleteSelected` ,{ids}, { headers: authHeader() }).then(response=>response.data)
    return{
        type:DELETE_MULTIPLE_SIZE,
        payload:request
    }
}