import React from "react";
import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client';


import App from './App'
import './styles/tailwind.css'

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <App tab="home" />
    </BrowserRouter>
);