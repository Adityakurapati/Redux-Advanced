import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/query/react'; // Correct import path
import { apiSlice } from './features/api/apiSlice';

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
        <React.StrictMode>
                <ApiProvider api={ apiSlice }>
                        <App />
                </ApiProvider>
        </React.StrictMode>
);
