import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
class BookAppointment extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          controlledDate: null,
        };
      }
    
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
        const { handleSubmit }= this.props;
        return(
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div>
                    <label>Select Service  </label>
                    <Field name="SelectService" component="select">
                        <option />
                        <option name="service1" value="service1">Service 1</option>
                        <option name="service2" value="service2">Service 2</option>
                        <option name="service3" value="service3">Service 3</option>
                    </Field>
                    <br /> 
                    Select Date
                    <DatePicker 
                        hintText="Controlled Date Input"
                        value={this.state.controlledDate}
                        onChange={this.handleChange}
                        container="inline"
                    />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default reduxForm({
    form:'AppointmentForm'
})(BookAppointment)