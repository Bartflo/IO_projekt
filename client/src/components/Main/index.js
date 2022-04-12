import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./styles.css"

const Main = () => {

	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	
	return (
		<div className="main_container">
			
			<div className="centered">
			
		</div>
		</div>
	);
};

export default Main;
