import ReactDOM from 'react-dom'
import { withProvider, createStore } from 'react-redux-magic-reducer';

import reducers from './reducers/index';

import './index.css'
import App from './App'

let store = createStore(reducers);

// This is now migrated to better way with withProvider
// import React from 'react'
// import { Provider } from 'react-redux';
// let withAppProvider = (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );


ReactDOM.render(withProvider(App, { store: store}), document.getElementById('root'))
