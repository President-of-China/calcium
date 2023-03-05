import React, { useState, useEffect } from "react";

import { shortcuts } from "./global";
import { Mode } from "./types";

// Layout
import "katex/dist/katex.min.css"
import "./style/layout.less";

// Components
import Sidebar from "./components/sidebar";
import Calculator from "./components/Calculator";
import StatusBar from "./components/statusbar";

// Contexts
import MainContext from "./contexts/MainContext";

const App: React.FC = () => {
	const [mode, setMode] = useState<Mode>(Mode.GENERAL);

	useEffect(() => {
		document.body.addEventListener("keydown", (e: KeyboardEvent) => {
			shortcuts.forEach((shortcut, key) => {
				if(e.ctrlKey && key.includes("ctrl") && key.includes(e.key)) {
					e.preventDefault();
					shortcut.action();
					return;
				}
				if(e.shiftKey && key.includes("shift") && key.includes(e.key)) {
					e.preventDefault();
					shortcut.action();
					return;
				}
			});
		});
	}, []);

	return (
		<>
			<main className="calcium">
				<MainContext.Provider value={{ mode, setMode }}>
					<div className="app">
						<Sidebar/>
						<Calculator/>
					</div>
					<StatusBar />
				</MainContext.Provider>
			</main>
			<p className="no-mobile">Please open the app in your computer!</p>
		</>
	);
}

export default App;
