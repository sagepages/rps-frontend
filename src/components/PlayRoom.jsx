import React from "react";
import "../css/PlayRoom.css";

const PlayRoom = (props) => {
  return (
    <div className="playroom-banner">
      {props.roundResult === null ? (
        <div className="playroom-banner">
          <div className="player-side">
            {props.playerMove === "" ? (
              <div className="player-side-result">
                <p className="opp-text">Your Choice:</p>
                <div className="move-choice">
                  <button onClick={props.updatePlayerToRock}>
                    <img src="/rock_150x150.jpeg" alt="rock" />
                  </button>
                  <button onClick={props.updatePlayerToPaper}>
                    <img src="/paper_150x150.jpeg" alt="paper" />
                  </button>
                  <button onClick={props.updatePlayerToScissors}>
                    <img src="/scissors_150x150.jpeg" alt="scissors" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <svg className="animated-check" viewBox="0 0 24 24">
                  <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />{" "}
                </svg>
                <p className="opp-text">You chose: {props.playerMove}</p>
              </div>
            )}
          </div>
          <div className="divider"></div>
          <div className="opp-side">
            {props.opponentReady ? (
              <div className="opp-side-container">
                <div>
                  {" "}
                  <svg className="animated-check" viewBox="0 0 24 24">
                    <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" />{" "}
                  </svg>
                  <p className="opp-text">Opponent is ready</p>
                </div>
              </div>
            ) : (
              <div className="opp-side-container">
                <div className="lds-dual-ring" />
                <p className="opp-text">Opponent is choosing . . .</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="playroom-banner">
          <div className="player-side-result">
            <p className="opp-text">Round Result: </p>
            <p className="result-text">{props.roundResult}</p>
            <p className="opp-text">Your Choice:</p>
            <img
              src={`/${props.playerMove}_150x150.jpeg`}
              alt={props.playerMove}
            />
          </div>
          <div className="divider" />
          <div className="opp-side-result">
            <p className="opp-text">Opponent Choice: </p>
            <img
              src={`/${props.opponentMove}_150x150.jpeg`}
              alt={props.opponentMove}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayRoom;
