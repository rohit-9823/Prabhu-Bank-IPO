import React from 'react';
import { BrowserRouter ,Route,Switch} from 'react-router-dom';
import { PublicRoute } from './publicRoutes';
import { Routes } from './mapper';
import ProtectedRoute from './protectedRoutes';
import AgentprotectedRoute from './agentProtectedRoute';
export default function Router() {
  return (
      <BrowserRouter>
      <Switch>
        {

            Routes.map((item,index)=>{
              if(item.type=="public"){
                    return(
                    <PublicRoute exact component={item.component} path={item.path}></PublicRoute>
                    )
              }
              else if(item.type=="protected"){
                return(
                  <ProtectedRoute exact component={item.component} path={item.path}></ProtectedRoute>
                  )
              }
              else if(item.type=="agentprotected"){
                return(
                  <AgentprotectedRoute exact component={item.component} path={item.path}></AgentprotectedRoute>
                  )
              }
                // return item.type==="public"?
                // <PublicRoute exact component={item.component} path={item.path}></PublicRoute>:
                // <ProtectedRoute exact component={item.component} path={item.path}></ProtectedRoute>
            })
        }
        </Switch>
      </BrowserRouter>

  );
}
