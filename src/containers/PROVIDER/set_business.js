import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField';
import validate from './validation'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import { connect } from 'react-redux';
import { setupBusiness } from "../../actions/index";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import _ from 'lodash';
import TimePicker from 'material-ui/TimePicker';

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)
const minAddress = minAddress => value => value && value.length < minAddress ? `Must be ${minAddress} characters or more` : undefined
const minAddress10 = minAddress(10)
const minName = minName => value => value && value.length < minName ? `Must be ${minName} characters or more` : undefined
const minName3 = minName(3)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined



const renderCheckbox = ({input, label}) => (                                            // CheckBox Component
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
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
    {...custom}
  />
)

const days = [                                                                          // List of Days
  {value:0, name:'Sunday'},
  {value:1, name:'Monday'},
  {value:2, name:'Tuesday'},
  {value:3, name:'Wednesday'},
  {value:4, name:'Thursday'},
  {value:5, name:'Friday'},
  {value:6, name:'Saturday'},
];

class SetupBusinessForm extends React.Component {

  componentWillMount(){
    if(!localStorage.jwtToken){
        this.props.history.push('/');
    }
    else{
        return null
    }
}

  state = {
    loading: false,                                                                     // Initial state
    finished: false,
    stepIndex: 0,
    values:[],   // for working days
    start_hour:null,
    end_hour:null
  };
  

 renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (         // Text Field Component
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
 )
  renderTimePicker = ({input, label, meta: {touched, error}, ...custom, value}) => (         // Text Field Component
    <TimePicker
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
      onChange={(event,value) => input.onChange(value)}
    />
)             
  renderService = ({ fields=[] ,  meta: { error },values }) => (
    <div>
      <FloatingActionButton mini={true}>
        <ContentAdd onClick={() => fields.push({})}/>
      </FloatingActionButton>      
      { fields.map((service,index) => (
          
          <li key={index}{...values}>
            
            <h4>Service {index + 1}</h4>
            <Field
              name={`${service}service_name`}
              type="text"
              component={this.renderTextField}
              label="Sevice Name"
              style={{marginRight: 12}}/>
            <Field
              name={`${service}service_duration`}
           
              //type="text"
              component={this.renderTextField}
              validate={[number]}
              label="Service Duration"
              style={{marginRight: 12}}/>

            <RaisedButton label="Delete" onClick={() => fields.remove(index)}>
            </RaisedButton >
          </li>
      
      ))
      }

      {error && <li className="error">{error}</li>}
    
    </div>
  )
  
  


  selectionRenderer = (values) => {                                                    // for displaying days selected
    switch(values.length){
      case 0:
        return '';
      case 1:
        return days[values[0]].name;
      default:
        return `${values.length} days selected`;
    }
  }

  menuItems(days) {                                                                   // for displaying the list of days
    const {values} = this.state;
    return days.map((day) => (
      
      <MenuItem
        key={day.value}
        insetChildren={true}
        checked={this.state.values && values.indexOf(day.value) > -1}
        value={day.value}
        primaryText={day.name}
      />
    ));
  }
  
  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = (valueSelected) => {
    //const { handleSubmit, pristine, reset, submitting } = this.state
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev = () => {
    //const { handleSubmit, pristine, reset, submitting } = this.state
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  handleEndTime = (event,value) =>{
    const  {end_hour} = this.state;
    this.setState({
      end_hour : value
    });
    console.log('END HOUR',end_hour)
  }
  handleStartTime = (event,value) =>{
    const  {start_hour} = this.state;
    this.setState({
      start_hour : value
    });
  }
  getStepContent(stepIndex) {
   //const {values} = this.state;
    switch (stepIndex) {
      case 0:
        return (
            <div>
                <div>
                  <Field
                    name="business_name"
                    component={this.renderTextField}
                    validate={[minName3]}
                    label="Business Name" 
                  />
                </div>

                <div>
                  <Field
                    name="business_category"
                    component={renderSelectField}
                    label="Choose Industry"
                  > 
                    <MenuItem value="Clinic" primaryText="Clinic" />
                    <MenuItem value="Law" primaryText="Law Firm" />
                    <MenuItem value="Salon" primaryText="Hair Saloon" />
                  </Field>
                </div>

                {/* <div>Business Hours</div> */}
                <div>
                <Field
                  name="start_hour"
                  label="When do you open ?"
                  floatingLabelText="When do you open ?"
                  component={this.renderTimePicker}
                  //onClick={this.handleStartTime}
                  minutesStep={30}
                />
              </div>

              <div>
              <Field
                  name="end_hour"
                  label="When do you close ?"
                  floatingLabelText="When do you close ?"
                  component={this.renderTimePicker}
                  minutesStep={30}
                />
              </div>

             {/* <Divider /> */}
              
                <div>
                <Field
                  name='week_days'
                  multiple={true}
                  label="Non Working Days"
                  component={renderSelectField}
                  //value={this.state.values}
                  //onChange={this.handleChange}
                  selectionRenderer={this.selectionRenderer}
                >
                  {this.menuItems(days)}
                </Field>
              </div>

              <div>
                  <Field
                    name="contact_no"
                    component={this.renderTextField}
                    validate={[number,maxLength15,minLength10]}
                    label="Business Phone"
                  />
              </div>
              <div>
                  <Field
                    name="address"
                    component={this.renderTextField}
                    validate={[minAddress10]}
                    label="Business Address"
                  />
              </div>
            </div>
        
        );

      
      case 1:
        return (
          <div>
            {/* <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" /> */}
            <h4>
              Please tell us about your Services
            </h4>
            <FieldArray
              name="addService"
              //type="text"
              component={this.renderService} 
              //label="Add Service"
            />
           
            <br />
            <p>Something whatever cool</p>
          </div>
        );


      case 2:
        return (
          <div>
            <div>
              <Field name="cancel" component={renderCheckbox} label="Cancellation Policy" />
            </div>
          
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
          </div>
        );
      default:
        return 'You are a long way from home sonny jim!';
    }
  }


  handleFinalSubmit = (values) => {
    const data ={
      id:this.props.userData.user.userId,
      values:values
    }
    this.props.setupBusiness(data,()=>{this.props.history.push("/home/Dummy")});
   }
  
   renderContent() {
    const {finished, stepIndex} = this.state;

    const contentStyle = {margin: '0 16px', overflow: 'hidden'};
    const { handleSubmit, pristine, reset, submitting } = this.props;
    console.log('finished ?? ', finished);
    if(finished){
      const {
      business_name,
        business_category,
        contact_no,
        start_hour,
        end_hour,
        week_days,
        address,
        cancel,
    } = this.props;
  
      return (
        <div style={contentStyle}>
            <CardTitle title={business_name} subtitle={business_category} />
              <CardText>
                <div>Services:<ul> {_.map(this.props.addService, service => {
                  return ( 
                    <li key={service.service_name}>
                          {service.service_name} <br/>
                          {service.service_duration}
                      </li>
                  )
                })} </ul></div>
                <div>Contact Number: {contact_no}</div>
                <div>Opening Hours: {start_hour.toString()}</div>
                <div>Closing Hours: {end_hour.toString()}</div>
                <div>Non Working Days : <ul>{ 
                    week_days
                  // _.map(this.showDays, day => {
                  //   <li key={day.value}>{day.name} </li>
                  // })
                }
                </ul>
                </div> 
                <div>Address : {address}</div>
                <div>Cancellation Policy Included: {cancel}</div>               
              </CardText>
            <CardActions>
              <FlatButton label="Edit" onClick={(event, values) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
                }} 
              />
              <FlatButton label="Submit" onClick={handleSubmit(this.handleFinalSubmit.bind(this))} />
            </CardActions>  
        </div>
      );
    }

    return (

      <form className="form"> 
        <div style={contentStyle}>
          <div>{this.getStepContent(stepIndex)}</div>
            <div style={{marginTop: 24, marginBottom: 12}}>
              <FlatButton                                     // Back Button
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />

              <RaisedButton                                   // Clear 
                label="Clear"
                disabled={stepIndex===2||pristine || submitting}    
                //primary={true}
                onClick={reset}
                style={{marginRight: 12}}
              />

              <RaisedButton                                     // Next Button
                label={stepIndex === 2 ? 'Finish' : 'Next'}
                disabled={pristine || submitting}    
                primary={true}
                onClick={this.handleNext}
                //onClick={handleSubmit(this.handleNext.bind(this))}
                
              />
            </div>
        </div>
    </form>
  );
}

  render() {
    const {loading, stepIndex} = this.state;
    return (
      <div>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <h3>Looks like you are new here, Let's register your Business !!</h3>
        </div>

        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Business Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Service Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Cancellation Policy</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupBusiness: setupBusiness
    }
  }




SetupBusinessForm = reduxForm({
  form: 'SetupBusinessForm',
  validate
  
})(SetupBusinessForm)

const selector = formValueSelector('SetupBusinessForm') // <-- same as form name



export default connect((state, ownProps) => { 
  const business_name = selector(state, 'business_name')
  const business_category = selector(state, 'business_category');
  const start_hour = selector(state, 'start_hour');
  const end_hour = selector(state, 'end_hour');
  const week_days = selector(state, 'week_days');
  const contact_no = selector(state, 'contact_no');
  const address = selector(state, 'address');
  const cancel = selector(state, 'cancel');
  const addService = selector(state, 'addService')
  //console.log('hours',start_hour,end_hour)
  return {
    business_name,
    business_category,
    start_hour,
    end_hour,
    week_days,
    contact_no,
    address,
    cancel,
    userData: state.userData,
    addService
  }
}
,mapDispatchToProps)(SetupBusinessForm)
