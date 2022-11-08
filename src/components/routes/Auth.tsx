import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Index from "../../pages/nodes/Index";
import Edit from "../../pages/nodes/Edit";

const Auth = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes" >
        <Route path="list" element={<Index />} />
        <Route path="edit/:id" element={<Edit />} />  
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Auth;