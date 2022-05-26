import * as React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

// import Landing from './pages/Landing';
import Header from './pages/components/Header';
import Footer from './pages/components/Footer';
import Main from './pages/landing_parts/Main';
import Order from './pages/order/Order';
import Reservation from './pages/Reservation';
import Cart from './pages/order/Cart';
import LogIn from './pages/account/LogIn';
import Register from './pages/account/Register';
import ForgotPassword from './pages/account/ForgotPassword';
import PasswordReset from './pages/account/PasswordReset';
import Dashboard from './pages/admin/Dashboard';
import MenuManagement from './pages/admin/MenuManagement';
import EditMenu from './pages/admin/MenuMgmt/EditMenu';
import RegisterMenu from './pages/admin/MenuMgmt/RegisterMenu';
import Account from './pages/account/Account';
import TOC from './pages/TermsOfConditions/TOC';
import NotFound from './pages/landing_parts/NotFound';

function App() {

  const [ authUser, setAuthUser ] = useState('');
  const [ isAutoOpen, setIsAutoOpen ] = useState();
  const [ manualOpen, setManualOpen ] = useState();
  
  useEffect(() => {
    const adminUser = sessionStorage.role;
    const setUser = () => {
      if (adminUser === 'user') {
        setAuthUser('user')
      } else if (adminUser === 'admin') {
        setAuthUser('admin')
      }
    }

    async function fetchStatus() {
      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }
      const request = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/status/checkStatus`, config)
      setIsAutoOpen(request.data.status[0].isOpenStoreAuto);
      setManualOpen(request.data.status[0].manualStatus);
      return request
    }
    setUser();
    fetchStatus();
  },[isAutoOpen, manualOpen])

  const AdminRoute = () => {
    if(authUser === 'admin') {
      return <Outlet />
    } else {
      return <Navigate to='login' />
    }
  }

  const UserRoute = () => {
    if(authUser === 'user' || authUser === 'admin') {
      return <Outlet />
    } else {
      return <Navigate to='login' />
    }
  }

  return (
    <Router>
      <Header authUser={authUser}/>
      <Routes>
        {/* public route */}
        <Route path='/' element={<Main />} />
        <Route path='policy-agreement' element={<TOC />} />
        <Route path='login' element={<LogIn />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='passwordreset/:resetToken' element={<PasswordReset />} />
        {/* private route */}
        <Route element={<UserRoute />}>
          <Route path='account' element={<Account />} />
          <Route path='order' element={<Order isAutoOpen={isAutoOpen} manualOpen={manualOpen}/>}>
          </Route>
          <Route path='reservation' element={<Reservation />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        {/* admin route */}
        <Route element={<AdminRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='menu' element={<MenuManagement />}>
            <Route path='edit' element={<EditMenu />} />
            <Route path='registermenu' element={<RegisterMenu />} />
          </Route>
        </Route>
        {/* TODO: add not found page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
