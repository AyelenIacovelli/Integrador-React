import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import "remixicon/fonts/remixicon.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer
            theme='dark'
            position='top-right'
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
          />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>


  </React.StrictMode>
);
