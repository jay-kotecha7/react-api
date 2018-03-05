import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import AppBar from 'material-ui/AppBar';
class ProviderAppbar extends Component{
render(){
    return(
        <div>
           <AppBar
                title="Provider Name"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        </div>
    );
}
}
export default ProviderAppbar