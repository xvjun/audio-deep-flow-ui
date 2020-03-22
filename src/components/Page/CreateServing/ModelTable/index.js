import React from 'react'
import './index.less'
import {message,Table ,Input,Button,Statistic, Card, Row, Col} from 'antd'
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
		let url="/api/v1/modelbuild/model/list/page?displayName=&offset=1&limit=1"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				var total = res.data.data.total
				let url="/api/v1/modelbuild/model/list/page?displayName=&offset=1&limit="+total
				Axios.get(url,"").then((res)=> {
					if(res.data.resultCode.code < 300){
						let list = res.data.data.list;
						var data = []
						for(let item in list){
								var dataItem = {
									'key':list[item].modelId,
									'modelName':list[item].modelName,
									'hdfsPath':list[item].hdfsPath,
									'accuracy':list[item].accuracy,
									'loss':list[item].loss,
									'classSum':list[item].classSum,
									'completeTime':list[item].completeTime,
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
					var dataItem = {
						'key':list[item].modelId,
						'modelName':list[item].modelName,
						'hdfsPath':list[item].hdfsPath,
						'accuracy':list[item].accuracy,
						'loss':list[item].loss,
						'classSum':list[item].classSum,
						'completeTime':list[item].completeTime,
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
			hdfsPath:record[0].hdfsPath
		});
	  };
	
	
	render(){
		
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'modelName',
			  key: 'modelName',
			},
			{
			  title: 'accuracy',
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
			  title: '分类数',
			  dataIndex: 'classSum',
			  key: 'classSum',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.classSum - b.classSum,
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
			}
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