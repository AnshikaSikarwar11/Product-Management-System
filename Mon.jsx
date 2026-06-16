import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Monnav } from "./Monnav";
import Mon1 from './Mongo/Mon1';
import Mon2 from './Mongo/Mon2';
import Mon3 from './Mongo/Mon3';
import PrivateR from './PrivateR';

function Mon() {
  return (
    <BrowserRouter>
    <Monnav/>
      <Routes>
        <Route path="/" element={<Mon1 />} />
        <Route path="/login" element={<Mon2 />} />
        <Route path="addproduct" element={<PrivateR> <Mon3/> </PrivateR>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Mon;