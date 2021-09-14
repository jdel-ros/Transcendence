import React from 'react';
import Pong from './components/Pong';
import GameMenu from './components/GameMenu';
import { io } from "socket.io-client";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MatchMaking from './components/MatchMaking';
import Home from './pages/Home';
import Achivement from './pages/Achivement';
import Leaderbord from './pages/Leaderbord';

export const socket = {
		game: io('http://localhost:3001/game', {
			transports: ['websocket']
			}),
		chat: io('http://localhost:3001/chat', {
			transports: ['websocket']
			}),
	};

console.count('renderApp.js')
const App = () => {
  return (
    <BrowserRouter>
    <Switch>
		<Route path="/" exact component={Home} />
		<Route path="/Achivement" exact component={Achivement} />
		<Route path="/Leaderbord" exact component={Leaderbord} />
		<Route path="/Live" exact component={Leaderbord} />
    <Route path="/gamemenu" exact component={GameMenu} />
    <Route path="/matchmaking/:matchtype" component={MatchMaking}/> {/*matchtype for different kind of games*/}
    <Route path="/game" exact component={Pong} />
    <Route path="/spectate/:roomid" exact component={Pong} />
    </Switch>
  </BrowserRouter>
  );
};

export default App;




