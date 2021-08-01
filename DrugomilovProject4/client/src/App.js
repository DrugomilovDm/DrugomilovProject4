import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import "materialize-css"

function App() {
    const contextValue = useAuth()
    const isAuthenticated = !!contextValue.token;
    const routes = useRoutes(isAuthenticated)
    return (
        <body className="rootStyle">
            <AuthContext.Provider value={contextValue}>
                <Router>
                    <div className="d-flex h-100 align-items-center justify-content-center">
                        {routes}
                    </div>
                </Router>
            </AuthContext.Provider>
        </body>
    )
}
export default App;