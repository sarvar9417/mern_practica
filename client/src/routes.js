import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom"
import LinksPage from "./pages/LinksPage";
import AuthPage from "./pages/AuthPage";
import DeatailsPage from "./pages/DeatailsPage";
import CreatePage from "./pages/CreatePage";

function Useroutes({isAuthenticated}) {
    if (isAuthenticated) {
        return (
            <div>
                <Switch>
                    <Route path="/links">
                        <LinksPage/>
                    </Route>
                    <Route path="/auth">
                        <AuthPage/>
                    </Route>
                    <Route path="/create">
                        <CreatePage/>
                    </Route>
                    <Route path="/details/:id">
                        <DeatailsPage/>
                    </Route>
                    <Redirect to="create"/>
                </Switch>
            </div>
        )
    }
    return (
        <div>
            <Switch>
                <Route path='/'>
                    <AuthPage/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        </div>
    )
}

export default Useroutes;