import axios from "axios";

axios.defaults.baseURL = 'http://70.37.67.50:8080'; //API URL AND PORT
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = localStorage.AUTH_TOKEN

export const GetUserList = async () => {
    return await axios.get('/api/users')
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const LogIn = async (userName, password) => {
    await axios.post('/api/authorization/signIn',
        {
            userName,
            password
        })
        .then(response => {
            localStorage.AUTH_TOKEN = "Bearer " + response.data.jwtToken;
            axios.defaults.headers.common['Authorization'] = localStorage.AUTH_TOKEN;
        })
        .catch(error => console.log(error))
}