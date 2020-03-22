import React from 'react'
import { Table ,Tabs,Tag,Popconfirm,Input,message,Descriptions,Badge,Button} from 'antd';
import Axios from './../../../../axios'
import'./index.less'
import {Link} from 'react-router-dom';

const { TabPane } = Tabs;
const { Search } = Input;
export default class JobTable extends React.Component{
	
	constructor(props) {
	    super(props);
		// console.log(props)
		
		this.state = {
			dataSource:[],
			status: props.status,
		};
	}
	
	componentWillMount(){
		// console.log(nextProps)
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
				status:list[item].status,
				runtimeTs:list[item].runTime,
				runtime:runtime+" "+danwei,
				
			}
			data.push(dataitem);
		}
		this.setState({
			dataSource:data,
			status: this.props.status,
		})
	}
	
	componentWillReceiveProps(nextProps){
		// console.log(nextProps)
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
				status:list[item].status,
				runtimeTs:list[item].runTime,
				runtime:runtime+" "+danwei,
				
			}
			data.push(dataitem);
		}
		this.setState({
			dataSource:data,
			status: nextProps.status,
		})
	}
	
	// onSearch = (value) =>{
	// 	this.setState({
	// 	  displayName: value,
	// 	},function(){
	// 		this.getlist(value, this.state.current, this.state.pageSize)
	// 	});
	// }
	
	// handleDelete = key => {
	// 	// console.log(key)
	// 	let url="/api/v1/modelbuild/job?jobId="+key
	// 	Axios.delete(url,"").then((res)=>{
	// 		// console.log(res)
	// 		if(res.data.resultCode.code < 300){
	// 			message.success('删除成功');
	// 			const dataSource = [...this.state.dataSource];
	// 			this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
	// 		}else{
	// 			message.error('删除失败 : '+res.data.resultCode.message);
	// 		}
	// 	})
	    
	//   };
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
			  key: 'runtime',
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
			  title: '状态',
			  dataIndex: 'status',
			  key: 'status',
			  render: status => {
				  let color = 'green';
				  if(status === '异常'){
					  color='yellow';
				  }else if(status === '失效'){
					  color= 'red'
				  }
			  	return(
			  		<Tag color={color} >{status}</Tag>
			  	)
			  },
			  filters: [{ text: '正常', value: '正常'},{ text: '异常', value: '异常'},{ text: '失效', value: '失效'}],
			  onFilter: (value, record) => record.status.includes(value)
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