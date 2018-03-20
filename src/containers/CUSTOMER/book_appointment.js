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
import { Field, reduxForm} from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)
// const minAddress = minAddress => value => value && value.length < minAddress ? `Must be ${minAddress} characters or more` : undefined
// const minAddress10 = minAddress(10)
const minName = minName => value => value && value.length < minName ? `Must be ${minName} characters or more` : undefined
const minName3 = minName(3)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined


const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (         // Text Field Component
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
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

  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf('day');
  }

  const time = [                                                                          // List of time slots
    {value:0, name:'9 AM - 10 AM'},
    {value:1, name:'10 AM - 11 AM'},
    {value:2, name:'11 AM - 12 AM'},
    // {value:3, name:'Thursday'},
    // {value:4, name:'Friday'},
    // {value:5, name:'Saturday'},
    // {value:6, name:'Sunday'},
  ];
class BookAppointment extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
  };

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 4,
      }));
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  menuItems(time) {                                                                   // for displaying the list of time slots
    const {values} = this.state;
    return time.map((day) => (
      
      <MenuItem
        key={day.value}
        insetChildren={true}
        checked={this.state.values && values.indexOf(day.value) > -1}
        value={day.value}
        primaryText={day.name}
      />
    ));
  }


  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
            <div>
                  <Field
                    name="selected_service"
                    component={renderSelectField}
                    label="Services Provided by (Name)"
                  > 
                    <MenuItem value="service1" primaryText="Service 1" />
                    <MenuItem value="service2" primaryText="Service 2" />
                    <MenuItem value="service3" primaryText="Service 3" />
                  </Field>
            </div>
        );
      case 1:
        return (
            <div>
                <div>
                    <DatePicker hintText="Select Date" shouldDisableDate={disabledDate} />
                    {/* <br /> */}
                </div>
                    
                <div>
                <Field
                  name='time_slot'
                  multiple={false}
                  label="Select Time"
                  component={renderSelectField}
                >
                  {this.menuItems(time)}
                </Field>
                </div>
            </div>
        );
      case 2:
        return (

            <div>
                <div>
                    <Field
                        name="customer_name"
                        component={renderTextField}
                        validate={[minName3]}
                        label="Customer Name"
                    />
                </div>
                <div>
                  <Field
                    name="contact_no"
                    component={renderTextField}
                    validate={[number,maxLength15,minLength10]}
                    label="Contact Number"
                  />
              </div>
              <div>
                    <Field
                        name="email"
                        component={renderTextField}
                        validate={[minName3]}
                        label="E-mail"
                    />
              </div>
            </div>
        );
    case 3:
        return (
          <p>
            Display Information Data here
          </p>
        );
    case 4:
        return (
          <p>
           Book BookAppointment button -> Confirmation Message
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        </div>
      );
    }

    return (
    <form>
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 4 ? 'Finish' : 'Next'}
            primary={true}
            onClick={this.handleNext}
          />
        </div>
      </div>
    </form>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
    <form>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
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
            <StepLabel>Your Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Confirm Booking</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    </form>
    );
  }
}

export default reduxForm({
    form: 'BookAppointment', // a unique identifier for this form
  })(BookAppointment)