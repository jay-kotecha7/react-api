import React from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from "material-ui/DropDownMenu";
import _ from 'lodash'
import { fetchBusinessList, selectBusiness } from '../../actions/index'
import { Link } from 'react-router-dom';

class CustomerHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      openBusinessMenu: false,
      business1: ""
    };
  }

  handleChange = (event, index, value) => {
    this.setState({ value });
    this.props.fetchBusinessList(value);
    // .then( () => this.setState( () => ({
    //             openBusinessMenu:true
    //         })
    //     )
    // )
    this.setState({ openBusinessMenu: true });
  };
  renderServices(business) {
      console.log('called renderserives')
      this.props.selectBusiness(business);
      this.props.history.push('/customer/book_app')
        // <Link to={{
        //     pathname: '/customer/book_app',
        //     // search: '?sort=name',
        //     // hash: '#the-hash',
        //     state: { business: business }
        // }}/>
  }
  renderBusinesses() {
    return _.map(this.props.business, business => {
      return (
        <li 
            className="list-group-item" 
            key={business.userId} 
           // onClick={() => {this.props.selectBusiness(business)}}
           onClick={
               () => { this.renderServices(business) }
            }
        >
          {business.business_name}
        </li>
      );
    });
  }

  render() {
    return <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange} openImmediately={true}>
          <MenuItem value={0} primaryText="None" />
          <MenuItem value={1} primaryText="Clinic" />
          <MenuItem value={2} primaryText="Hair Saloon" />
          <MenuItem value={3} primaryText="Law Firm" />
          {/* <MenuItem value={5} primaryText="Weekly" /> */}
        </DropDownMenu>

        {this.state.openBusinessMenu && <ul className="list-group">
            {this.renderBusinesses()}
          </ul>}
      </div>;
  }
}

function mapStateToProps(state) {
    return {
        business:state.business
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        fetchBusinessList: fetchBusinessList,
        selectBusiness:selectBusiness
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHomepage)