import React from "react";
import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom";
import Login from './src/login';
import "./app.css"
import Signup from "./src/Signup";
import Dashboard from "./src/Dashboard";
import PageNotFound from "./src/pageNotFound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const authToken = localStorage.getItem("authToken")?localStorage.getItem("authToken"):null
	return (
		<>
		 <ToastContainer />
			<BrowserRouter>
				<Routes>
					{authToken ?
						<Route path="/dashboard" element={<Dashboard />}></Route>
						:
						<>
							<Route path="/" element={<Login />}></Route>
							<Route exact path="/sign_up" element={<Signup />}></Route>
						</>
					}
					<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;