import {GET_SERVICE} from '../../actionCreators/index';

const initialState={
    item:[]
}


export default function(state=initialState, action) {

    switch(action.type){
        case GET_SERVICE:
            return {...state, item: action.payload}
        
        default:
            return state;
    
    }   
    

}

