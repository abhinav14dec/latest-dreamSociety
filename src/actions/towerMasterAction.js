
import {authHeader} from '../helper/authHeader'
import axios from 'axios';
import {URN,ADD_TOWER,GET_TOWER,UPDATE_TOWER,DELETE_TOWER,DELETE_MULTIPLE_TOWER}  from '../actionCreators/index' 


export  default function AddTower(towerName,floorIds,floors){
    console.log(towerName,floorIds,floors)

    const request = axios.post(`${URN}/tower`,{towerName,floorIds,floors},{headers:authHeader()},
     {method: 'POST'})
    .then(viewTower())
   console.log(request);
   
    return{
        type:  ADD_TOWER,
        payload: request
    }
}


export function viewTower(){
const request  = fetch(`${URN}/towerFloor`,  {headers:authHeader()},{method: 'GET'})
.then(response => response.json())
return{
      type: GET_TOWER,
      payload: request
}
}

export function deleteTower(towerId,isActive){
    const request=  axios.put(`${URN}/tower/delete/` + towerId, {isActive},{ headers: authHeader() })
        .then(response=>response.data)
    return {
        type: DELETE_TOWER,
        payload:request
    }
}

export function updateTower(towerId,towerName,floors){
    console.log(towerId,towerName,floors)
    const request =
    axios.put(`${URN}/towerFloor/update/` +towerId, {
      towerName,floors
    }, { headers: authHeader() }).then() 
    return{
        type:UPDATE_TOWER,
        payload:request
    }
}


export function deleteMultipleTower(ids){
    const request =axios.put(`${URN}/tower/delete/deleteSelected`,{ids},{headers:authHeader()})
    .then(response => response.data)
    return{
          type: DELETE_MULTIPLE_TOWER,
          payload: request
    }
}