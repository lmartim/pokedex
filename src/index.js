import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import WebFont from 'webfontloader';

import App from './App';

WebFont.load({
  google: {
    families: [
      'Titillium Web:300,400,800',
      'Roboto:400,800',
      'sans-serif'
    ]
  }
});

// Englobamento a aplicação dentro diversos HOC:
// Provider para o store
// BrowserRouter para o roteamento
// PersistGate para a persistência do estado
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
