import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout'
import Bookings from './components/pages/bookings/Bookings'
import Clients from './components/pages/clients/Clients'
import Courts from './components/pages/courts/Courts'
import LoginPage from './components/pages/login/LoginPage'
import Main from './components/pages/main/Main'
import Stats from './components/pages/stats/Stats'
import RequireAuth from './components/auth/RequireAuth'
import './css/globals.css'
import { ToastContainer } from 'react-toastify'

function App(): any {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={<PageLayout />}>
            <Route path='main' element={<Main />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='clients' element={<Clients />} />
            <Route path='courts' element={<Courts />} />
            <Route path='stats' element={<Stats />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer closeButton={false} containerId='112121' />
    </>
  )
}

export default App
