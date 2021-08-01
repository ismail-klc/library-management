import axios from 'axios';

const buildClient = (props) => {
    if (typeof window === 'undefined') {
        console.log('server');
        // we are on the server

        return axios.create({
            baseURL: 'http://localhost:3000',
            headers: props.req.headers,
            withCredentials: true
        });
    }

    console.log('browser');
    // we must be on the browser
    return axios.create({
        baseURL: 'http://localhost:3000',
        withCredentials: true
    });
}

export default buildClient;