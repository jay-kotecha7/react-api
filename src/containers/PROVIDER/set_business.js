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


// const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (         // Text Field Component
//   <TextField
//     hintText={label}
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     {...custom}
//   />
// )
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

const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
const minLength10 = minLength(10)
const minAddress = minAddress => value => value && value.length < minAddress ? `Must be ${minAddress} characters or more` : undefined
const minAddress10 = minAddress(10)
const minName = minName => value => value && value.length < minName ? `Must be ${minName} characters or more` : undefined
const minName3 = minName(3)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined

const days = [                                                                          // List of Days
  {value:0, name:'Monday'},
  {value:1, name:'Tuesday'},
  {value:2, name:'Wednesday'},
  {value:3, name:'Thursday'},
  {value:4, name:'Friday'},
  {value:5, name:'Saturday'},
  {value:6, name:'Sunday'},
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
  renderService = ({ fields=[] ,  meta: { error },values }) => (
    <div>
      <FloatingActionButton mini={true}>
        <ContentAdd onClick={() => fields.push({})}/>
      </FloatingActionButton>      
      { fields.map((service,index) => (
          
          <li key={index}{...values}>
            
            <h4>Service {index + 1}</h4>
            <Field
              name={`${index}service_name`}
              type="text"
              component={this.renderTextField}
              label="Sevice Name"
              style={{marginRight: 12}}/>
            <Field
              name={`${index}service_duration`}
           
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
                    label="Business Category"
                  > 
                    <MenuItem value="clinic" primaryText="Clinic" />
                    <MenuItem value="law" primaryText="Law Firm" />
                    <MenuItem value="saloon" primaryText="Hair Saloon" />
                  </Field>
                </div>


                {/* <div>Business Hours</div> */}

                <div>
                  <Field
                    name="start_hour"
                    component={renderSelectField}
                    label="Opening Hour"
                  >
                  <MenuItem value="9" primaryText="9 AM" />
                  <MenuItem value="10" primaryText="10 AM" />
                  <MenuItem value="11" primaryText="11 AM" />
                </Field>
              </div>

              <div>
                  <Field
                    name="end_hour"
                    component={renderSelectField}
                    label="Closing Hour"
                  >
                  <MenuItem value="21" primaryText="9 PM" />
                  <MenuItem value="22" primaryText="10 PM" />
                  <MenuItem value="23" primaryText="11 PM" />
                </Field>
              </div>

             {/* <Divider /> */}
              
                <div>
                <Field
                  name='week_days'
                  multiple={true}
                  label="Working Days"
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
                    label="Contact Number"
                  />
              </div>
              <div>
                  <Field
                    name="address"
                    component={this.renderTextField}
                    validate={[minAddress10]}
                    label="Address"
                  />
              </div>
            </div>
        
        );

      
      case 1:
        return (
          <div>
            {/* <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" /> */}
            <p>
              Please tell us about your Services
            </p>
            <FieldArray
              name="addService"
              //type="text"
              component={this.renderService} 
              //label="Add Service"
            />
           
            <br />
            <p>Something something whatever cool</p>
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
       // addService,
        service_name,
        service_duration
    } = this.props;
      console.log('id:', this.props.userData.user.userId)
      
      const data = {
        id : this.props.userData.user.userId,
        business_name: business_name,
        business_category: business_category,
        contact_no: contact_no,
        start_hour: start_hour,
        end_hour: end_hour,
        week_days: week_days,
        address: address,
        cancel: cancel,
      //  addService: addService,
        service_name: service_name,
        service_duration: service_duration
      }
      console.log('push', data);
      this.props.setupBusiness(data);
    }
    if (finished) {      
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="/#"
              onClick={(event,values) => {               
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
              //  onClick={this.handleNext}
                onClick={handleSubmit(this.handleNext.bind(this))}
                
              />
            </div>
        </div>
    </form>
  );
}

  render() {
    const {loading, stepIndex} = this.state;
    return (
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setupBusiness: function(dispatch) {
      setupBusiness(dispatch)
    }
  }
}


// Decorate with redux-form
SetupBusinessForm = reduxForm({
  form: 'SetupBusinessForm',validate
   // a unique identifier for this form
})(SetupBusinessForm)

// Decorate with connect to read form values
const selector = formValueSelector('SetupBusinessForm') // <-- same as form name



export default connect(state => { 
 // can select values individually
   console.log('reduxstate',state);
  const business_name = selector(state, 'business_name')
  const business_category = selector(state, 'business_category');
  const start_hour = selector(state, 'start_hour');
  const end_hour = selector(state, 'end_hour');
  const week_days = selector(state, 'week_days');
  const contact_no = selector(state, 'contact_no');
  const address = selector(state, 'address');
  const cancel = selector(state, 'cancel');
  const addService = selector(state, 'addService');
  const service_name = selector(state, '0service_name');
  const service_duration = selector(state,'0service_duration');
 
  return {
    business_name,
    business_category,
    start_hour,
    end_hour,
    week_days,
    contact_no,
    address,
    cancel,
    addService,
    service_name,
    service_duration,
    userData: state.userData
  }
}
,mapDispatchToProps)(SetupBusinessForm)
