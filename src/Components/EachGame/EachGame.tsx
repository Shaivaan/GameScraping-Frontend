import { Box } from '@mui/material';
import { Link } from 'react-router-dom'
import style from "./EachGame.module.css";

function EachGame({game}:any) {

  // Extract the last path segment (20264)
const lastIndex = game.game_link.lastIndexOf("/");
const gameId = game.game_link.substring(lastIndex + 1);

// Extract the second to last path segment (hogwarts-legacy)
const secondLastIndex = game.game_link.lastIndexOf("/", lastIndex - 1);
const gameName = game.game_link.substring(secondLastIndex + 1, lastIndex);



  return (
   <>
   <Box className={style.eachGame}>
    <Link to={`/data/?game_name=${gameName}&game_id=${gameId}`}>
        {game.game_name}
    </Link>
   </Box>
   </>
  )
}

export default EachGame