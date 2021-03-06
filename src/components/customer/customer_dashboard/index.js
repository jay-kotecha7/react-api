import React from 'react';
import CustomerHomePage from '../../../containers/CUSTOMER/customer_homepage';
import NavigationBar from '../../NavBar'
import {BrowserRouter, Route} from 'react-router-dom'
import Switch from 'react-router-dom/Switch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";
// require('../../scss/style.scss');
 export default class CustomerHomePageComponent extends React.Component{
    render(){
        return(
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <NavigationBar history={this.props.history}/>
                        <CustomerHomePage history={this.props.history} />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )    
    }
}

