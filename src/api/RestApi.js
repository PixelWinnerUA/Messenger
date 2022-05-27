import axios from "axios";

export const GetUserList = async () => {
    try {
        return await axios.get('http://bekirov-001-site1.itempurl.com/users')
            .then(response => response.data)
    } catch (error) {
        console.error(error);
    }
}