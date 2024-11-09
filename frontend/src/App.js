import React, { useEffect } from 'react'
import Home from './pages/Home'
import {Routes,Route, useNavigate} from 'react-router-dom';
import Alltasks from './pages/Alltasks';
import Importanttasks from './pages/Importanttasks';
import Completed from './pages/Completed';
import Incompleted from './pages/Incompleted';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
const App = () => {
  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch()
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  }, []);
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signup');
    }
  }, []);
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index element={<Alltasks/>}></Route>
          <Route path='/importantTasks' element={<Importanttasks/>}></Route>
          <Route path='/completedTasks' element={<Completed/>}></Route>
          <Route path='/incompletedTasks' element={<Incompleted/>}></Route>
          </Route>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </div>
  )
}

export default App
