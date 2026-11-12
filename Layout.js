import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => <div className="app-shell"><NavBar /><main className="container"><Outlet /></main><footer>Rung chuông vàng · Lập trình Web</footer></div>;
export default Layout;
