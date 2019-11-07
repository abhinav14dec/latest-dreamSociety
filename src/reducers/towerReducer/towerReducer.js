import {ADD_TOWER,GET_TOWER} from '../../actionCreators/index';
// const initialState ={
//     users:{
//         id:''
//     }
// }

    export default  function(state =[], action){
       
       switch(action.type){
           case ADD_TOWER :
               return {...state, towers:action.payload}
        
               case GET_TOWER:
               return{...state, tower :action.payload}
            default:
                return state;
                case 'DELETE_TOWER':
    //             const delete_tower = initialState.users.filter(users =>users.id !=action.id)
    //    return delete_tower
            }


    }

    