import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGame from "./components/CreateGame";
import GameRoom from "./components/GameRoom";

function App() {


  // Make the function wait until the connection is made...
  function waitForSocketConnection(socket, callback) {
    setTimeout(function () {
      if (socket.readyState === 1) {
        if (callback != null) {
          callback();
        }
      } else {
        waitForSocketConnection(socket, callback);
      }
    }, 5); // wait 5 milisecond for the connection...
  }

  // not secure
  const socket = new WebSocket("ws://localhost:8080/ws");
  socket.onerror = function () {
    console.log("Connection failed.");
  };
  socket.onopen = function () {
    console.log("Connection established.");
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={(props) => (
              <CreateGame
                {...props}
                socket={socket}
                waitForSocketConnection={waitForSocketConnection}
              />
            )}
          />
          <Route
            exact
            path={"/roomID/:room"}
            render={(props) => (
              <GameRoom {...props} socket={socket} waitForSocketConnection={waitForSocketConnection} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
