import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import {store} from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import PageNotFound from './components/not-found/Page-notfound.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound/>
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
