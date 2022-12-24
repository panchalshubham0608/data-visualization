import React from "react";
import MatrixVisualizer from "./components/MatrixVisualizer";

import {
	HashRouter as Router,
	Routes,
	Route,
 } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
	return (
		<div className="container mt-5">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/matrix-visualizer" element={<MatrixVisualizer />} />
				</Routes>
			</Router>
		</div>
	)
};