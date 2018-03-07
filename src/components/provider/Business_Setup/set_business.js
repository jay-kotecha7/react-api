import React from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Checkbox from 'material-ui/Checkbox'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'business_name',
    'business_category',
    'open',
    'close',
    'days',
    'contact_number',
    'address'
    // 'favoriteColor',
    // 'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderCheckbox = ({input, label}) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

const renderRadioGroup = ({input, ...rest}) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

const renderSelectField = ({
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
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)

class SetupBusinessForm extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0
   // handleSubmit: 0
  };

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
   // console.log(values);
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

  // onSubmit(values){
  //   console.log(values)
  // }

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
    switch (stepIndex) {
      case 0:
        return (
            <div>
                <div>
                  <Field
                    name="business_name"
                    component={renderTextField}
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
                    <MenuItem value="law" primaryText="law Firm" />
                    <MenuItem value="saloon" primaryText="Hair Saloon" />
                  </Field>
                </div>


                {/* <div>Business Hours</div> */}

                <div>
                  <Field
                    name="open"
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
                    name="close"
                    component={renderSelectField}
                    label="Closing Hour"
                  >
                  <MenuItem value="21" primaryText="9 PM" />
                  <MenuItem value="22" primaryText="10 PM" />
                  <MenuItem value="23" primaryText="11 PM" />
                </Field>
              </div>
              <div>
                  <Field
                    name="days"
                    component={renderSelectField}
                    label="Working Days"
                  >
              
                  <Toggle defaultToggled={true} label="Monday" value="monday"/>
                  <Toggle defaultToggled={true} label="Tuesday" value="tuesday"/>
                  <Toggle defaultToggled={true} label="Wednesday" value="wednesday"/>
                  <Toggle defaultToggled={true} label="Thursday" value="thursday"/>
                  <Toggle defaultToggled={true} label="Friday" value="friday"/>
                  <Toggle defaultToggled={false} label="Saturday" value="saturday"/>
                  <Toggle defaultToggled={false} label="Sunday" value="sunday"/>
                  <RaisedButton         
                    label="COOL"    
                    primary={true}
                   // onClick={handleS(this.handleNext.bind(this))}
                  />
                </Field>
                
              </div>
              <div>
                  <Field
                    name="contact_number"
                    component={renderTextField}
                    label="Contact Number"
                  />
              </div>
              <div>
                  <Field
                    name="address"
                    component={renderTextField}
                    label="Address"
                  />
              </div>



            </div>
        
        );


      case 1:
        return (
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Ad group name" />
            <p>
              Ad group status is different than the statuses for campaigns, ads, and keywords, though the
              statuses can affect each other. Ad groups are contained within a campaign, and each campaign can
              have one or more ad groups. Within each ad group are ads, keywords, and bids.
            </p>
            <p>Something something whatever cool</p>
          </div>
        );
      case 2:
        return (
          <p>
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with your
            ads, find out how to tell if they're running and how to resolve approval issues.
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    //const { handleSubmit, pristine, reset, submitting } = this.state
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};
    const { handleSubmit, pristine, reset, submitting } = this.props
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
              <FlatButton                                     // Back Button
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton         
                                                             // Next Button
                label={stepIndex === 2 ? 'Finish' : 'Next'}    
                primary={true}
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



export default reduxForm({
  form: 'SetupBusinessForm', // a unique identifier for this form
  validate,

})(SetupBusinessForm)
