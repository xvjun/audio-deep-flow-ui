import React from 'react'
import { Table ,Tabs,Tag,Popconfirm,Input,message,Descriptions,Badge,Button} from 'antd';
import {Link} from 'react-router-dom';
import Axios from './../../../../axios'
import'./index.less'

const { TabPane } = Tabs;
const { Search } = Input;
export default class StreamTable extends React.Component{
	
	constructor() {
	    super();
		this.state = {
			dataSource:[],
			status: true,
			displayName:"",
			current:1,
			pageSize:10,
		};
	}
	
	componentWillMount(){
		let joburl="/api/v1/stream-data-predictor/stream/list/page?displayName=&offset=1&limit=10"
		Axios.get(joburl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				// console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
				
					var dataItem = {
						'key':list[item].streamId,
						'streamName':list[item].streamName,
						'servingName':list[item].servingName,
						'instance':list[item].instance,
						'startTime':list[item].startTime,
						'cpu':list[item].cpu,
						'memory':list[item].memory,
						'kafkaAddress':list[item].kafkaAddress,
						'receiverTopics':list[item].receiverTopics,
						'sendTopics':list[item].sendTopics,
						'nodePort':list[item].nodePort,
						'httpAddress':list[item].httpAddress,
					}
					data.push(dataItem);
				}
				this.setState({
					totle:res.data.data.total,
					dataSource:data,
					status: false,
				})
			}else{
				message.error(res.data.resultCode.message);
			}
		})
	}
	
	getlist=(displayName, current, pageSize)=>{
		let joburl="/api/v1/stream-data-predictor/stream/list/page?displayName="+displayName+"&offset="+current+"&limit="+pageSize
		Axios.get(joburl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				let list = res.data.data.list;
				var data = []
				for(let item in list){
				
					var dataItem = {
						'key':list[item].streamId,
						'streamName':list[item].streamName,
						'servingName':list[item].servingName,
						'instance':list[item].instance,
						'startTime':list[item].startTime,
						'cpu':list[item].cpu,
						'memory':list[item].memory,
						'kafkaAddress':list[item].kafkaAddress,
						'receiverTopics':list[item].receiverTopics,
						'sendTopics':list[item].sendTopics,
						'nodePort':list[item].nodePort,
						'httpAddress':list[item].httpAddress,
					}
					data.push(dataItem);
				}
				data.push(dataItem);
				this.setState({
					totle:res.data.data.total,
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
			this.getlist(value, this.state.current, this.state.pageSize)
		});
	}
	
	handleDelete = key => {
		// console.log(key)
		let url="/api/v1/stream-data-predictor/stream?streamId="+key
		Axios.delete(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				message.success('删除成功');
				const dataSource = [...this.state.dataSource];
				this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
			}else{
				message.error('删除失败 : '+res.data.resultCode.message);
			}
		})
	    
	  };
	render(){
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'streamName',
			  key: 'streamName',
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
			  title: 'nodePort',
			  dataIndex: 'nodePort',
			  key: 'nodePort',
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
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) =>
				  this.state.dataSource.length >= 1 ? (
					<Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
					  <a>Delete</a>
					</Popconfirm>
				) : null,
			},
			
		];
		const tablechange=(current, pageSize)=>{
			this.getlist(this.state.displayName, current, pageSize)
		}
		const pagination = {
			defaultCurrent:1,
			onChange:tablechange,
			onShowSizeChange:tablechange,
			showSizeChanger:true,
			total:this.state.totle,
		}
		const expandedRowRender =(record) => {
			console.log(record)
			
			return (
				<div>
					<Descriptions column={2} size="small" layout="horizontal" title="详细信息" bordered>
					    <Descriptions.Item label="接口API(Http Address)">{record.httpAddress}</Descriptions.Item>
					    <Descriptions.Item label="应用名(Serving Name)">{record.servingName}</Descriptions.Item>
					    <Descriptions.Item label="kafka地址(Kafka Address)">{record.kafkaAddress}</Descriptions.Item>
					    <Descriptions.Item label="接收Topic(receiver Topics)">{record.receiverTopics}</Descriptions.Item>
						<Descriptions.Item label="发送Topic(send Topics)">{record.sendTopics}</Descriptions.Item>
						<Descriptions.Item label="CPU">{record.cpu}</Descriptions.Item>
						<Descriptions.Item label="内存">{record.memory}</Descriptions.Item>
					  </Descriptions>
				</div>
			)
		};
		
		const expandable={
		      expandedRowRender: expandedRowRender,
		      rowExpandable: record => record.name !== 'Not Expandable',
		}
		return (
			<div>
				<div className="search">
					<Search className="uploadinput" placeholder="按照名称查询" onSearch={this.onSearch} enterButton />
					
					<Link to="/CreateStream">
						<Button className="createModel" type="primary" shape="round" >创建数据接入前置服务</Button>
					</Link>
						
				</div>
				
				<Table bordered expandable={expandable} loading={this.state.status} columns={columns} pagination={pagination} dataSource={this.state.dataSource} />
				
			</div>
		)
	}
	
}