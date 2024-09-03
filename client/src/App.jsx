import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import SignUp from './pages/SignUp'
import Report from './pages/Report'
import Live_data from './pages/Live_data'
import Consumption from './pages/Consumption'
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
	<Route path='/consumption' Component={Consumption} />
        <Route path='/Live_data' Component={Live_data} />
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
