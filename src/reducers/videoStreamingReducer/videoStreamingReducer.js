import { VIDEO_STREAM } from '../../actionCreators/index';

export default function (state = {}, action) {
    switch (action.type) {
        case VIDEO_STREAM:
            return { ...state, videoStreamResult: action.payload };
    }
}