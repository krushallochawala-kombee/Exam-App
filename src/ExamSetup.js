// src/ExamSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSetup = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [topic, setTopic] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleStartExam = () => {
    // Redirect to TakeExam with parameters
    navigate(`/take-exam?numQuestions=${numQuestions}&topic=${topic}`);
  };

  return (
    <div>
      <h1>Setup Your Exam</h1>
      <input
        type="number"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        placeholder="Number of Questions"
      />
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
      />
      <button onClick={handleStartExam}>Start Exam</button>
    </div>
  );
};

export default ExamSetup;