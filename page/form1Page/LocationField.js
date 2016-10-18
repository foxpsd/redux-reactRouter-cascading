import React, { Component } from 'react'
import Cascading from '../../lib/Cascading.full'
import * as action from '../actions';

console.log(Cascading)



class LocationField extends Component {
	constructor(props) {
		super(props);
		this.cascadeLocation = new Cascading.Desktop({
		    type: 'common',
		    data: 'dataLocation',
		    dataUrl: 'http://assets.dxycdn.com/core/widgets/cascading-list-v2/data/location.js',
		    container: 'cascading-location-container',
		    additionClass: 'test',
		    maxLevel: 3,
		    maxSelect: 1,
		    // selectedMaxLine: 1,
		    ieFallback: true,
		    panelNames: ['省份', '城市', '区县'],
		    /*defaultSelected: [['150000', '150600', '150621'], ['130000', '130200', '130281']],*/
		    afterInit: ()=>{
		        console.log('地区组件桌面版加载完毕');
		    },
		    afterDestroy: ()=>{
		        console.log('地区组件移动版销毁完毕');
		    },
		    confirmCallback: (data)=>{
		        console.log(data);
		        // 通过 onChange 事件回显级联插件选择结果
		        this.props.input.onChange(data.name[0])
		        // action.confirmLocation()
		        // $('#location').val(data.name.join(','));
		        // $('#locationId').text(data.id.join(','));
		        // if(data.origin.length){
		        //     cascadeHospital.setCurrentSelected([data.origin[0]]);
		        // }
		    },
		    cancelCallback: ()=>{
		        console.log('canceled');
		    }
		})
	}
	render(){
		const { input, label, type, meta: { touched, error, warning,autofilled } } = this.props
		// Filed 的各种事件函数可以随意修改，但是修改后改变Filed的默认行为，所以最好不要这么做
		// 当input被focus的时候，调出级联插件
		this.props.input.onFocus = () =>{
			this.cascadeLocation.open()
		}
		return (
			<div>
				<label>{label}</label>
				<div> 
					<input 
						{...input} 
						placeholder={label} type={type}
						style={autofilled?{color:'#ff99aa'}:{color:'#555555'}}
					/>
					{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
				</div>
				<button type="button" onClick={() => {console.log(input)}}>showInput</button>
			</div>
		)
	}
}

export default LocationField