import React, { Component } from 'react';
import ProviderAppbar from './provider_Appbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import logo from './logo.svg';
//import './App.css';

class  extends Component {
  render() {
    return(
    <MuiThemeProvider>
      <ProviderAppbar />
    </MuiThemeProvider>
    );
  }
}

export default App;
