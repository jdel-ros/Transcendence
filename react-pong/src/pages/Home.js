import Body_home from "../components/Body_home";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

import React from "react";

const Home = () => {

	return (
		<div className="home">
			<Navigation />
			<Body_home />
			<Footer	/>
		</div>
	)
}

export default Home;