import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Report from './pages/Report'
import Weekly from './pages/Weekly'
import Monthly from './pages/Monthly'
import Yearly from './pages/Yearly'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/signin' Component={Signin} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/report' Component={Report} />
        <Route path='/weekly' Component={Weekly} />
        <Route path='/monthly' Component={Monthly} />
        <Route path='/yearly' Component={Yearly} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App