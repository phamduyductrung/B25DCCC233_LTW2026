import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <Navigate to="/" replace />;
  const heading = state.reason === 'gold' ? 'Chúc mừng! Bạn đã rung chuông vàng' :
    state.reason === 'wrong' ? 'Bạn đã bị loại' :
    state.reason === 'timeout' ? 'Hết giờ!' : 'Bạn đã hoàn thành 15 câu';
  return <section className="panel result-panel">
    <div className="eyebrow">KẾT QUẢ LƯỢT CHƠI</div><h1>{heading}</h1>
    <p>Người chơi: <strong>{state.name}</strong></p>
    <p>Số câu trả lời đúng: <strong>{state.correctCount}</strong></p>
    <p>Điểm: <strong>{state.score}</strong></p>
    <p>Danh hiệu: <strong>{state.rank}</strong></p>
    <div className="actions"><button className="primary" onClick={() => navigate('/play')}>Chơi lại</button><button onClick={() => navigate('/')}>Về trang chủ</button></div>
  </section>;
};
export default Result;
