import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

function CreatePage() {
    const [link, setLink] = useState()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()
    const saveHandler = async () => {
        try {
            const data = await request(
                '/api/link/generate',
                'POST',
                {from: link},
                {Authorization: `Bearer ${auth.token}`}
            )
            history.push(`/details/${data.link._id}`)
        } catch (e) {

        }
    }
    useEffect(() => {
        window.M.updateTextFields()
    }, [link])
    return (
        <div className='row'>
            <div className="col s8 offset-s2">
                <div className="input-field" style={{marginTop: '2rem'}}>
                    <input
                        placeholder="Link"
                        id="links"
                        type="text"
                        className="validate b-btm "
                        name='links'
                        onChange={e => setLink(e.target.value)}
                    />
                    <label htmlFor="links">Linkni kiriting</label>
                </div>
                <button className='btn green' onClick={saveHandler}>Save</button>
            </div>
        </div>
    );
}

export default CreatePage;