import axios, {CancelTokenSource} from "axios";
import {toast} from "react-toastify";
import store, {RootState} from "../store/redux-store";
import platform from "platform"
import push from "push.js";
import {DeleteUser} from "../store/reducers/sidebarReducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Chat} from "../types/chatsReducerTypes";
import {ImageFile, OtherUserType} from "../types/apiTypes";

// axios.defaults.baseURL = 'http://70.37.67.50/';
axios.defaults.baseURL = 'https://bsite.net/PixelMessenger';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // for all requests
axios.defaults.headers.common['Content-Type'] = 'application/json'; //json content set by default
axios.defaults.headers.common['Authorization'] = localStorage.AUTH_TOKEN; //localStorage.AUTH_TOKEN
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            if (!toast.isActive(error.response.data.message)) {
                toast.error(error.response.data.message, {toastId: error.response.data.message});
            }
            if (localStorage.AUTH_TOKEN) {
                (store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(DeleteUser())
            }
        } else if (error.response?.status === 400) {
            if (!toast.isActive(error.response.data.message)) {
                toast.error(error.response.data.message, {toastId: error.response.data.message});
            }
        }
    });

let cancelToken: CancelTokenSource;

export const SearchUsers = async (input: string): Promise<OtherUserType[]> => {
    if (cancelToken) {
        cancelToken?.cancel("Operation canceled due to new request.")
    }
    cancelToken = axios.CancelToken.source()
    return await axios.get('api/users/search/' + input, {cancelToken: cancelToken.token})
        .then(response => response?.data)
        .catch(error => console.log(error))
}

const fingerPrint: string = localStorage.fingerPrint ? localStorage.fingerPrint : platform.name + " " + platform.os;

export const FetchCurrentUser = async () => {
    return await axios.get('api/users/current/info/' + fingerPrint)
        .then(response => response.data)
        .catch(error => console.log(error))
}

export const UploadImage = async (image: ImageFile) => {
    if (image) {
        return await axios.post('api/users/current/edit/image',
            {
                image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.status === 200 && toast.success("New profile picture uploaded!"))
            .catch(error => console.log(error))
    } else {
        toast.error("Load correct picture!")
    }
}

export const UploadBackgroundImage = async (image: ImageFile) => {
    if (image) {
        return await axios.post('api/users/current/edit/background/' + fingerPrint,
            {
                image
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.status === 200 && toast.success("New background uploaded!"))
            .catch(error => console.log(error))
    } else {
        toast.error("Load correct picture!")
    }
}

export const ChangeUserInfo = async (name: string, email: string, password: string) => {
    return await axios.put('api/users/current/edit', {
        name,
        email,
        password
    }).then(response => response.status === 204 && toast.success("Profile changes uploaded!"))
        .catch(error => console.log(error))
}
export const LoginAPI = async (userName: string, password: string) => {
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

export const RegistrationAPI = async (name: string, userName: string, email: string, password: string) => {
    return await axios.post('/api/authorization/signUp',
        {
            name,
            userName,
            email,
            password,
        }).then(response => {
        localStorage.AUTH_TOKEN = "Bearer " + response.data.jwtToken;
        if (localStorage.AUTH_TOKEN) {
            axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.jwtToken;
        }
    }).catch(error => console.log(error));
}

export const makePushNotification = async (data: Chat) => {
    if (store.getState().SideBarComponent?.UserInfo?.userName) {
        if (!document.hasFocus()) {
            if (store.getState().SideBarComponent?.UserInfo?.userName !== data?.senderUserName) {
                await push.create(data.otherUserName, {
                    tag: data.id + data.otherUserName,
                    body: data.lastMessage,
                    icon: data.otherProfileImage?.url,
                    onClick: () => {
                        window.focus();
                    }
                })
            }
        } else if (document.hasFocus() && store.getState().ChatsComponent?.CurrentChat && store.getState().ChatsComponent?.CurrentChat?.otherUserName !== data.senderUserName) {
            if (store.getState().SideBarComponent?.UserInfo?.userName !== data.senderUserName) {
                await push.create(data.otherUserName, {
                    tag: data.id + data.otherUserName,
                    body: data.lastMessage,
                    icon: data.otherProfileImage?.url,
                    onClick: () => {
                        window.focus();
                    }
                })
            }
        }
    }
}
