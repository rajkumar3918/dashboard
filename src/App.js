import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Register from './pages/registerPage';
import Signin from './pages/loginpage';
import Home from './pages/homepage';
import { fetchData } from "./redux/slice/statisticsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchData());
},[]);
  return (
    <div className="App">
      <Routes>
        <Route index element={<Signin/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
