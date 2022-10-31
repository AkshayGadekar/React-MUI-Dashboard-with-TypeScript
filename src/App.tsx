import * as React from 'react';
import {Routes, Route, Link as RouterLink} from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Link from '@mui/material/Link';

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );

}
