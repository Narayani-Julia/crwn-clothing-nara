import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from './store/store';
import {Elements} from '@stripe/react-stripe-js';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { stripePromise } from './utils/stripe/stripe.utils';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      {/* loading is a component that renders when youre tryna rehydrate the store */}
      <PersistGate loading = {null} persistor={persistor}>
      <BrowserRouter>
      <Elements stripe={stripePromise}>
            <App />
            </Elements>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);