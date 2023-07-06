import './App.css'
import { Route, Routes, useRoutes } from 'react-router-dom'
import LoginPage from './pages/login'
import PrivateRoute from './privateRoutes/PrivateRoute';
import Home from './pages/home';
import ForgotPassPage from './pages/forgotpass';


function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-pass" element={<ForgotPassPage />} />
    </Routes>
  )
}

export default App
