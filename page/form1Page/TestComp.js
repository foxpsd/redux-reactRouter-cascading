import React, { Component } from 'react'

class TestComp extends Component {
	
	render(){
		const { input, label,custom, type, meta: { touched, error, warning,autofilled } } = this.props
		// Filed 的各种事件函数可以随意修改，但是修改后改变Filed的默认行为，所以最好不要这么做
		// this.props.input.onChange = () =>{
		// 	console.log("aaaaaaa");
		// }
		return (
			<div>
				<label>{label}</label>
				<div>
					<input {...input} placeholder={label} type={type} style={autofilled?{color:'#ff99aa'}:{color:'#555555'}}/>
					{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
					<span>{custom}</span>
				</div>
				<button type="button" onClick={() => {console.log(input)}}>showInput</button>
				<button type="button" onClick={()=>{input.onChange('zzzz')}}>onChange</button>
			</div>
		)
	}
}

export default TestComp