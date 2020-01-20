import { GET_EMPLOYEE_ACCOUNT } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_EMPLOYEE_ACCOUNT: {
            return {
                ...state, accountDetails: action.payload
            }
        }
        default:
            return state;

    }
}