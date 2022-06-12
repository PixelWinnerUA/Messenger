import axios from "axios";
import {toast} from "react-toastify";
import store from "../store/redux-store";
import {SetAuthActionCreator} from "../store/reducers/AppReducer";

axios.defaults.baseURL = 'http://70.37.67.50:8080'; //API URL AND PORT
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json'; //json content set by default
axios.defaults.headers.common['Authorization'] = JSON.parse(localStorage.getItem("user"))?.token; //localStorage.AUTH_TOKEN
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            toast.error(error.response.data.message);
            localStorage.removeItem('user');
            if (!error.response.data) {
                store.dispatch(SetAuthActionCreator(false));
            }
        } else if (error.response?.status === 400) {
            toast.error(error.response.data.message);
        }
    });

let cancelToken;

export const SearchUsers = async (input) => {
    if (cancelToken) {
        cancelToken.cancel("Operation canceled due to new request.")
    }
    cancelToken = axios.CancelToken.source()
    return await axios.get('api/users/search/' + input, {cancelToken: cancelToken.token})
        .then(response => response?.data)
        .catch(error => console.log(error))
}


export const GetUserImage = async () => {
    return await axios.get('api/users/' + JSON.parse(localStorage.getItem("user")).userName + '/photo')
        .then(response => response.data.bytes)
}

export const UploadImage = async (image) => {
    return await axios.post('api/users/' + JSON.parse(localStorage.getItem("user")).userName + '/photo',
        {
            image
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => toast.success("New profile picture uploaded!"))
}

export const LoginAPI = async (userName, password) => {
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
        .catch(error => console.log(error))
}

export const RegistrationAPI = async (name, userName, password) => {
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