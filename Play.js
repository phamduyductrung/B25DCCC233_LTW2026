import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';
import { EXTRA_TIME, TIME_PER_QUESTION } from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, loading, error, playerName, addHistory }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(TIME_PER_QUESTION);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [used, setUsed] = useState({ hide: false, extra: false, lifeline: false });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [lifeline, setLifeline] = useState(false);
  const question = questions[index];
  const score = useMemo(() => calcScore(answers), [answers]);

  const finish = (reason, finalAnswers = answers) => {
    const finalScore = calcScore(finalAnswers);
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    const rank = getRank(finalScore);
    const result = { name: playerName, score: finalScore, rank, correctCount, reason };
    addHistory({ id: Date.now(), ...result, playedAt: new Date().toLocaleString('vi-VN') });
    navigate('/result', { replace: true, state: result });
  };

  useEffect(() => {
    if (!playerName.trim()) return;
    document.title = `Câu ${index + 1}/15 – ${score} điểm`;
    return () => { document.title = 'Rung chuông vàng'; };
  }, [index, score, playerName]);

  useEffect(() => {
    if (status !== 'answering') return undefined;
    const timerId = setInterval(() => setTime((old) => old - 1), 1000);
    return () => clearInterval(timerId);
  }, [status, index]);

  useEffect(() => {
    if (status === 'answering') return undefined;
    if (status === 'locked') {
      const id = setTimeout(() => setStatus('revealed'), 2000);
      return () => clearTimeout(id);
    }
    if (status === 'revealed') {
      const id = setTimeout(() => {
        const last = answers[answers.length - 1];
        if (last.correct || last.lifeline) {
          if (index === questions.length - 1) finish(last.correct ? 'gold' : 'completed', answers);
          else {
            setIndex((old) => old + 1);
            setSelected(null);
            setHiddenOptions([]);
            setLifeline(false);
            setTime(TIME_PER_QUESTION);
            setStatus('answering');
          }
        } else finish(last.timeout ? 'timeout' : 'wrong', answers);
      }, 1500);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status !== 'answering' || time > 0) return;
    const record = { id: question.id, level: question.level, correct: false, lifeline, timeout: true };
    const next = [...answers, record];
    setAnswers(next);
    setSelected(null);
    setStatus('revealed');
    if (lifeline && index === questions.length - 1) {
      // The last question is handled by the revealed-state effect.
    }
  }, [time, status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKey = (e) => {
      if (status === 'answering' && ['1', '2', '3', '4'].includes(e.key) && !hiddenOptions.includes(Number(e.key) - 1)) chooseAnswer(Number(e.key) - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const chooseAnswer = (answerIndex) => {
    if (status !== 'answering' || !question) return;
    setSelected(answerIndex);
    const correct = answerIndex === question.answer;
    const record = { id: question.id, level: question.level, correct, lifeline: !correct && lifeline };
    setAnswers((old) => [...old, record]);
    setStatus('locked');
  };

  const useHide = () => {
    const wrong = question.options.map((_, i) => i).filter((i) => i !== question.answer && i !== selected && !hiddenOptions.includes(i));
    if (wrong.length) setHiddenOptions([wrong[Math.floor(Math.random() * wrong.length)]]);
    setUsed((old) => ({ ...old, hide: true }));
  };
  const useExtra = () => { setTime((old) => old + EXTRA_TIME); setUsed((old) => ({ ...old, extra: true })); };
  const useLifeline = () => { setLifeline(true); setUsed((old) => ({ ...old, lifeline: true })); };

  if (!playerName.trim()) return <Navigate to="/" replace />;
  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error || !question) return <p>Không tải được câu hỏi</p>;

  return <div className="play-layout">
    <div className="play-top"><h1>Vòng thi</h1><Timer time={time} /></div>
    <QuestionCard question={question} index={index} selected={selected} status={status} hiddenOptions={hiddenOptions} onChoose={chooseAnswer} />
    <Helpers used={used} onHide={useHide} onExtra={useExtra} onLifeline={useLifeline} lifeline={lifeline} canUse={status === 'answering'} />
    <ScoreBoard score={score} answers={answers} currentIndex={index} />
    {status === 'revealed' && <p className="notice">{answers[answers.length - 1]?.correct ? 'Chính xác!' : lifeline ? 'Phao cứu sinh đã giúp bạn qua câu này!' : 'Chưa chính xác!'}</p>}
  </div>;
};
export default Play;
