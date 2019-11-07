import {GET_COUNTRY, GET_STATE, GET_CITY, GET_LOCATION_DETAIL, POST_SOCIETY,GET_SOCIETY,DETAIL_SOCIETY, DELETE_SOCIETY, UPDATE_SOCIETY, DELETE_SELECTEDSOCIETY } from '../../actionCreators/index';
export default function(state={},action){
   
    switch(action.type){
    case GET_COUNTRY:
    return {  ...state, countryResult: action.payload};

      
    case GET_STATE:
    return {  ...state, stateResult: action.payload};


    case GET_CITY:
    return {  ...state, cityResult: action.payload};

    case GET_LOCATION_DETAIL:
    return {  ...state, locationResult: action.payload};

    case GET_SOCIETY:
    return {  ...state, societyResult: action.payload};

    case POST_SOCIETY:
    return {  ...state, post_Society: action.payload};

    case DETAIL_SOCIETY:
    return {  ...state, detail_Society: action.payload};

    case DELETE_SOCIETY:
    return {  ...state, delete_Society: action.payload};

    case  DELETE_SELECTEDSOCIETY:
    return {  ...state, deleteSelect_Society: action.payload};

    case UPDATE_SOCIETY:
    return {  ...state, update_Society: action.payload};



  

    default:
        return state;
    }
}





