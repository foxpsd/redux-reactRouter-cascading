import {bindActionCreators} from 'redux';
import React, {findDOMNode,Component,PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Field,reduxForm,formValueSelector} from 'redux-form';
import * as action from '../actions';

import validate from './validate'
import asyncValidate from './asyncValidate'
import TestComp from './TestComp'
import LocationFiled from './LocationField.js'

const formName = 'Form1';

const renderField = ({ input, label,custom, type, meta: { touched, error, warning,autofilled } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} style={autofilled?{color:'#ff99aa'}:{color:'#555555'}}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      <span>{custom}</span>
    </div>
  </div>
)

const getFullName = (value,previousValue,allValues) => allValues.firstName + ' ' + allValues.lastName



// const validate = values => {
//   const errors = {}
//   if (!values.firstName) {
//     errors.firstName = 'Required'
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less'
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required'
//   } else if (values.lastName.length > 15) {
//     errors.lastName = 'Must be 15 characters or less'
//   }

//   if (!values.fullName) {
//     errors.fullName = 'Required'
//   } else if (values.fullName.length > 30) {
//     errors.fullName = 'Must be 30 characters or less'
//   }

//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
  
//   return errors
// }

let Form1 = (props,aaa,bbb,ccc) => {
    // console.log(aaa);
    const {
        as, 
        anyTouched,
        array,
        asyncValidate,
        asyncValidating,
        autofill,
        blur,
        change,
        destroy,
        error,
        form,
        handleSubmit, 
        dirty, 
        pristine, 
        valid, 
        invalid,
        initialize,
        initialValues,
        reset, 
        registeredFields, 
        submitting,
        submitFailed,
        submitSucceeded
    } = props

    const handleFirstNameChange = (e)=>{
    	const {change} = this.props;
    	change('firstName','zzz');
    }

    const inputProps = {
        onChange: handleFirstNameChange
    }

    const handAsyncValidate = ()=>{
        let resPromise = asyncValidate('userName','john')
        resPromise && resPromise.then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error)
        })
    }

    const showCascadingLocation = () => {
        cascadeLocation.open()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button type="button" onClick={()=>{action.reInit()}}>reInitiate</button>
                <button type="button" onClick={reset}>reset</button>
                <button type="button" onClick={()=>{console.log(anyTouched)}}>anyTouched</button>
                <button type="button" onClick={handAsyncValidate}>asyncValidate</button>
                <button type="button" onClick={()=>{autofill('firstName','Sccc')}}>autofill</button>
                <button type="button" onClick={()=>{blur('firstName','iceice')}}>blur</button>
                <button type="button" onClick={()=>{change('firstName','shadow')}}>change</button>
                <button type="button" onClick={()=>{
                    console.log(valid?'valid ':'invalid ',pristine?'pristine ':'dirty ',submitFailed?'submitFailed ':' ',
                        submitSucceeded?'submitSucceeded ':'')
                }}>showStatus</button>
            </div>
            <div>
        		<label htmlFor="firstName">First Name</label>
        		<Field name="firstName" component={renderField} props={inputProps} />
            </div>
            <div>
        		<label htmlFor="lastName">Last Name</label>
        		<Field name="lastName" component={renderField} type="text" custom="custom1"/>
            </div>
            <div>
                <label htmlFor="location">location</label>
                <Field name="location" component={LocationFiled} type="text"/>
            </div>
            <div>
        		<label htmlFor="email">Email</label>
        		<Field name="email" component={renderField} type="email"/>
            </div>
            <div>
        		<label htmlFor="fullName">fullname</label>
        		<Field name="fullName" component={renderField} type="text" normalize={getFullName}/>
            </div>
            <div>
                <label htmlFor="userName">username</label>
                <Field name="userName" component={TestComp} type="text"/>
            </div>
            <div>
                <label htmlFor="password">password</label>
                <Field name="password" component={renderField} type="password"/>
            </div>

            <button type="submit" disabled={submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </form>
    )
}

const selector = formValueSelector('Form1');

//将reducers的return值注册到react的props上
const mapStateToProps = (state) => {
	return {
		formObj: state.form,
        form1Values:selector(state, 'firstName', 'lastName', 'email', 'telephone'),
        initialValues: state.reducer_1.data
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

Form1 = reduxForm({
	form: formName, // a unique name for this form,
	initialValues: {
		firstName: 'Xu',
		lastName: 'Suyang'
	},
    enableReinitialize:true,
    keepDirtyOnReinitialize:false,
	validate,
    asyncValidate,
    asyncBlurFields: [ 'userName','password'],
    onSubmitFail:(errors,dispatch)=>{
        console.log("onSubmitFail!",errors);
    },
    onSubmitSuccess:(result,dispatch)=>{
        console.log("onSubmitSuccess!",result);
    }
    // shouldAsyncValidate:(data)=>{
    //     // console.log("shoudAsyncValidate?",data)
    //     const {asyncErrors,initialized,trigger,blurredField,pristine,syncValidationPasses} = data
    //     if(!syncValidationPasses) {
    //         return !pristine
    //     }
    //     else{
    //         return !pristine
    //     }
    // }
    // propNamespace:'sfs'

})(Form1);

Form1 = connect(mapStateToProps, mapDispatchToProps)(Form1);
//将state的 "指定值" 映射在props上，将 action的 "所有方法" 映射在props上
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default Form1