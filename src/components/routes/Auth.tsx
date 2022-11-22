import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "../../pages/Dashboard";
import MessagingIndex from "../../pages/messaging/Index";
import NodesIndex from "../../pages/nodes/Index";
import NodesEdit from "../../pages/nodes/Edit";
import UsersIndex from "../../pages/settings/users/Index";
import UsersEdit from '../../pages/settings/users/Edit';
import RolesIndex from "../../pages/settings/roles/Index";
import RolesCreate from "../../pages/settings/roles/Create";
import RolesEdit from "../../pages/settings/roles/Edit";

const Auth = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes" >
        <Route path="list" element={<NodesIndex />} />
        <Route path="edit/:id" element={<NodesEdit />} />  
      </Route>
      <Route path="/messaging/list" element={<MessagingIndex />} />
      <Route path="/settings" >
        <Route path="users" >
          <Route path="list" element={<UsersIndex />} />
          <Route path="edit/:id" element={<UsersEdit />} />
        </Route>
        <Route path="roles" >
          <Route path="list" element={<RolesIndex />} />
          <Route path="create" element={<RolesCreate />} />
          <Route path="edit/:id" element={<RolesEdit />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Auth;