import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'
export const useAuth = () => {
    const [token, setToken] = useState()
    const [userId, setUserId] = useState()
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, token, userId, logout, ready}
}