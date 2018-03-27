const validate = values => {
    const errors = {}
    
    const requiredFields = [
      'business_name',
      'business_category',
      'start_hour',
      'end_hour',
      'week_days',
      'contact_no',
      'address',
      '0serviceName',
      '1serviceName',
      '2serviceName',
      '0serviceDuration',
      '1serviceDuration',
      '2serviceDuration',

    ]



    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = 'Invalid email address'
    }
    return errors
  }

  export default validate;