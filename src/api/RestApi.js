import axios from "axios";
import {toast} from "react-toastify";
import store from "../store/redux-store";
import {DeleteUser} from "../store/reducers/AppReducer";

axios.defaults.baseURL = 'http://70.37.67.50:8080'; //API URL AND PORT
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json'; //json content set by default
axios.defaults.headers.common['Authorization'] = localStorage.AUTH_TOKEN; //localStorage.AUTH_TOKEN
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            toast.error(error.response.data.message);
            if (localStorage.AUTH_TOKEN) {
                DeleteUser()(store.dispatch)
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


export const GetUser = async () => {
    return await axios.get('api/users/info')
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const UploadImage = async (image) => {
    return await axios.post('api/users/photo',
        {
            image
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => toast.success("New profile picture uploaded!"))
        .catch(error => console.log(error))
}

export const LoginAPI = async (userName, password) => {
    return await axios.post('/api/authorization/signIn',
        {
            userName,
            password
        })
        .then(response => {
            localStorage.AUTH_TOKEN = "Bearer " + response.data.jwtToken;
            if (localStorage.AUTH_TOKEN) {
                axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwtToken;
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
        localStorage.AUTH_TOKEN = "Bearer " + response.data.jwtToken;
        if (localStorage.AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwtToken;
        }
    }).catch(error => console.log(error));
}