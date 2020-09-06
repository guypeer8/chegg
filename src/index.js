import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocationProvider } from '@reach/router';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import App from './App';
import store from './store';
import theme from './layouts/config/theme';
import * as serviceWorker from './serviceWorker';

import './index.css';

const RootApp = () => (
  <Provider store={store}>
    <LocationProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </LocationProvider>
  </Provider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
