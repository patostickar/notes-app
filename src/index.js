import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { setupStore } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
