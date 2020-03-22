import React from 'react';
import * as echarts from 'echarts';
import './index.less'

export default class EchartsLine extends React.Component {
	constructor(props) {
		super(props);
		console.log("init")
		console.log(props)
	    this.state = {
			keyId:props.keyId,
			lossArr:props.lossArr,
			accArr:props.accArr,
			valLossArr:props.valLossArr,
			valAccArr:props.valAccArr,
			epochsList:props.epochsList,
	    };
	  };
	  
	componentDidMount(){
		let keyId = this.state.keyId
		// console.log(keyId)
		var myChart = echarts.init(document.getElementById(keyId));
		  
		var option = {
		     title: {
		         text: 'Acc指标'
		     },
		     // color:['#00c8ff','#16c4c6'],
		     tooltip: {
		         trigger: 'axis'
		     },
		     legend: {
		         data:['训练ACC','验证ACC','训练LOSS','验证LOSS'],
		         // x:'right'
		     },
			 toolbox: {
				 feature: {
					 saveAsImage: {}
				 }
			 },
		     grid: {
		         left: '3%',
		         right: '5%',
		         bottom: '3%',
		         containLabel: true
		     },
		    
		     xAxis: {
				 name:'epoch',
		         type: 'category',
		         boundaryGap: false,
		         // data: [1,2,3,4,5,6,7]
		         data:this.state.epochsList,
		         // axisLabel:{
		         //     interval:8, //横轴信息全部显示
		         //     // rotate:18, //角色倾斜显示
		         //     textStyle:{
		         //         color:'darkslategray',
		         //     }
		         // }
		     },
		     yAxis: {
		         type: 'value',
				 max:1,
		     },
		     series: [
		         {
		             name:'训练ACC',
		             type:'line',
					 smooth: true,
		             // stack: '总量',
		             // data:[0.987,0.923, 0.856, 0.869, 0.900, 0.980, 0.999]
		             data:this.state.accArr
		         },
		         {
		             
		             name:'验证ACC',
		             type:'line',
					 smooth: true,
		             // stack: '总量',
		             // data:[0.887,0.823, 0.756, 0.769, 0.800, 0.880, 0.899]
		             data:this.state.valAccArr
		         },
				 {
				     
				     name:'训练LOSS',
				     type:'line',
				 	smooth: true,
				     // stack: '总量',
				     // data:[0.887,0.823, 0.756, 0.769, 0.800, 0.880, 0.899]
				     data:this.state.lossArr
				 },
				 {
				     
				     name:'验证LOSS',
				     type:'line',
				 	smooth: true,
				     // stack: '总量',
				     // data:[0.887,0.823, 0.756, 0.769, 0.800, 0.880, 0.899]
				     data:this.state.valLossArr
				 }
		     ]
		 };
		
		
		
		myChart.setOption(option);
	}
	  
	render(){
		const keyId = this.state.keyId
		// console.log(keyId)
		return(
			<div >
				<div id={keyId} className="modelTable-Echarts"></div>
			</div>
			
		)
	}
}