import React from 'react';
import * as echarts from 'echarts';
import { DatePicker,Spin,message,Select} from 'antd';
import Axios from './../../../../axios'
import moment from 'moment';
import './index.less'

export default class LineSearchTypeByTime extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			spinning:true,
			starttime:moment().subtract(7,'day').format("YYYY-MM-DD HH:mm:ss"),
			endtime:moment().format("YYYY-MM-DD HH:mm:ss"),
			interval:2,
	    };
	  };
	  
	componentDidMount(){
		var st = moment().subtract(7,'day').format("YYYY-MM-DD HH:mm:ss")
		var et = moment().format("YYYY-MM-DD HH:mm:ss")
		this.getData(st,et,2)
		
	}
	
	getData = (startTime,endTime,interval) => {
		var url = "/api/v1/monitor/LineSearchTypeByTime?startTime="+startTime+"&endTime="+endTime+"&interval="+interval
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
		var myChart = echarts.init(document.getElementById("LineSearchTypeByTime"));
		
		
		var option = {
		     title: {
		         text: '各时间段告警次数统计详情'
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
		         type: 'category',
		     	name:'时间段区间',
		     	nameLocation:'middle',
		     	nameGap:'30',
		         boundaryGap: false,
		         data: this.state.data[0].map(function (str) {
		                 return str.replace(' ', '\n')
		             })
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
		  starttime:dateStrings[0],
		  endtime:dateStrings[1],
	  })
	  this.getData(dateStrings[0],dateStrings[1],this.state.interval)
	}
	
	onChangeInterval = (value) => {
		this.setState({
			  spinning:true,
			  interval:value,
		})
		this.getData(this.state.starttime,this.state.endtime,value)
		
	}
	
	render(){
		const { RangePicker } = DatePicker;
		const { Option } = Select;
		return(
			<div className="LineSearchTypeByTime">
				<div >
					<RangePicker className="LineSearchTypeByTimeDate"
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
				<Select className="LineSearchTypeByTimeSelect"
					size={'small'} defaultValue={2} onChange={this.onChangeInterval}>
				      <Option value={1}>10分钟</Option>
					  <Option value={2}>一小时</Option>
				      <Option value={3}>每天</Option>
				      <Option value={4}>每月</Option>
				</Select>
				<Spin
						spinning={this.state.spinning}
						delay={500}
				>
					<div id="LineSearchTypeByTime" className="LineSearchTypeByTimeCharts" ></div>
				</Spin>
				
			</div>
			
		)
	}
}