import {GET_COUNTRY_DETAILS,UPDATE_COUNTRY,GET_COUNTRY_DETAILS1} from '../../actionCreators/index';
export default function(state={},action){


    switch(action.type){
        case GET_COUNTRY_DETAILS:
          return{...state, country1:action.payload}
        case UPDATE_COUNTRY:
          return{...state, country2:action.payload}
        case GET_COUNTRY_DETAILS1:
          return{...state, country3:action.payload}
        default:
            return state;
    }
}