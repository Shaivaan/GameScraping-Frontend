import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const API = import.meta.env.VITE_API;



const getGameData = (name:any,id:any) => {
    fetch(`${API}/individual/${name}/${id}`)
    .then((res)=>{
        res.json().then((res)=>{
            console.log(res);
        })
    })
    .catch((res)=>{
        console.log(res);
    })
}




function Game() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const gameName = params.get("game_name");
    const gameId = params.get("game_id")?.trim();
    const [gameData,setGameData] = useState();

    useEffect(()=>{
        console.log(gameName,gameId+"dsa","dsadasd");
        getGameData(gameName,gameId);
    },[])

  return (
    <>
        
    </>
  )
}

export default Game;