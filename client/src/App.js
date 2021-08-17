import {BrowserRouter as Router} from 'react-router-dom'
import Useroutes from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import "materialize-css"

function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuthentocated = !!token
    if (!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthentocated, ready
        }
        }>
            <Router>
                {isAuthentocated && <Navbar/>}
                <div className="container">
                    <Useroutes isAuthenticated={isAuthentocated}/>
                </div>
            </Router>
        </AuthContext.Provider>


    );
}

export default App;
