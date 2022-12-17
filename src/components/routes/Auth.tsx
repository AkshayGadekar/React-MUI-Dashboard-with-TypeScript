import React, {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import SuspenseProgressBar from "../utilities/SuspenseProgressBar";

const Auth = () => {

  const Dashboard = lazy(() => import('../../pages/Dashboard'));
  const MessagingIndex = lazy(() => import('../../pages/messaging/Index'));
  const NodesIndex = lazy(() => import('../../pages/nodes/Index'));
  const NodesEdit = lazy(() => import('../../pages/nodes/Edit'));
  const UsersIndex = lazy(() => import('../../pages/settings/users/Index'));
  const UsersEdit = lazy(() => import('../../pages/settings/users/Edit'));
  const RolesIndex = lazy(() => import('../../pages/settings/roles/Index'));
  const RolesCreate = lazy(() => import('../../pages/settings/roles/Create'));
  const RolesEdit = lazy(() => import('../../pages/settings/roles/Edit'));
  
  return (
    <Suspense fallback={<SuspenseProgressBar />}>
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
    </Suspense>
  );
}

export default Auth;