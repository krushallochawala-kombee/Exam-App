// src/TakeExam.js
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { generateQuestion, checkAnswer } from "./GenerateQuestion";

const TakeExam = () => {
  const location = useLocation(); // Use useLocation to get the location object
  const query = new URLSearchParams(location.search);
  const numQuestions = parseInt(query.get("numQuestions"), 10);
  const topic = query.get("topic");
  const difficulty = query.get("difficulty");

  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examFinished, setExamFinished] = useState(false);

  const fetchQuestion = useCallback(async () => {
    setIsLoading(true);
    const newQuestion = await generateQuestion(topic, difficulty);
    setQuestion(newQuestion);
    setIsLoading(false);
  }, [topic]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion, topic, difficulty]);

  const handleSubmitAnswer = async () => {
    setIsLoading(true);
    const isCorrect = await checkAnswer(question, userAnswer);
    setResult(isCorrect ? "Correct!" : "Incorrect!");

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswer("");
    setIsLoading(false);

    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setExamFinished(true);
    }
  };

  if (examFinished) {
    return (
      <div>
        <h1>Exam Finished!</h1>
        <p>
          Your score: {score} out of {numQuestions}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>AI Exam Application</h1>
      <h2>Topic: {topic}</h2>
      <h2>
        Question {currentQuestionIndex + 1} of {numQuestions}
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Question: {question}</h2>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
          {result && <p>Result: {result}</p>}
        </div>
      )}
    </div>
  );
};

export default TakeExam;
