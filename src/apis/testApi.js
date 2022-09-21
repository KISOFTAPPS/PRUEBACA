import axios from 'axios';


export const testApi = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/632b8f685c146d63caa3f399'
});