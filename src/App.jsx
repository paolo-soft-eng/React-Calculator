import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LogInSignUp from '../NSTP/LogInSignUp';
import DashboardStudent from '../NSTP/DashboardStudent';
import SelectNSTP from '../NSTP/SelectNSTP';
import Calculator from "./Calculator/Assignment2";

function App() {
  
  return(
    <>
    <Calculator/>
    </>
  );
}

export default App;
