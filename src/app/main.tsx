import ReactDOM from "react-dom/client";

import "../style/index.css";

import React from "react";

import Providers from "../components/providers/providers.tsx";
import Routes from "./routes/routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<Providers>
		<Routes />
	</Providers>,
	// {/* </React.StrictMode>, */}
);
