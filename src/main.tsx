import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router";
import { router } from "./Routes.tsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";
import { rootReducer } from "./redux/rootReducer.ts";

const store = configureStore({ reducer: rootReducer });
// Todo: Add ErrorBoundary

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ReduxProvider store={store}>
			<RouterProvider router={router} />
		</ReduxProvider>
	</StrictMode>
);
