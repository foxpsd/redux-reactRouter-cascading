import React,{Component} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Form1 from './Form1'


// require("./demo_react_list/style/list.css");


// console.log("index.js-store", store, store.getState() );
const showResults = values => new Promise((resolve,reject) => {
    setTimeout(() => {  // simulate server latency
		window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
		resolve("success!")
		// reject(new Error("fail"))
    }, 500)
})

class Form1Page extends Component {
	render(){
		return (
			<div className="wrapeer">
				<h5>this is form 1!</h5>
				<Form1 onSubmit={showResults}/>
			</div>
		)
	};
}

export default Form1Page;