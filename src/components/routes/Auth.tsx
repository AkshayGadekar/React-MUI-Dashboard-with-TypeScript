import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Node from "../../pages/Nodes";

const Auth = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/nodes/list" element={<Node />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default Auth;