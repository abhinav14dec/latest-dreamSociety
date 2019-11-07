import {GET_COUNTRY_NAME,GET_STATE_NAME,GET_CITY_NAME,ADD_LOCATION_DETAILS,GET_LOCATION_NAME,DELETE_LOCATION_IDS,DELETE_LOCATION,GET_LOCATION,UPDATE_LOCATION, DELETE_COUNTRY} from '../../actionCreators/index';

export default function(state={},action){

    switch(action.type){
        case GET_COUNTRY_NAME:
            return{
                ...state,country:action.payload
            }
        
        
        case GET_STATE_NAME:
            return{
                ...state, state:action.payload
            }
            
               
    
        
        case GET_CITY_NAME:
            return{
                ...state, city:action.payload
            }

       

        case GET_LOCATION_NAME:
            return{
                ...state, location:action.payload
            }    

        case  ADD_LOCATION_DETAILS:
            return{
                ...state, add:action.payload
            }    

        case  GET_LOCATION:
            return{
                ...state, details:action.payload
            }  

        case UPDATE_LOCATION:
            return{
                ...state, update:action.payload
            }
        
        case DELETE_LOCATION:
            return{
                ...state, delete:action.payload
            }
        case DELETE_LOCATION_IDS:
            return{
                ...state, deleteAll: action.payload
            }
        default:
            return state
    }
}