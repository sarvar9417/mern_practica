import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

function AuthPage() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {request, loading, error, clearError} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})


    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async ()=>{
        try {
            const data = await  request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch (e) {
        }
    }

    const loginHandler = async ()=>{
        try {
            const data = await  request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e) {
        }
    }

    useEffect(()=>{
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    }, [])

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Registratsiya</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Registratsiya</span>
                        <div className="input-field">
                            <input
                                placeholder="Email"
                                id="email" type="email"
                                className="validate b-btm white-text"
                                name='email'
                                onChange={changeHandler}
                            />
                            <label htmlFor="email" className='white-text'>Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                placeholder="Password"
                                id="password" type="password"
                                className="validate b-btm white-text"
                                name='password'
                                onChange={changeHandler}
                            />
                            <label htmlFor="password" className='white-text'>Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{marginRight: 20}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Kirish
                        </button>
                        <button
                            className='btn grey lighten-1 black-text'
                            disabled={loading}
                            onClick={registerHandler}
                        >
                            Registratsiya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;