import React from 'react'
import './index.less'
import {Tag,message,Table ,Input,Button,Statistic, Card, Row, Col} from 'antd'
import Axios from './../../../../axios'

const { Search } = Input;

export default class ModelTable extends React.Component{
	constructor() {
	    super();
		this.state = {
		    dataSource:[],
			status: true,
			hdfsPath:""
		};
	}
	
	componentWillMount(){
		let url="/api/v1/modelapp/serving/list/page?displayName=&offset=1&limit=1"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				var total = res.data.data.total
				let url="/api/v1/modelapp/serving/list/page?displayName=&offset=1&limit="+total
				Axios.get(url,"").then((res)=> {
					if(res.data.resultCode.code < 300){
						let list = res.data.data.list;
						var data = []
						for(let item in list){
							if(list[item].isCompleted === 1){
								var isCompleted = "服务正常";
							}else if(list[item].isCompleted === 0){
								var isCompleted = "启动中";
							}else if(list[item].isCompleted === -1){
								var isCompleted = "服务异常";
							}
						
							var dataItem = {
								'key':list[item].servingId,
								'servingName':list[item].servingName,
								'instance':list[item].instance,
								'startTime':list[item].startTime,
								'cpu':list[item].cpu,
								'memory':list[item].memory,
								'isCompleted':isCompleted,
							}
							data.push(dataItem);
						}
						this.setState({
							total:total,
							dataSource:data,
							status: false,
						})
					}else{
						message.error(res.data.resultCode.message);
					}
				})
			}else{
				message.error(res.data.resultCode.de.message);
			}
		})
	}
	
	getlist=(displayName)=>{
		let url="/api/v1/modelbuild/model/list/page?displayName="+displayName+"&offset=1&limit="+this.state.total
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					if(list[item].isCompleted === 1){
						var isCompleted = "服务正常";
					}else if(list[item].isCompleted === 0){
						var isCompleted = "启动中";
					}else if(list[item].isCompleted === -1){
						var isCompleted = "服务异常";
					}
				
					var dataItem = {
						'key':list[item].servingId,
						'servingName':list[item].servingName,
						'instance':list[item].instance,
						'startTime':list[item].startTime,
						'cpu':list[item].cpu,
						'memory':list[item].memory,
						'isCompleted':isCompleted,
					}
					data.push(dataItem);
				}
				this.setState({
					dataSource:data,
					status: false,
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	onSearch = (value) =>{
		this.setState({
		  displayName: value,
		},function(){
			this.getlist(value)
		});
	}
	
	onSelectChange = (selectedRowKeys,record) => {
		// console.log(record)
	    this.setState({ 
			selectedRowKeys:selectedRowKeys,
			servingName:record[0].servingName
		});
	  };
	
	
	render(){
		
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'servingName',
			  key: 'servingName',
			},
			{
			  title: '实例数',
			  dataIndex: 'instance',
			  key: 'instance',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.instance - b.instance,
			},
			{
			  title: 'cpu',
			  dataIndex: 'cpu',
			  key: 'cpu',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.cpu - b.cpu,
			},
			{
			  title: 'memory',
			  dataIndex: 'memory',
			  key: 'memory',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.memory - b.memory,
			},
			{
			  title: '开始时间',
			  dataIndex: 'startTime',
			  key: 'startTime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.startTime)
			  	let b_ts = new Date(b.startTime)
			  	a_ts = a_ts.getTime()
			  	b_ts = b_ts.getTime()
			  	return  a_ts - b_ts;
			  }
			},
			{
			  title: '状态',
			  dataIndex: 'isCompleted',
			  key: 'isCompleted',
			  render: isCompleted => {
				  let color = 'green';
				  if(isCompleted === '服务异常'){
					  color='red';
				  }else if(isCompleted === '启动中'){
					  color= 'blue'
				  }
			  	return(
			  		<Tag color={color} >{isCompleted}</Tag>
			  	)
			  },
			  filters: [{ text: '服务正常', value: '服务正常'},{ text: '启动中', value: '启动中'},{ text: '服务异常', value: '服务异常'}],
			  onFilter: (value, record) => record.isCompleted.includes(value)
			},
		];
		const {  selectedRowKeys } = this.state;
		const rowSelection = {
			  type:"radio",
		      selectedRowKeys,
		      onChange: this.onSelectChange,
		    };
		return (
			<div>
				<Search className="uploadinput" placeholder="按照名称查询" onSearch={this.onSearch} enterButton />
				<Table rowSelection={rowSelection} size="small" bordered 
				loading={this.state.status} columns={columns} dataSource={this.state.dataSource} />
				
			</div>
		)
	}
	
}