import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App';
import Hero from './components/Hero';
import Spell from './components/Spell';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
  },
  {
  	path: "hero",
  	element: <Hero />
  },
  {
  	path: "spells",
  	element: <Spell />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  	<RouterProvider router={router} />
  </React.StrictMode>
);
