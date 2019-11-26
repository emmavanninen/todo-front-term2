import { Axios } from './Axios'
import jwt_decode from 'jwt-decode'
import setAuthJWT from "./setAuthJWT";

export const apiAuth = () => {
    return new Promise ((resolve, reject) =>{
        const token = localStorage.getItem('jwtToken')
        const decoded = jwt_decode(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime){
            localStorage.removeItem("jwtToken");

            setAuthJWT(null)

            reject(null)
        } else {
            setAuthJWT(token)

            const user = {
                id: decoded.id,
                email: decoded.email
            }

            resolve(user)
        }
    })
}

export const apiHandleSignupLogin = (userInfo) => {
    return new Promise((resolve, reject) =>{
        Axios.post('/users/signuplogin', userInfo, axiosConfig)
            .then(result =>{
                const {token} = result.data

                localStorage.setItem('jwtToken', token)

                const decoded = jwt_decode(token)

                setAuthJWT(token)

                resolve(decoded);
            })
            .catch(error => reject(error.response.data.message))
    })
}

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}