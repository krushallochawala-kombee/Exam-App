// src/ExamSetup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSetup = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium'); // New state for difficulty
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleStartExam = () => {
    navigate(`/take-exam?numQuestions=${numQuestions}&topic=${topic}&difficulty=${difficulty}`);
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
      <br />
      <br />
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Topic"
      />
      <br />
      <br />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
      <br />
      <br />
      <button onClick={handleStartExam}>Start Exam</button>
    </div>
  );
};

export default ExamSetup;