import React from 'react'

import styles from "./styles.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<nav className="navbar">
				<h1>Aplikacja</h1>
				<button className="btn_logout" onClick={handleLogout}>
					Wyloguj
				</button>
			</nav>
		</div>
	);
};

export default Main;
