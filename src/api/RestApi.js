import axios from "axios";
import {IsAuthenticated} from "../store/reducers/AppReducer";
import {toast} from "react-toastify";

axios.defaults.baseURL = 'http://70.37.67.50:8080'; //API URL AND PORT
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user"))?.token; //localStorage.AUTH_TOKEN
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            toast.error(error.response.data.message);
            localStorage.removeItem('user');
            IsAuthenticated() //не сработает рендер ибо не вызываетс диспатчем!!! ИСПРАВИТЬ!
        }
    });


export const SearchUsers = async (input) => {
    return await axios.get('api/users/search/' + input)
        .then(response => response.data)
        .catch(error => console.log(error))
}
export const UploadImage = async (image) => {
    return await axios.post('api/users/' + JSON.parse(localStorage.getItem("user")).userName + '/photo',
        {
            image
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
}

export const LogIn = async (userName, password) => {
    return await axios.post('/api/authorization/signIn',
        {
            userName,
            password
        })
        .then(response => {
            let _user = {
                userName: response.data.userName,
                token: "Bearer " + response.data.jwtToken
            }
            localStorage.setItem('user', JSON.stringify(_user))
            if (localStorage.user) {
                axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).token;
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const RegisterUser = async (name, userName, password) => {
    return await axios.post('/api/authorization/signUp',
        {
            name,
            userName,
            password,
        }).then(response => {
        let _user = {
            userName: response.data.userName,
            token: "Bearer " + response.data.jwtToken
        }
        localStorage.setItem('user', JSON.stringify(_user))
        if (localStorage.user) {
            axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user")).token;
        }
    }).catch(error => console.log(error));


}