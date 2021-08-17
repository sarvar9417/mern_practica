import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

function DeatailsPage() {
    const {request, loading} = useHttp()
    const [link, setLink] = useState()
    const linkId = useParams().id
    const {token} = useContext(AuthContext)
    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setLink(fetched)
        } catch (e) {

        }
    }, [request, linkId,  token])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading){
        return <Loader/>
    }
    return (
        <div>
            {!loading && link && <LinkCard link = {link}/>}
        </div>
    );
}

export default DeatailsPage;