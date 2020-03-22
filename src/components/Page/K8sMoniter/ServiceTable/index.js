import React from 'react'
import { Table ,Tabs,Tag,Popconfirm,Input,message,Descriptions,Badge,Button} from 'antd';
import Axios from './../../../../axios'
import'./index.less'
import {Link} from 'react-router-dom';

const { TabPane } = Tabs;
const { Search } = Input;
export default class ServiceTable extends React.Component{
	
	constructor(props) {
	    super(props);
		// console.log(props)
		
		this.state = {
			dataSource:[],
			status: props.status,
		};
	}
	
	componentWillMount(){
		console.log("componentWillMount")
		var data = []
		var list = this.props.dataSource
		for(let item in list){
			let runtime = list[item].runTime
			let danwei = "秒"
			if(runtime > 3600){
				runtime = runtime / 3600
				danwei = "时"
				if(runtime > 24){
					runtime = runtime / 24
					danwei = "天"
				}
			}
			
			var dataitem = {
				// key:item+list[item].name,
				name:list[item].name,
				createTime:list[item].createTime,
				nodePort:list[item].nodePort,
				targetPort:list[item].targetPort,
				protocol:list[item].protocol,
				type:list[item].type,
				runtimeTs:list[item].runTime,
				runtime:runtime.toFixed(2)+" "+danwei,
			}
			data.push(dataitem);
		}
		this.setState({
			dataSource:data,
			status: this.props.status,
		})
	}
	
	componentWillReceiveProps(nextProps){
		console.log("componentWillMount")
		var data = []
		var list = nextProps.dataSource
		for(let item in list){
			let runtime = list[item].runTime
			let danwei = "秒"
			if(runtime > 3600){
				runtime = runtime / 3600
				danwei = "时"
			}
			if(runtime > 24){
				runtime = runtime / 24
				danwei = "天"
			}
			var dataitem = {
				// key:item+list[item].name,
				name:list[item].name,
				createTime:list[item].createTime,
				nodePort:list[item].nodePort,
				targetPort:list[item].targetPort,
				protocol:list[item].protocol,
				type:list[item].type,
				runtimeTs:list[item].runTime,
				runtime:runtime.toFixed(2)+" "+danwei,
			}
			data.push(dataitem);
		}
		this.setState({
			dataSource:data,
			status: nextProps.status,
		})
	}
	
	
	render(){
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '运行时长',
			  dataIndex: 'runtime',
			  // key: 'runtime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.runtimeTs - b.runtimeTs,
			},
			{
			  title: '创建时间',
			  dataIndex: 'createTime',
			  key: 'createTime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.createTime)
			  	let b_ts = new Date(b.createTime)
			  	a_ts = a_ts.getTime()
			  	b_ts = b_ts.getTime()
			  	return  a_ts - b_ts;
			  }
			},
			{
			  title: '服务类型',
			  dataIndex: 'type',
			  key: 'type',
			},
			{
			  title: '对外通信端口',
			  dataIndex: 'nodePort',
			  key: 'nodePort',
			},
			{
			  title: '内部通信端口',
			  dataIndex: 'targetPort',
			  key: 'targetPort',
			},
			{
			  title: '传输方式',
			  dataIndex: 'protocol',
			  key: 'protocol',
			}
		];
		// const tablechange=(current, pageSize)=>{
		// 	this.getlist(this.state.displayName, current, pageSize)
		// }
		// const pagination = {
		// 	defaultCurrent:1,
		// 	onChange:tablechange,
		// 	onShowSizeChange:tablechange,
		// 	showSizeChanger:true,
		// 	total:this.state.totle,
		// }
		// const expandedRowRender =(record) => {
		// 	console.log(record)
			
		// 	return (
		// 		<div>
		// 			<Descriptions size="small" layout="horizontal" title="详细信息" bordered>
		// 			    <Descriptions.Item label="隐藏层数(hidden layers)">{record.hiddenLayers}</Descriptions.Item>
		// 			    <Descriptions.Item label="隐藏层节点数(layers size)">{record.layersSize}</Descriptions.Item>
		// 			    <Descriptions.Item label="学习率(learning rate)">{record.learningRate}</Descriptions.Item>
		// 			    <Descriptions.Item label="轮次(epochs)">{record.epochs}</Descriptions.Item>
		// 				<Descriptions.Item label="随机丢弃率(dropout rate)">{record.dropoutRate}</Descriptions.Item>
		// 				<Descriptions.Item label="分类数(class sum)">{record.classSum}</Descriptions.Item>
		// 				<Descriptions.Item label="数据切片(data shard sum)">{record.dataShardSum}</Descriptions.Item>
		// 				<Descriptions.Item label="CPU">{record.cpu}</Descriptions.Item>
		// 				<Descriptions.Item label="内存">{record.memory}</Descriptions.Item>
		// 			  </Descriptions>
		// 		</div>
		// 	)
		// };
		
		// const expandable={
		//       expandedRowRender: expandedRowRender,
		//       rowExpandable: record => record.name !== 'Not Expandable',
		//     }
		return (
			<div>
				
				<Table rowKey="name" bordered loading={this.state.status} columns={columns} dataSource={this.state.dataSource} />
				
			</div>
		)
	}
	
}