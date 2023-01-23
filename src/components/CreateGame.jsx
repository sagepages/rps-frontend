import React from "react";
import { useHistory } from "react-router-dom"
import "../css/CreateGame.css"


function CreateGame(){

  const history = useHistory()

  function generateRoomID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  const rerouteToGameLobby = () =>{
    const roomID = generateRoomID(5)
    history.push(`/roomID/${roomID}`)
  }

  return (
  <div className="container">
      <div className="banner">
        <button className="create-game-button" onClick={() => {rerouteToGameLobby()}}>Create Random Game</button>
      </div>
  </div>
  )
}

export default CreateGame
