import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

function LinksPage() {
    const [links, setLinks] = useState([])
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const fetchLinks = useCallback(async ()=>{
        try{
            const fetched = await request('/api/link', 'GET', null, {Authorization: `Bearer ${token}`})
            setLinks(fetched)
        } catch (e) {
        }
        
    }, [request, token])

    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])

    if (loading){
        return <Loader />
    }
    return (
        <div>
            {!loading &&<LinksList links={links}/>}
        </div>
    );
}

export default LinksPage;