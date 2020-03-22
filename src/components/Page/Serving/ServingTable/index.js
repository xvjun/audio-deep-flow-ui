import React from 'react'
import { Table ,Tabs,Tag,Popconfirm,Input,message,Descriptions,Badge,Button} from 'antd';
import {Link} from 'react-router-dom';
import Axios from './../../../../axios'
import'./index.less'

const { TabPane } = Tabs;
const { Search } = Input;
export default class ServingTable extends React.Component{
	
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
		let joburl="/api/v1/modelapp/serving/list/page?displayName=&offset=1&limit=10"
		Axios.get(joburl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				// console.log(res.data.data.list)
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
		let joburl="/api/v1/modelapp/serving/list/page?displayName="+displayName+"&offset="+current+"&limit="+pageSize
		Axios.get(joburl,"").then((res)=>{
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
		let url="/api/v1/modelapp/serving?servingId="+key
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
				<div className="search">
					<Search className="uploadinput" placeholder="按照名称查询" onSearch={this.onSearch} enterButton />
					
					<Link to="/CreateServing">
						<Button className="createModel" type="primary" shape="round" >创建新应用</Button>
					</Link>
						
				</div>
				
				<Table bordered loading={this.state.status} columns={columns} pagination={pagination} dataSource={this.state.dataSource} />
				
			</div>
		)
	}
	
}