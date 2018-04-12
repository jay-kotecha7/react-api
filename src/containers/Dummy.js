import React from 'react';
import ReactTimeslotCalendar from 'react-timeslot-calendar';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { connect } from 'react-redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import _ from 'lodash'

// import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
// import Sidebar from 'react-bootstrap-sidebar';

class Dummy1 extends React.Component{
    componentWillMount(){
        if(!localStorage.jwtToken){
            this.props.history.push('/');
        }
        else{
            return null
        } 
    }

    constructor(props) {
        super(props);
 
        this.state = {
          isVisible: false,
        };
    }
 
    updateModal(isVisible) {
    	this.state.isVisible = isVisible;
      this.forceUpdate();
    }
 
    render() {
        return (
              <div>
                  YO
              </div>
        );
    }
    }


const mapStateToProps = (state) => {
    console.log('in Dummy , redux state',state);
      return {
          userData: state.userData,
          user:state.user
      };
  };

  export default connect (mapStateToProps,null)(Dummy1);