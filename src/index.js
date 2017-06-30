import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const MyApp = () => (
  /*<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>*/
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

var config = {

};
firebase.initializeApp(config);

ReactDOM.render(<MyApp />, document.getElementById('root'));
registerServiceWorker();
