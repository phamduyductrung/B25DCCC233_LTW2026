import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

const QuestionBank = ({ questions, loading, error }) => {
  const [topic, setTopic] = useState('Tất cả');
  const [term, setTerm] = useState('');
  const handleTermShift = (e) => setTerm(e.target.value);
  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error) return <p>Không tải được câu hỏi</p>;
  const filtered = questions.filter((q) => (topic === 'Tất cả' || q.topic === topic) && q.question.toLowerCase().includes(term.toLowerCase()));
  return <section className="panel">
    <h1>Ngân hàng câu hỏi</h1>
    <div className="filters">
      <select value={topic} onChange={(e) => setTopic(e.target.value)}>
        <option>Tất cả</option>{TOPICS.map((item) => <option key={item}>{item}</option>)}
      </select>
      <input value={term} onChange={handleTermShift} placeholder="Tìm kiếm nội dung câu hỏi..." />
    </div>
    <p>Có {filtered.length} câu hỏi</p>
    <div className="table-wrap"><table><thead><tr><th>STT</th><th>Chủ đề</th><th>Mức độ</th><th>Câu hỏi</th></tr></thead>
      <tbody>{filtered.map((q, i) => <tr key={q.id}><td>{i + 1}</td><td>{q.topic}</td><td>{LEVELS[q.level]}</td><td><Link to={`/questions/${q.id}`}>{q.question}</Link></td></tr>)}</tbody>
    </table></div>
  </section>;
};
export default QuestionBank;
