import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
