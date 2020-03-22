import React from 'react'
import { Button,Table ,Tabs,Tag,Popconfirm,Input,message,Descriptions} from 'antd';
import Axios from './../../../../axios'
import'./index.less'
import EchartsLine from './EchartsLine'
import { DownloadOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Search } = Input;
export default class ModelTable extends React.Component{
	
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
		let url="/api/v1/modelbuild/model/list/page?displayName=&offset=1&limit=10"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				// console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					let timeformat = list[item].tock
					let danwei = "s"
					if(timeformat > 1000){
						timeformat = timeformat / 60
						danwei = "m"
						if(timeformat > 1000){
							timeformat = timeformat / 60
							danwei = "h"
						}
					}
					
					let lossarr = list[item].lossStr.replace("[","").replace("]","").split(",");
					let accarr = list[item].accuracyStr.replace("[","").replace("]","").split(",");
					let vallossarr = list[item].valLossStr.replace("[","").replace("]","").split(",");
					let valaccarr = list[item].valAccuracyStr.replace("[","").replace("]","").split(",");
				
					var dataItem = {
						'key':list[item].modelId,
						'modelName':list[item].modelName,
						'time':list[item].tock,
						'timeformat':timeformat+" "+danwei,
						'classSum':list[item].classSum,
						'accuracy':list[item].accuracy,
						'loss':list[item].loss,
						'completeTime':list[item].completeTime,
						
						'lossArr':lossarr,
						'accArr':accarr,
						'valLossArr':vallossarr,
						'valAccArr':valaccarr,
						'valAccuracy':list[item].valAccuracy,
						'valLoss':list[item].valLoss,
						'hiddenLayers':list[item].hiddenLayers,
						'layersSize':list[item].layersSize,
						'learningRate':list[item].learningRate,
						'epochs':list[item].epochs,
						'dropoutRate':list[item].dropoutRate,
						'classSum':list[item].classSum,
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
		let joburl="/api/v1/modelbuild/model/list/page?displayName="+displayName+"&offset="+current+"&limit="+pageSize
		Axios.get(joburl,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				// console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					let timeformat = list[item].tock
					let danwei = "s"
					if(timeformat > 1000){
						timeformat = timeformat / 60
						danwei = "m"
					}
					if(timeformat > 1000){
						timeformat = timeformat / 60
						danwei = "h"
					}
					let lossarr = list[item].lossStr.replace("[","").replace("]","").split(",");
					let accarr = list[item].accuracyStr.replace("[","").replace("]","").split(",");
					let vallossarr = list[item].valLossStr.replace("[","").replace("]","").split(",");
					let valaccarr = list[item].valAccuracyStr.replace("[","").replace("]","").split(",");
								
					var dataItem = {
						'key':list[item].modelId,
						'modelName':list[item].modelName,
						'time':list[item].tock,
						'timeformat':timeformat+" "+danwei,
						'classSum':list[item].classSum,
						'accuracy':list[item].accuracy,
						'loss':list[item].loss,
						'completeTime':list[item].completeTime,
						
						'lossArr':lossarr,
						'accArr':accarr,
						'valLossArr':vallossarr,
						'valAccArr':valaccarr,
						'valAccuracy':list[item].valAccuracy,
						'valLoss':list[item].valLoss,
						'hiddenLayers':list[item].hiddenLayers,
						'layersSize':list[item].layersSize,
						'learningRate':list[item].learningRate,
						'epochs':list[item].epochs,
						'dropoutRate':list[item].dropoutRate,
						'classSum':list[item].classSum,
						
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
		let url="/api/v1/modelbuild/model?modelId="+key
		Axios.delete(url,"").then((res)=>{
			// console.log(res)
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
			  dataIndex: 'modelName',
			  key: 'modelName',
			},
			{
			  title: '分类数',
			  dataIndex: 'classSum',
			  key: 'classSum',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.classSum - b.classSum,
			},
			{
			  title: '耗时',
			  dataIndex: 'timeformat',
			  key: 'timeformat',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.time - b.time,
			},
			{
			  title: 'Accuracy',
			  dataIndex: 'accuracy',
			  key: 'accuracy',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.accuracy - b.accuracy,
			},
			{
			  title: 'loss',
			  dataIndex: 'loss',
			  key: 'loss',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.loss - b.loss,
			},
			{
			  title: '完成时间',
			  dataIndex: 'completeTime',
			  key: 'completeTime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.completeTime)
			  	let b_ts = new Date(b.completeTime)
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
			{
				title: '下载',
				dataIndex: 'key',
				render: key =>{
					// console.log(key)
					var url = "/api/v1/modelbuild/download/model?modelId="+key
					const download = () => {
					    window.open(url)
					};
					return (
						<Button onClick={download} type="primary" shape="circle" icon={<DownloadOutlined />}  />
					)
				},
				
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
			// console.log(record)
			var epochsList = []
			for(var i=0;i<record.epochs;i++){
				epochsList.push(i)
			}
			return (
				<div>
					<div className="echartsline">
						<EchartsLine keyId={record.key} epochsList={epochsList} lossArr={record.lossArr} accArr={record.accArr} valLossArr={record.valLossArr} valAccArr={record.valAccArr}/>
					</div>
					
					<Descriptions className="descriptions" size="small" layout="horizontal" title="详细信息" bordered>
						<Descriptions.Item label="accuracy(训练集)">{record.accuracy}</Descriptions.Item>
						<Descriptions.Item label="loss(训练集)">{record.loss}</Descriptions.Item>
						<Descriptions.Item label="accuracy(验证集)">{record.valAccuracy}</Descriptions.Item>
						<Descriptions.Item label="loss(验证集)">{record.valLoss}</Descriptions.Item>
					    <Descriptions.Item label="隐藏层数(hidden layers)">{record.hiddenLayers}</Descriptions.Item>
					    <Descriptions.Item label="隐藏层节点数(layers size)">{record.layersSize}</Descriptions.Item>
					    <Descriptions.Item label="学习率(learning rate)">{record.learningRate}</Descriptions.Item>
					    <Descriptions.Item label="轮次(epochs)">{record.epochs}</Descriptions.Item>
						<Descriptions.Item label="随机丢弃率(dropout rate)">{record.dropoutRate}</Descriptions.Item>
						<Descriptions.Item label="分类数(class sum)">{record.classSum}</Descriptions.Item>
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
				</div>
				
				<Table bordered expandable={expandable} loading={this.state.status} columns={columns} pagination={pagination} dataSource={this.state.dataSource} />
				
			</div>
		)
	}
	
}