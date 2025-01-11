import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TakeExam from './TakeExam';
import ExamSetup from './ExamSetup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExamSetup />} />
        <Route path="/take-exam" element={<TakeExam />} />
      </Routes>
    </Router>
  );
};

export default App;
