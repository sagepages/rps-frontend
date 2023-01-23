import React, { useState } from "react";
import PlayRoom from "./PlayRoom";
import WaitingRoom from "./WaitingRoom";
import "../css/GameRoom.css";
import ScoreBoard from "./ScoreBoard";

function GameRoom(props) {
  props.socket.onopen = () =>
    props.waitForSocketConnection(props.socket, function () {
      props.socket.send(
        JSON.stringify({ type: "AddToRoom", body: props.match.params.room })
      );
    });

  props.socket.onmessage = function (message) {
    console.log(message.data);

    let data = JSON.parse(message.data);

    switch (data.type) {
      case "RoomIsReady":
        updateRoomStatus();
        break;
      case "OpponentReady":
        updateOpponentStatus(true);
        break;
      case "RoundResult":
        setRoundResult(data.body.type);
        setOpponentMove(data.body.body.body);
        console.log(data.body.type === "win");
        if (data.body.type === "win") {
          increasePlayerScore();
        }
        if (data.body.type === "loss") {
          increaseOppScore();
        }
        setTimeout(() => {
          resetEverything();
        }, "3000");
        break;
      default:
        console.log("Default hit");
        console.log(JSON.parse(message.data));
        break;
    }
  };

  const getSubURL = () => {
    return window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
  };

  const [roomReady, setRoomReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [opponentMove, setOpponentMove] = useState("");
  const [playerMove, setPlayerMove] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [ending, setEnding] = useState("")

  const updateRoomStatus = () => {
    setRoomReady(true);
  };

  const updateOpponentStatus = (status) => {
    setOpponentReady(status);
  };

  const updatePlayerToRock = () => {
    setPlayerMove("rock");
    props.socket.send(
      JSON.stringify({
        type: "Move",
        body: { type: getSubURL(), body: "rock" },
      })
    );
  };
  const updatePlayerToScissors = () => {
    setPlayerMove("scissors");
    props.socket.send(
      JSON.stringify({
        type: "Move",
        body: { type: getSubURL(), body: "scissors" },
      })
    );
  };
  const updatePlayerToPaper = () => {
    setPlayerMove("paper");
    props.socket.send(
      JSON.stringify({
        type: "Move",
        body: { type: getSubURL(), body: "paper" },
      })
    );
  };

  const increasePlayerScore = () => {
    setPlayerScore(playerScore + 1);
  };

  const increaseOppScore = () => {
    setOppScore(oppScore + 1);
  };

  const checkForWinner = () => {
    if (playerScore === 2) {
      setEnding("Winner")
    }
    if (oppScore === 2) {
      setEnding("Loser")
    }
  };


  const resetEverything = () => {
    setOpponentMove("");
    setPlayerMove("");
    setRoundResult(null);
    setOpponentReady(false);
    checkForWinner();
  };

  return (
    <div className="container">
      {roomReady ? (
        <div className="container">
          {ending !== "" ? (
            <div className={ending === "Winner" ? "large-words win" : "large-words lose"}>{ending}!</div>
          ) : (
            <div className="container">
              <ScoreBoard oppScore={oppScore} playerScore={playerScore} />
              <PlayRoom
                opponentReady={opponentReady}
                playerMove={playerMove}
                roundResult={roundResult}
                opponentMove={opponentMove}
                updatePlayerToRock={updatePlayerToRock}
                updatePlayerToScissors={updatePlayerToScissors}
                updatePlayerToPaper={updatePlayerToPaper}
                setPlayerScore={setPlayerScore}
                setOppScore={setOppScore}
              />
            </div>
          )}
        </div>
      ) : (
        <WaitingRoom
          opponentReady={opponentReady}
          socket={props.socket}
          params={props.match.params.room}
          waitForSocketConnection={props.waitForSocketConnection}
        />
      )}
    </div>
  );
}

export default GameRoom;
