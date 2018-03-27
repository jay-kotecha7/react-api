import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux'
import { addRole,fetchUser } from '../../actions/index';
import _ from 'lodash';

// import { withRouter } from "react-router-dom";

class SelectRoleContainer extends React.Component {

  constructor() {
    super();
    this.state = {
      open: true,
      value: 0, 
    };
  }

    componentDidUpdate(){
     console.log('userData ',this.props.userData)
    }

  handleClose = () => {

    switch (this.state.value) {
        case 1: {
         // var business_name = _.map(this.props.user, user1 => user1.business_name);
         var { business_name } = this.props.user
          console.log('business_name: ',business_name);
          if(business_name==null) {
            this.props.history.push('/provider/Business_Setup/set_business');
          }else {
            this.props.history.push('/home/Dummy');
          }
        break;
        }

      case 2: {
        this.props.history.push('/customer/customer_dashboard/customer_homepage');
        break;
      }

      default:
      
    }
};

  handleChange = (event, index, value) => {
    var data= {
      user_id:this.props.userData.user.userId,
      role_id: value,
    }
      this.props.addRole(data);
      this.setState({ value });
      this.props.fetchUser(this.props.userData.user.userId);
  }

  render() {

    

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
          title="WHO ARE YOU?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <SelectField
            floatingLabelText="Select Role"
            value={this.state.value}
            onChange={this.handleChange}
          >
          <MenuItem value={0} primaryText="None" />
          <MenuItem value={1} primaryText="Provider" />
          <MenuItem value={2} primaryText="Customer" />
        </SelectField>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
  return {
    addRole: addRole,
    fetchUser:fetchUser
  }
}


export default connect (mapStateToProps,mapDispatchToProps)(SelectRoleContainer);
