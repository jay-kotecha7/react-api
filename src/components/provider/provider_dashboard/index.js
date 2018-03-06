import React, { Component } from 'react';
import ProviderAppbar from './provider_Appbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import logo from './logo.svg';
//import './App.css';

class ProviderHome extends Component {
  render() {
    return(
    <MuiThemeProvider>
      <ProviderAppbar />
    </MuiThemeProvider>
    );
  }
}

export default ProviderHome;
