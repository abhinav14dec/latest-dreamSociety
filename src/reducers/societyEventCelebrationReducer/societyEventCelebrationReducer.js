import {GUEST_DETAILS_FOR_EVENT,VIEW_INVITATION_LIST} from '../../actionCreators/index'
const initialState={
    guestDetails:'',
    invitationList:[]

}

const societyEventCelebrationReducer=(state=initialState,action)=>{
    switch(action.type){
        case GUEST_DETAILS_FOR_EVENT:{
            return{
                ...state,
                guestDetails:action.payload,
            }
        }
        case VIEW_INVITATION_LIST:{
            return{
                ...state,
                invitationList:action.payload.eventBookings
            }
        }
        default:
            return state
    }
}
export default societyEventCelebrationReducer