import React from "react";
import "../css/WaitingRoom.css";

function WaitingRoom(props) {

  props.socket.onopen(() => {
    props.waitForSocketConnection(props.socket, function () {
      props.socket.send(
        JSON.stringify({ type: "AddToRoom", body: props.params })
      );
    });
  });

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="container">
      <p className="big-text">
        Click the link to Copy and send to your opponent
      </p>
      <br />
      <button
        className="link-text"
        onClick={() => copyToClipboard(window.location.href)}
      >
        {window.location.href}
      </button>
    </div>
  );
}

export default WaitingRoom;
