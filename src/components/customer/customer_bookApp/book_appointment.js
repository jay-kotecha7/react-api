import React from 'react'
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
//import FontIcon from 'material-ui/FontIcon';
//import IconButton from 'material-ui/IconButton';
//import ActionHome from 'material-ui/svg-icons/action/home';
//import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox'
//import { RadioButtonGroup } from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker';
//import Toggle from 'material-ui/Toggle';  
//import {List, ListItem} from 'material-ui/List';
//import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import {
    Step,
    Stepper,
    StepLabel,
  } from 'material-ui/Stepper';


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
            // this.setState({
            // input: payload
            // })                              
            }}
  
            children={children}
            {...custom}
        />
)



class BookAppointment extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          controlledDate: null,
        };
      }


      renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (         // Text Field Component
        <TextField
          hintText={label}
          floatingLabelText={label}
          errorText={touched && error}
          {...input}
          {...custom}
        />
      )  

      
      handleChange = (event,date) => {
        this.setState({
          controlledDate: date,
        });
       console.log(date);
      };


    onSubmit(values) {
        console.log(values);
    };

    render(){
        const { handleSubmit,pristine,submitting }= this.props;
        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                    <div>Select Service</div>
                    <Field
                        name="business_category"
                        component={renderSelectField}
                        label="Business Category"
                    > 
                        <MenuItem value="clinic" primaryText="Clinic" />
                        <MenuItem value="law" primaryText="Law Firm" />
                        <MenuItem value="saloon" primaryText="Hair Saloon" />
                    </Field>
                    <div>Select Date</div>
                    <DatePicker 
                        hintText="Select Date"
                        value={this.state.controlledDate}
                        onChange={this.handleChange}
                        container="inline"
                    />
                    </div>
                    <RaisedButton                                     // Next Button
                        label='Next'
                        disabled={pristine || submitting}    
                        primary={true}
                        //  onClick={this.handleNext}
                        //onClick={handleSubmit(this.handleNext.bind(this))}
                    />
                </form>
            </div>
        );
    }
}
export default reduxForm({
    form:'AppointmentForm'
})(BookAppointment)