import React from 'react';
import * as echarts from 'echarts';
import { DatePicker,Spin,message} from 'antd';
import Axios from './../../../../axios'
import moment from 'moment';
import './index.less'

export default class PieSearchTypeByTime extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			spinning:true,
	    };
	  };
	  
	componentDidMount(){
		var st = moment().subtract(7,'day').format("YYYY-MM-DD HH:mm:ss")
		var et = moment().format("YYYY-MM-DD HH:mm:ss")
		this.getData(st,et)
		
	}
	
	getData = (startTime,endTime) => {
		var url = "/api/v1/monitor/PieSearchTypeByTime?startTime="+startTime+"&endTime="+endTime
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				this.setState({
					spinning:false,
					data:res.data.data
				},function(){
					this.echarts()
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	
	echarts = () => {
		var myChart = echarts.init(document.getElementById("PieSearchTypeByTime"));
		
		var option = {
		     title :{ text: '威胁度预警情况' },
		     toolbox: {
		             show : true,
		             feature : {
		                 saveAsImage : {show: true,default:'png'}
		             }
		         },
		    tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 10,
				top:30,
				data: ['安全', '可疑', '危险', '破坏'],
				selected:{'安全':false}
			},
		    // color:['#339933','#FFCC00','#FF9900','#CC3333'],
		     series: [
		         {
		             name: '告警数',
		             type: 'pie',
					 // // radius: '55%',
					 // avoidLabelOverlap: false,
					 // label:{
						//  show:false,
						//  position:"center",
					 // },
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					data: this.state.data
		         },
		     ]
		 };
		
		
		myChart.setOption(option);
	}
	onChange = (dates, dateStrings) => {
	  this.setState({
		  spinning:true,
	  })
	  this.getData(dateStrings[0],dateStrings[1])
	}
	  
	render(){
		const { RangePicker } = DatePicker;
		return(
			<div className="PieSearchTypeByTime">
				<div >
					<RangePicker className="PieSearchTypeByTimeDate"
						size={'small'}
					    ranges={{
						  Today: [moment().startOf('day'), moment()],
						  '7 Day': [moment().subtract(7, 'days'),moment()],
						  'This Month': [moment().startOf('month'), moment()],
						  'One Month': [moment().subtract(1, 'month'),moment()],
					    }}
						placeholder={[moment().subtract(7,'day').format("YYYY-MM-DD HH:mm:ss"), moment().format("YYYY-MM-DD HH:mm:ss")]}
					    showTime
					    format="YYYY-MM-DD HH:mm:ss"
					    onChange={this.onChange}
					/>
				</div>
				<Spin
						spinning={this.state.spinning}
						delay={500}
				>
					<div id="PieSearchTypeByTime" className="PieSearchTypeByTimeCharts" ></div>
				</Spin>
				
			</div>
			
		)
	}
}