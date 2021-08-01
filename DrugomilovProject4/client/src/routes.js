import React from 'react'
import {Switch,Route,Redirect}from 'react-router-dom'
import {TablePage} from "./pages/TablePage";
import {AuthPage} from "./pages/AuthPage";
export const useRoutes =isAuthenticated=>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path ="/Table" exact>
                    <TablePage />
                </Route>
                <Redirect to="/Table" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}