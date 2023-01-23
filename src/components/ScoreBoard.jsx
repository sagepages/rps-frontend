import React from "react";
import "../css/ScoreBoard.css";

function ScoreBoard(props) {
  return (
    <div>
      <div className="board">
        <div className={props.playerScore === 1 || props.playerScore === 2 || props.playerScore === 3 ? "dot-left dot-filled-player" : "dot-left"}/>
        <div className={props.playerScore === 2 || props.playerScore === 3 ? "dot-left dot-filled-player" : "dot-left"}/>
        <div className={props.playerScore === 3 ? "dot-left dot-filled-player" : "dot-left"}/>
        <div className="border-bar"/> 
        <div className={props.oppScore === 1 || props.oppScore === 2 || props.oppScore === 3 ? "dot-right dot-filled-opp" : "dot-right"}/>
        <div className={props.oppScore === 2 || props.oppScore === 3 ? "dot-right dot-filled-opp" : "dot-right"}/>
        <div className={props.oppScore === 3 ? "dot-right dot-filled-opp" : "dot-right"}/>
      </div>
    </div>
  );
}

export default ScoreBoard;
