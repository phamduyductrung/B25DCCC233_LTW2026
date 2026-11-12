import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LEVELS, LETTERS, POINTS } from '../data';

const QuestionDetail = ({ questions, loading, error }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error) return <p>Không tải được câu hỏi</p>;
  const question = questions.find((item) => item.id === Number(id));
  if (!question) return <section className="panel"><h2>Không tìm thấy câu hỏi</h2><button onClick={() => navigate(-1)}>Quay lại</button></section>;
  return <section className="panel">
    <h1>Câu hỏi số {question.id} – {question.topic} ({LEVELS[question.level]}, {POINTS[question.level]} điểm)</h1>
    <h2>{question.question}</h2>
    <div className="detail-options">{question.options.map((option, i) => <div key={i} className={i === question.answer ? 'detail-option correct' : 'detail-option'}>{LETTERS[i]}. {option} {i === question.answer && <strong>(Đáp án đúng)</strong>}</div>)}</div>
    <button onClick={() => navigate(-1)}>Quay lại</button>
  </section>;
};
export default QuestionDetail;
