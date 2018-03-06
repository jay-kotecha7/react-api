import React from 'react'
import {Field, reduxForm} from 'redux-form'
import TextField from 'material-ui/TextField'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
//import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
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

const SetupBusinessForm = props => {
  const {handleSubmit, pristine, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="business_name"
          component={renderTextField}
          label="Business Name"
        />
      </div>
      {/* <div>
        <Field name="lastName" component={renderTextField} label="Last Name" />
      </div> */}
      {/* <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div> */}
      {/* <div>
        <Field name="sex" component={renderRadioGroup}>
          <RadioButton value="male" label="male" />
          <RadioButton value="female" label="female" />
        </Field>
      </div> */}
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
      {/* <div>
        <Field name="employed" component={renderCheckbox} label="Employed" />
      </div> */}
      {/* <div>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          multiLine={true}
          rows={2}
        />
      </div> */}
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SetupBusinessForm', // a unique identifier for this form
  validate,

})(SetupBusinessForm)