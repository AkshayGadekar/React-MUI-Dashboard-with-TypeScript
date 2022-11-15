import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import NodesIndex from "../../pages/nodes/Index";
import NodesEdit from "../../pages/nodes/Edit";
import UsersIndex from "../../pages/settings/users/Index";
import Edit from '../../pages/settings/users/Edit';

const Auth = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes" >
        <Route path="list" element={<NodesIndex />} />
        <Route path="edit/:id" element={<NodesEdit />} />  
      </Route>
      <Route path="/settings" >
        <Route path="users" >
          <Route path="list" element={<UsersIndex />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Auth;