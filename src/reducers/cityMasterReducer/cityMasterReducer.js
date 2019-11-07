import {COUNTRY_DETAIL,STATE_DETAIL, CITY_DETAIL, ADD_CITY, DETAIL_CITY, DELETE_CITY,UPDATE_CITY, DELETE_SELECTEDCITY} from  '../../actionCreators/index';
export default function(state={},action){
  
    switch(action.type){
    case COUNTRY_DETAIL:
    return {  ...state, countryResult: action.payload};

      
    case STATE_DETAIL:
    return {  ...state, stateResult: action.payload};

    case CITY_DETAIL:
    return {  ...state, cityResult: action.payload};

    
    case ADD_CITY:
    return {...state, cityData: action.payload};

    case DETAIL_CITY:
    return {...state, city: action.payload}

   

    case DELETE_CITY:
    return {...state, delete_city: action.payload}
   
    case UPDATE_CITY:
    return {...state, update_city: action.payload}

    case DELETE_SELECTEDCITY:
    return {...state, selected_deleteCity: action.payload}

   

    default:
        return state;
    }
}
