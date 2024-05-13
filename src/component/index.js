// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './Reducer';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit"
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
	reducer: rootReducer,
})

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
reportWebVitals();
