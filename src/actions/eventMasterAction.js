import {authHeader} from '../helper/authHeader';
import axios from 'axios';
import {URN,GET_EVENT,ADD_EVENT, GET_EVENT_ORGANISER, DELETE_EVENT,UPDATE_EVENT,DELETE_MULTIPLE_EVENT} from '../actionCreators/index';


export function ViewEvent(){
    console.log('byrr');
    const request = axios.get(`${URN}/event`,{headers:authHeader()})
    .then(response=> response.data)
    return{
        type:GET_EVENT,
        payload:request
    }
    }
    
    export function GetEventOrganiser(){
        const request = axios.get(`${URN}/eventOrganiser`,{headers:authHeader()})
        .then(response=> response.data )
        return{
            type: GET_EVENT_ORGANISER,
            payload:request
        }
    }
    
    
    
    export  function AddEvent(eventType,eventName, eventOrganiser){
        const request= axios.post(`${URN}/event`,{eventType,eventName, eventOrganiser},{headers:authHeader()}).then(ViewEvent())
        return{
            type:ADD_EVENT,
            payload:request
        }
    }
    export function deleteEvent(eventId,isActive){

        const request = 
          axios.put(`${URN}/event/delete/` + eventId, { isActive }, { headers: authHeader() }).then((response) => {
                       
                        

                }) 
                return{
                    type:DELETE_EVENT,
                    payload:request
                }
    }
    export function updateEvent( eventId, eventType, eventName, eventOrganiser, userId ){
   console.log( eventId, eventType, eventName, eventOrganiser, userId );
        const request =
        axios.put(`${URN}/event/`+eventId,{ userId, eventType, eventName, eventOrganiser },{headers:authHeader()}).then((response)=>{

        })
 
         return {
             type:UPDATE_EVENT,
             payload:request
         }
    }

    export function deleteMultipleEvents(ids){
        console.log('deleteMultipleEvents',ids);
        
        const request = axios.put(`${URN}/event/delete/deleteSelected`,{ids},{ headers: authHeader() })
        .then(response=>response.data)
        return{
            type:DELETE_MULTIPLE_EVENT,
            payload:request
        }
    }