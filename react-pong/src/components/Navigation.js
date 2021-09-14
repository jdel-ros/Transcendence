import React from "react";
import	{NavLink} from "react-router-dom";



const Navigation = () => {

	function side(){
	const sideBar = document.getElementById('side-bar');

	sideBar.classList.toggle('active');

	const content = document.querySelector('.content');

	content.addEventListener('click', () => {
	  sideBar.classList.remove('active');
	})}

	//ICI pour les page selectione

	function P_user(){
		const user_bar= document.getElementById('user-bar');

		user_bar.classList.toggle('profile_open');

		const content = document.querySelector('.content');
		content.addEventListener('click', () => {
			user_bar.classList.remove('profile_open');
		  })
	}
	return (
		<div className="navigation">
			<div id="top-bar">
				<div id="side-bar">
					<div className="toggle-button" id="toggle-button" onClick={side}>
						<span></span>
						<span></span>
						<span></span>
					</div>

					<ul>

							<NavLink exact to="/" className="menu-lien">
								<img src="../img/home.svg" 	alt="Home" className="img-menu"/>
								Home
							</NavLink>

							<NavLink exact to="/#box-game" className="menu-lien"><img src="../img/console.svg" alt="Game" className="img-menu"/>Game</NavLink>

							<NavLink exact to="/Leaderbord" className="menu-lien"><img src="../img/podium.svg" alt="Leaderbord" className="img-menu"/>Leaderbord</NavLink>

							<NavLink exact to="/Achivement" className="menu-lien"><img src="../img/trophee.svg" alt="Trophee" className="img-menu"/>Achivement</NavLink>

							<NavLink exact to="/Live" className="menu-lien"><img src="../img/live-streaming.svg" alt="Live" className="img-menu"/>Live</NavLink>
					</ul>
				</div>

				<li className="top-lien" id="logo"><NavLink exact to="/"><img src="../img/logo-3.svg" alt="logo" id="logo-img"/> <li id="name-site"> PONGO </li></NavLink></li>
				<div className="top-lien" id="profile" onClick={P_user}>
					<span id="profile-nav">Username</span>
					<div id="profile_img" style= {{backgroundImage: "url(../img/manaccac.png)"}}></div>
				</div>

				<li className="top-lien" id="useronline"> <img src="../img/user_icon.svg" alt="user_online"/> 0</li>

				<div id="user-bar">
					<li>Profile</li>
					<li>Logout</li>
				</div>
			</div>
		</div>
	);
};


/*

							<NavLink exact to="/" className="menu-lien">
								<img src="../img/home.svg" 	alt="Home" className="img-menu"/>
								Home
							</NavLink>
 */
export default Navigation;
