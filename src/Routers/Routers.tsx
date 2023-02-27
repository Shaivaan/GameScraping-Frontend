import React from 'react';
import {Route,Routes} from "react-router-dom";
import Game from '../Screens/Game/Game';
import Home from '../Screens/Home/Home';

function Routers() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/data' element={<Game/>}/>
    </Routes>
  )
}

export default Routers;