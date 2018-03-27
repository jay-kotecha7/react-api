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
class Dummy1 extends React.Component{
    state={
        showCheckboxes:false
    }
    componentWillMount(){
        if(!localStorage.jwtToken){
            this.props.history.push('/');
        }
        else{
            return null
        } 
    }
    // handleChange = m => {
    //     this.setState({ m });
    //   };
    
    //   handleSave = () => {
    //     console.log('saved', this.state.m.format('llll'));
    //   };
   

    render(){
        let count= 0;
        const style = {
            card:{
                height: 60,
                width: '100%',
                textAlign: 'center',
                display: 'inline-block',
            },
            table:{
                padding:20,
                marginLeft:'5%',
                width: '90%',
                textAlign: 'center',
            }  
        };
        
        return (
            <div>
                
      
                    <Table style={style.table}>
                        <TableBody displayRowCheckbox={this.state.showCheckboxes} >
                          
                            <TableRow>
                                <TableRowColumn>This Week</TableRowColumn>
                                {/* <Divider /> */}
                                <TableRowColumn>{
                                    _.map( this.props.user.userAppointments, appt => {
                                        count++;
                                    })
                                }Appointments</TableRowColumn>
                                <TableRowColumn>Projected Revenue</TableRowColumn>
                                <TableRowColumn>Total Estimated</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>This Week</TableRowColumn>
                                {/* <Divider /> */}
                                <TableRowColumn>
                                    {count}</TableRowColumn>
                                <TableRowColumn>Projected Revenue</TableRowColumn>
                                <TableRowColumn>Total Estimated</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
         
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