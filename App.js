import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fackstore from './store';
import Paymentform from './Paymentprocess';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Fackstore />} />
        <Route path="/payment" element={<Paymentform />} />
      </Routes>
    </Router>
  );
}

export default App;



