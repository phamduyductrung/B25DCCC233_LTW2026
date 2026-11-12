import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="navbar">
    <div className="brand">🏆 Rung chuông vàng</div>
    <nav>
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/questions">Ngân hàng câu hỏi</NavLink>
      <NavLink to="/history">Lịch sử</NavLink>
    </nav>
  </header>
);
export default NavBar;
