import axios from 'axios';

const buildClient = (props) => {
    if (typeof window === 'undefined') {
        // we are on the server
        return axios.create({
            baseURL: 'http://localhost:3000',
            headers: props.req.headers,
            withCredentials: true
        });
    }

    // we must be on the browser
    return axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    });
}

export default buildClient;