import React from 'react';
import * as echarts from 'echarts';
import { DatePicker,Spin,message} from 'antd';
import Axios from './../../../../axios'
import moment from 'moment';
import './index.less'

export default class LineLocationByTime extends React.Component {
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
		var url = "/api/v1/monitor/LineLocationByTime?startTime="+startTime+"&endTime="+endTime
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
		var myChart = echarts.init(document.getElementById("LineLocationByTime"));
		
		
		var option = {
		     title: {
		         text: '各传感器告警次数统计详情'
		     },
		     tooltip: {
		         trigger: 'axis'
		     },
		     legend: {
		         data:['可疑', '危险', '破坏','总量'],
		     	top:30,
		     },
			 grid: {
			 	bottom: 80
			 },
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true,default:'png'}
				}
			},
			dataZoom: [
				{
					show: true,
					start: 0,
					end: 100
				},
				{
					type: 'inside',
					start: 0,
					end: 100
				},
				{
					show: true,
					yAxisIndex: 0,
					filterMode: 'empty',
					width: 30,
					height: '60%',
					showDataShadow: false,
					left: '93%'
				}
			],
			xAxis: {
				name:'传感器ID',
				nameLocation:'middle',
				nameGap:'20',
			    type: 'category',
			    boundaryGap: false,
			    data: this.state.data[0],
			},
			yAxis: {
				name:'预警量',
			    type: 'value'
			},
		    series: [
		        {
		            name:'总量',
		            type:'line',
		    		smooth: true,
		            data:this.state.data[4]
		        },
		        {
		            name:'可疑',
		            type:'line',
		    		smooth: true,
		            data:this.state.data[1]
		        },
		        {
		            name:'危险',
		            type:'line',
		    		smooth: true,
		            data:this.state.data[2]
		        },
		        {
		            name:'破坏',
		            type:'line',
		    		smooth: true,
		            data:this.state.data[3]
		        }
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
			<div className="LineLocationByTime">
				<div >
					<RangePicker className="LineLocationByTimeDate"
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
					<div id="LineLocationByTime" className="LineLocationByTimeCharts" ></div>
				</Spin>
				
			</div>
			
		)
	}
}