import axios from 'axios';


export const testApi = axios.create({
    baseURL: '/db/test.json'
});