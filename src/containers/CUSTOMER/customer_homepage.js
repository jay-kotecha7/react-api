import React from 'react';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CustomerHomepage extends React.Component{
    constructor() {
        super();
        this.state = {
          open: true,
          value: 0,   
        };
      }
   
    handleClose = () => {
        // switch (this.state.value) {
        //     case 1: {
        //       var business_name = _.map(this.props.user, user1 => user1.business_name);
        //       console.log('business_name)',business_name);
        //       if(business_name=='') {
        //         this.props.history.push('/provider/Business_Setup/set_business');
        //       }else {
        //         this.props.history.push('/home/Dummy');
        //       }
        //     break;
        //     }
    
        //   case 2: {
        //     this.props.history.push('/customer/customer_dashboard/customer_homepage');
        //     break;
        //   }
    
        //   default:
          
        // }
    };

    handleChange = (event, index, value) => {
        // var data= {
        //   user_id:this.props.userData.user.userId,
        //   role_id: value,
        // }
    
        //   this.props.addRole(data);
        //   this.setState({ value });
      }
    
    render(){

        const actions = [
            <FlatButton
              label="Ok"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="WHAT ARE YOU LOOKING FOR?"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <SelectField
                        floatingLabelText="Select Category"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={0} primaryText="None" />
                        <MenuItem value={1} primaryText="Clinics" />
                        <MenuItem value={2} primaryText="Hair Saloons" />
                        <MenuItem value={3} primaryText="Law Firms" />
                        {/* <MenuItem value={3} primaryText="Law Firms" /> */}
                    </SelectField>
                </Dialog>
            </div>
        )
    }
}