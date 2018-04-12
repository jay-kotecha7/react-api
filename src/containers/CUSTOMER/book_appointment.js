import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';
import { Field, reduxForm,  formValueSelector, FieldArray } from "redux-form";
import { connect } from 'react-redux'
import moment from 'moment';
import { fetchUser,createAppt,fetchAllAppointments } from '../../actions/index';
import select_role from '../SELECT_ROLE/select_role';
const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: "center",
  display: "inline-block"
};

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)
// const minAddress = minAddress => value => value && value.length < minAddress ? `Must be ${minAddress} characters or more` : undefined
// const minAddress10 = minAddress(10)
const minName = minName => value => value && value.length < minName ? `Must be ${minName} characters or more` : undefined
const minName3 = minName(3)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const renderContact = (
    { input, label, meta: { touched, error }, ...custom } // Text Field Component
  ) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );
const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (         // Text Field Component
    <TextField
      hintText={label}
      id={label}
      defaultValue={label}
      errorText={touched && error}
      {...custom}
    />
  )
const renderSelectField = ({                                                            // Dropdown lists
    input,
    label,
    meta: {touched, error},
    children,
    ...custom
    }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value,payload) => {
        input.onChange(value)                       
      }}
  
      children={children}
        {...custom}                         //
        />
  )

  function convertHours(mins){
    var hour = Math.floor(mins/60);
    var mins = mins%60;
    var converted = pad(hour, 2)+':'+pad(mins, 2);
    return converted;
  }

  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function intoMin(stringTime){
      var hourMin = [];
      var hourMin = stringTime.split(':');
      var hour = parseInt(hourMin[0]);
      var min =  parseInt(hourMin[1]);
      var  hoursInMins = hour * 60;
      return hoursInMins + min;
    }

class BookAppointment extends React.Component {
  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
    open: false

  };
  componentWillMount() {
    this.props.fetchUser(this.props.userData.user.userId);
    this.props.fetchAllAppointments();
  }

  renderDatePicker = ({ input, label, meta: { touched, error }, ...custom,props }) => {
    return (
      <div>
        <DatePicker 
          {...input} 
          {...custom} 
          floatingLabelText={label}
          //onClick={() => fields.push({})}
          shouldDisableDate={this.disabledDate}
          minDate={ new Date()}
          value={ input.value !== '' ? input.value : null }
          onChange={(event, value) => input.onChange(value)}
        />
    </div>
  );
};

    disabledDate = (date) => {
     // Can not select days before today

      const x = [];
      const { schedules } = this.props.business
      const week_days = schedules.map(schedule => schedule.week_days);
      const days = week_days.map(day=>{
          for(let i=0;i<7;i++){
          x[i] = _.nth(day,i)
       } 
       
      });
      return date.getDay() === x[0] || date.getDay() === x[1] || date.getDay() === x[2] || date.getDay() === x[3] || date.getDay() === x[4] || date.getDay() === x[5] || date.getDay() === x[6]
  }

  dummyAsync = cb => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };
   handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 3
        })
      );
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex - 1
        })
      );
    }
  };
 
   menuItems(time) {                                                                   // for displaying the list of time slots
    const {values} = this.state;
   // if(appointmentDate){
    return time.map((day) => (
      <MenuItem
        key={day}
        insetChildren={true}
        checked={this.state.values && values.indexOf(day) > -1}
        value={day}
        primaryText={day}
      />
    ));
  //}
}

  getStepContent(stepIndex) {
    const { services } = this.props.business;
    let { name: customerName, email: customerEmail } = this.props.customer;
    const { appointmentDate,datepickerdate } = this.props

    switch (stepIndex) {
      case 0:        
        return (
          <div>
            <Field
              name="selected_service"
              component={renderSelectField}
              label="Services Provided by (Name)"
            >
              {services &&
                _.map(services, service => {
           
                  return (
                    <MenuItem
                      key={service.service_id}
                      value={service.service_id}
                      primaryText={service.service_name}
                      secondaryText={service.service_duration+' '+'mins'}
                    />
                  );
                })}
            </Field>
          </div>
        );
      case 1:
        const { schedules } = this.props.business;
        const {datepickerdate } = this.props;
        console.log('schedules',schedules)
        console.log('appointments', this.props.appointment)
        console.log('datepickerdate',datepickerdate)
        const start = schedules.map(( schedule) => schedule.start_hour), end = schedules.map((schedule)=>schedule.end_hour);
        var total_start= (new Date(start).getHours() * 60) + (new Date(start).getMinutes());
        var total_end= (new Date(end).getHours() * 60) + (new Date(end).getMinutes());
        var interval = 30;
        function calculate_time_slot(total_start,total_end, interval = "30"){
          var time_slots = new Array();
          for(var i=total_start; i<=total_end; i = i+interval){
            time_slots.push(convertHours(i));
          } 
        return time_slots;
        console.log('slot',time_slots)
        }
        var startTimeArr = calculate_time_slot(total_start,total_end, interval);

      return (
          <div>
            <div>
              <Field
                name='appointmentDate'
                label="Select Date"
                component={this.renderDatePicker}
              />
            {   // Creating array of startTime and endTIme of the booked appointments
                _.map( this.props.appointment, appt => {
                  var date1 = new Date(appointmentDate).getDate();
                  var date2 = new Date(appt.appointmentDate).getDate();
                  var displayArray = new Array();
                  console.log('selected Date',date1);
                  console.log('Dates from the appt table',date2)
                  console.log('appt: ',appt)
                  if(date1===date2) {
                    console.log('matched')
                    if(appt.status==='booked'){                    
                      var selectedStartTimeArr = appt.start_time;
                      var selectedEndTimeArr = appt.end_time;
                      console.log('start time, end time',selectedStartTimeArr,selectedEndTimeArr);
                      var diff = intoMin(selectedEndTimeArr) - intoMin(selectedStartTimeArr);
                      console.log('diff',diff)
                      if(diff>interval){
                        var x = (Math.floor(diff/interval))+ 1 ;
                        console.log('index value of',startTimeArr.indexOf(selectedStartTimeArr));
                        startTimeArr.splice(startTimeArr.indexOf(selectedStartTimeArr),x);
                        console.log('spliced array',startTimeArr)
                      }
                      else if(diff<=interval){
                          startTimeArr.splice(startTimeArr.indexOf(selectedStartTimeArr),1);
                      }
                      else{console.log('in else')}
                    }
                  }                 
                })            
              }
               {/* {compareArray()} */}
            </div>
                {/* {console.log('New Array', newArray)} */}
            <div>
              <Field
                name="start_time"
                multiple={false}
                label="Select Time"
                component={renderSelectField}
              > 
                 {this.menuItems(startTimeArr)}
              </Field>
            </div>
          </div>
        );
        
      case 2:
        return <div>
            <div>
              <Field name="name" component={renderTextField} validate={[minName3]} label={customerName} />
            </div>
            <div>
              <Field name="contact_no" component={renderContact} validate={[number, maxLength15, minLength10]}  />
            </div>
            <div>
              <Field name="email" component={renderTextField} validate={[minName3]} label={customerEmail} />
            </div>
          </div>;
      case 3:
        const { business_name,business_category } = this.props.business;
        const { selected_service,start_time } = this.props;
        const { contact_no: customerContact } = this.props;
        let displayServiceName;
        let displayServiceDuration;
        let totalMins,end_time;

        { selected_service && services.map((service) => {
            if(selected_service==service.service_id) {
              displayServiceName = service.service_name; 
              displayServiceDuration = service.service_duration;
              var arr = start_time.split(':')
              var start_hr = arr[0] * 60;
              var total_start= start_hr + parseInt(arr['1']) + parseInt(service.service_duration);
              end_time = convertHours(total_start);   
            } 
          })
        } 
        return ( <div>
                    <div> 
                        Services : {displayServiceName} &nbsp; {displayServiceDuration+' '+'mins'} <br/>
                        Provider : {business_name} &nbsp; {business_category} <br/>
                        Date And Time : {appointmentDate.toString()} &nbsp;&nbsp;{start_time}&nbsp;&nbsp;<div className="end_time">{end_time}</div><br/> 
                        Your Info : {customerName} &nbsp; {customerContact} &nbsp; {customerEmail} <br/>
                    </div>
                    {/* <RaisedButton
                              label="Edit"
                              primary={true}
                              onClick={event => {
                              event.preventDefault();
                              this.setState({ stepIndex: 0, finished: false });
                          }}
                    />                       */}
              </div>
            )

    }
  }
   handleFinalSubmit = (values) => {
     const { services } = this.props.business;
     const { stepIndex } = this.state;
     let end_time;
      function convertHours(mins){
            var hour = Math.floor(mins/60);
            var mins = mins%60;
            var converted = pad(hour, 2)+':'+pad(mins, 2);
            return converted;
          }
          function pad (str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
          }
          services.map((service) => {
            if(values.selected_service==service.service_id) {
              var arr = values.start_time.split(':')
              var start_hr = arr[0] * 60;
              var total_start= start_hr + parseInt(arr['1']) + parseInt(service.service_duration);
              end_time = convertHours(total_start);       
            } 
          })

    const data = {
      customerId: this.props.customer.userId,
      businessId: this.props.business.userId,
      values: values,
      end_time:end_time
    };
    console.log('submit data',data)
    this.props.createAppt(data)
    this.setState({ open: true})
    // this.props.createAppt(data, () => {
    //   this.props.history.push("/home/Dummy");
    // });
    this.setState({
      loading: false,
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3
    })
  };
  renderContent() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px", overflow: "hidden" };
    const { handleSubmit, pristine, reset, submitting } = this.props;

    if (finished) {
      //this.handleFinalSubmit.bind(this)
      return (
        <div>
        <div> Your Appointment is Booked.</div>
        <div>
          <RaisedButton
              disabled={stepIndex != 4}
              label="BOOK ANOTHER APPOINTMENT"
              primary={true}
              // onClick={event => { reset:true
              //   event.preventDefault();
              //   this.setState({stepIndex: 0 , finished: false});
              // }}
              onClick={(event)=>{this.props.history.push('/customer/customer_dashboard/customer_homepage')}}
              style={{ marginRight: 12 }}
            />
        </div>
        </div>
      );
    }


    return (
      <form>
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{ marginTop: 24, marginBottom: 12 }}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{ marginRight: 12 }}
            />

            <RaisedButton
              disabled={stepIndex != 3}
              label="Edit"
              primary={true}
              onClick={event => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              }}
              style={{ marginRight: 12 }}
            />
            <RaisedButton
              label={stepIndex === 3 ? "Finish" : "Next"}
              primary={true}
              onClick={stepIndex === 3 ? handleSubmit(this.handleFinalSubmit.bind(this)) : this.handleNext}
              //onClick={this.handleFinalSubmit}
            />
            
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { loading, stepIndex } = this.state;
    return (
      
        <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Service</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Date and Time</StepLabel>
            </Step>
            <Step>
              <StepLabel>Enter Customer Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Confirm Booking</StepLabel>
            </Step>
            <Step>
              <StepLabel>Completed</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: fetchUser,
    createAppt:createAppt,
    fetchAllAppointments:fetchAllAppointments
  }
}
BookAppointment = reduxForm({
  form: 'BookAppointment'
   // a unique identifier for this form
})(BookAppointment)

// Decorate with connect to read form values
const selector = formValueSelector("BookAppointment"); // <-- same as form name

export default connect(state => {
  const selected_service = selector(state, 'selected_service');
  const appointmentDate = selector(state,'appointmentDate' );
  const time_slot = selector(state,'time_slot');
  const start_time = selector(state,'start_time');
  const contact_no = selector(state,'contact_no');
  const datepickerdate = selector(state, 'datepicker');
 
  return {
    business:state.business,
    userData: state.userData,
    customer: state.user,
    appointment:state.appointment,
    selected_service,
    appointmentDate,
    start_time,
    contact_no,
    datepickerdate

  };
}, mapDispatchToProps)(BookAppointment);
  