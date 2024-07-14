import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './component/Navbar'
import { Home } from './page/Home'
import { Register } from './page/Register'
import { Login } from './page/Login'
import { Logout } from './page/Logout'
import { Footer } from './component/Footer'
import { Task } from './page/Task'


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/task' element={<Task/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/logout' element={<Logout/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
