import { CONTACT_US } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case CONTACT_US:
            return { ...state, contactUsresult: action.payload };
    }
}