import React from 'react';
import * as echarts from 'echarts';
import { DatePicker,Spin,message} from 'antd';
import Axios from './../../../../axios'
import moment from 'moment';
import './index.less'

export default class BarSearchTypeByTime extends React.Component {
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
		var url = "/api/v1/monitor/BarSearchTypeByTime?startTime="+startTime+"&endTime="+endTime
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
		var myChart = echarts.init(document.getElementById("BarSearchTypeByTime"));
		
		var xAxisData = ['安全', '可疑', '危险', '破坏'];
		
		var option = {
		     title :{ text: '威胁度预警情况' },
		     toolbox: {
		             show : true,
		             feature : {
		                 saveAsImage : {show: true,default:'png'}
		             }
		         },
		     tooltip: {
		     	show:true,
		     	trigger:'axis',
		     },
			 // color:['#339933','#FFCC00','#FF9900','#CC3333'],
		     xAxis: {
		         data: xAxisData,
		         name: '威胁度分级',
		     	nameLocation:'center',
				nameGap:25,
		     },
		     yAxis: {
		     	name:'告警量',
		     },
			dataZoom:[
				{
					show: true,
					yAxisIndex: 0,
					filterMode: 'empty',
					start:0,
					end:100,
				}
			 ],
		     series: [
		         {
		             type: 'bar',
					 label:{
						 show:true,
						 position:"top",
						 formatter:'{c}'
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
			<div className="BarSearchTypeByTime">
				<div >
					<RangePicker className="BarSearchTypeByTimeDate"
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
					<div id="BarSearchTypeByTime"  className="BarSearchTypeByTimeCharts"></div>
				</Spin>
				
			</div>
			
		)
	}
}