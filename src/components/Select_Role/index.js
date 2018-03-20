import React from 'react';
import SelectRoleContainer from '../../containers/SELECT_ROLE/select_role';
import NavigationBar from '../NavBar'
import {BrowserRouter, Route} from 'react-router-dom'
import Switch from 'react-router-dom/Switch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from "react-router-dom";
// require('../../scss/style.scss');
 export default class SelectRole extends React.Component{
    render(){
        return(
            <MuiThemeProvider>
                <BrowserRouter>
                    <div>
                        <NavigationBar />
                        <SelectRoleContainer history={this.props.history} />
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )    
    }
}

