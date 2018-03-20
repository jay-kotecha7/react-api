import React from 'react';
import SetupBusinessForm from '../../../containers/PROVIDER/set_business';
import NavigationBar from '../../NavBar'
import {BrowserRouter, Route} from 'react-router-dom'
import Switch from 'react-router-dom/Switch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";
// require('../../scss/style.scss');
 export default class SetupBusinessFormComponent extends React.Component{
    render(){
        return(
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <NavigationBar history={this.props.history}/>
                        <SetupBusinessForm history={this.props.history} />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )    
    }
}

