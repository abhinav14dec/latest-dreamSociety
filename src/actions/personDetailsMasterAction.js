import axios from 'axios'; 
import {URN, GET_TOWER,GET_FLAT, GET_ROLES ,ADD_PERSON,GET_PERSON,DELETE_PERSON,UPDATE_PERSON1,DELETE_MULTIPLE_PERSON } from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';


export function getTower(){
           
    const request = axios.get(`${URN}/tower`, {headers:authHeader()}  )
    .then(response=>response.data)
    return{

       type:GET_TOWER,
       payload:request

    }

}
    export function getFlat(){
        const request = axios.get(`${URN}/flat`,{headers:authHeader()})
        .then(response=>response.data)

        return{
            type:GET_FLAT,
            payload:request
        }
    }


    export function  getRoles(){
        const request =axios.get(`${URN}/user/userRole`,{headers:authHeader()})
      .then(response=>response.data)
      return{
          type:GET_ROLES,
          payload:request
      }
     }


export function addPerson( userName,email,towerId,roles){
         
      const request =axios.post(`${URN}/auth/signup`,{userName,email,towerId,roles},{headers:authHeader()}) 
      .then(response => response.data)

      .then(viewPerson());
  
         return{
             type:ADD_PERSON,
             payload:request
         }
     }
     export function viewPerson(){
         
        const request = axios.get(`${URN}/person`,{headers:authHeader()})
        .then(response=>response.data)
        console.log(request,"res");
        return{
            type:GET_PERSON,
            payload:request
           
        }
 
    }

    export function deletePerson(userId,isActive){
        const request= axios.put(`${URN}/user/delete/`+userId,{isActive},{headers:authHeader()}).then()
        return{
            type:DELETE_PERSON,
            payload:request
        }
    }

    export function updatePerson( userId,userName,email,towerId,roleName){
       
       console.log('shubhu',userId,userName,email)
        const request=axios.put(`${URN}/user/` +userId, { userId,userName,email,towerId,roleName},
        { headers: authHeader() }).then((response)=>{

        })
        return{
            type:UPDATE_PERSON1,
            payload :request
        }
    }



   export function deleteMultiplePerson(ids){
       const request = axios.put(`${URN}/user/delete/deleteSelected` ,{ids},  { headers: authHeader() }).then((response)=>{

    })
    return{
        type:DELETE_MULTIPLE_PERSON ,
        payload :request
    }
   }