import React from 'react';
import * as echarts from 'echarts';
import { DatePicker,Spin,message} from 'antd';
import Axios from './../../../../axios'
import moment from 'moment';
import './index.less'

export default class ScatterByAll extends React.Component {
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
		var url = "/api/v1/monitor/ScatterByAll?startTime="+startTime+"&endTime="+endTime
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				var data = []
				data[0] = res.data.data.label0
				data[1] = res.data.data.label1
				data[2] = res.data.data.label2
				data[3] = res.data.data.label3
				this.setState({
					spinning:false,
					data:data
				},function(){
					this.echarts()
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	
	echarts = () => {
		var myChart = echarts.init(document.getElementById("ScatterByAll"));
		
		
		var schema = [
		    {name: 'loc', index: 0, text: '传感器ID'},
			{name: 'date', index: 1, text: '时间段'},
		    {name: 'level', index: 2, text: '威胁度'}
		];
		var itemStyle = {
		    opacity: 0.8,
		    shadowBlur: 10,
		    shadowOffsetX: 0,
		    shadowOffsetY: 0,
		    shadowColor: 'rgba(0, 0, 0, 0.5)'
		};
		
		var option = {
		     title :{ text: '总体告警详情',
				textStyle:{
					color: '#fff',
					fontSize: 16,
				},
		     left: 'center'
		     },
		     backgroundColor: '#eee',
		     toolbox: {
		             show : true,
		     		right:20,
		             feature : {
		                 mark : {show: true},
		     			dataZoom:{show:true},
		                 restore : {show: true},
		                 saveAsImage : {show: true,default:'png'}
		             }
		         },
		     backgroundColor: '#404a59',
		     legend: {
		     	top:20,
		         y: 'top',
		         data: ['安全', '可疑', '危险', '破坏'],
				 selected:{'安全':false},
		     	borderColor:'#fff',
		         textStyle: {
		             color: '#fff',
		             fontSize: 16
		         }
		     },
		     
		     grid: {
		     	bottom: 80
		     },
		     tooltip: {
		         padding: 10,
		         backgroundColor: '#222',
		         borderColor: '#777',
		         borderWidth: 1,
				 formatter: function(objs){
					 var value = objs.value;
					 return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
					     + schema[0].text + '：' + value[0] + '<br>'
					 	 + schema[1].text + '：<br>' + value[2] + '<br>'
					     + '</div>'
					     + schema[2].text + '：' + value[4] + '<br>'
				 },
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
		                 height: '70%',
		                 showDataShadow: false,
		                 left: '93%'
		             }
		         ],
		     xAxis: {
		         type: 'value',
		         name: '传感器ID',
		         nameGap: 25,
		     	nameLocation:'center',
		         nameTextStyle: {
		             color: '#fff',
		             fontSize: 14
		         },
		         // max: 31,
		         splitLine: {
		             show: false
		         },
		         axisLine: {
		             lineStyle: {
		                 color: '#eee'
		             }
		         }
		     },
		     yAxis: {
		         type: 'time',
		         name: '时间/s',
		         nameLocation: 'end',
		         nameGap: 20,
		         nameTextStyle: {
		             color: '#fff',
		             fontSize: 16
		         },
		         axisLine: {
		             lineStyle: {
		                 color: '#eee'
		             }
		         },
		         splitLine: {
		             show: false
		         }
		     },
		     
		     series: [
		         {
		             name: '安全',
		             type: 'scatter',
					 color:'#66FF66',
		     		itemStyle: itemStyle,
		     		progressive:100000,
					symbolSize: function (val) {
						return 5;
					},
		     		data: this.state.data[0],
		         },
		     	{
		     	    name: '可疑',
		     	    type: 'scatter',
					color:'#FFFF00',
		     		itemStyle: itemStyle,
		     		progressive:100000,
					symbolSize: function (val) {
						return val[3]*5;
					},
		     		data: this.state.data[1]
		     	},
		     	{
		     	    name: '危险',
		     	    type: 'scatter',
					color:'#FF9900',
		     		itemStyle: itemStyle,
		     		progressive:100000,
					symbolSize: function (val) {
						return val[3]*5;
					},
		     		data: this.state.data[2]
					
		     	},
		     	{
		     	    name: '破坏',
		     	    type: 'scatter',
					color:'#CC3333',
		     		itemStyle: itemStyle,
		     		progressive:100000,
					symbolSize: function (val) {
						return val[3]*5;
					},
		     		data: this.state.data[3]
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
			<div className="ScatterByAll">
				<div >
					<RangePicker className="ScatterByAllDate"
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
					<div id="ScatterByAll" className="ScatterByAllCharts" ></div>
				</Spin>
				
			</div>
			
		)
	}
}