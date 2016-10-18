import {bindActionCreators} from 'redux';
import React, {findDOMNode,Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import * as action from '../actions';

const formName = 'SimpleForm';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const getFullName = (value,previousValue,allValues) => allValues.firstName + ' ' + allValues.lastName


const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }

  if (!values.fullName) {
    errors.fullName = 'Required'
  } else if (values.fullName.length > 30) {
    errors.fullName = 'Must be 30 characters or less'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  
  return errors
}
const SyncValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  const handleFirstNameChange = (e)=>{
  	const {change} = this.props;
  	change('firstName','zzz');
  }
  const inputProps = {
		onChange: handleFirstNameChange
	};
  return (
    <form onSubmit={handleSubmit}>
        <div>
			<label htmlFor="firstName">First Name</label>
			<Field name="firstName" component={renderField} props={inputProps}/>
        </div>
        <div>
			<label htmlFor="lastName">Last Name</label>
			<Field name="lastName" component={renderField} type="text"/>
        </div>
        <div>
			<label htmlFor="email">Email</label>
			<Field name="email" component={renderField} type="email"/>
        </div>
        <div>
			<label htmlFor="email">fullname</label>
			<Field name="fullName" component={renderField} type="text" normalize={getFullName}/>
        </div>
        
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
    </form>
  )
}


//将reducers的return值注册到react的props上
const mapStateToProps = (state) => {
	return {
		formObj: state.form
	}
}

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch) => {
	let t1 = bindActionCreators(action, dispatch);
	console.log("*", t1);
	return {
		as: t1,
		dispatch: dispatch
	};
}

let Form1 = reduxForm({
	form: formName, // a unique name for this form,
	initialValues: {
		firstName: '',
		lastName: ''
	},
	validate
})(SyncValidationForm);
Form1 = connect(mapStateToProps, mapDispatchToProps)(Form1);
//将state的 "指定值" 映射在props上，将 action的 "所有方法" 映射在props上
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default Form1