import axios from 'axios';
import { URN, VIDEO_STREAM } from '../actionCreators/index';
import { authHeader } from '../helper/authHeader';

export function videoStream() {
    const request = axios.get(`${URN}/video`, { headers: authHeader() })
        .then((response => response.data))

    return {
        type: VIDEO_STREAM,
        payload: request
    }
}