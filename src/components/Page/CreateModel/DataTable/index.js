import React from 'react'
import './index.less'
import {message,Table ,Input,Button,Statistic, Card, Row, Col} from 'antd'
import Axios from './../../../../axios'

const { Search } = Input;

export default class Home extends React.Component{
	constructor() {
	    super();
		this.state = {
		    dataSource:[],
			status: true,
			hdfsPathList:[],
			lengthCount:0,
			incapacity:0,
			capacity:0,
			danwei:"KB"
		};
	}
	
	componentWillMount(){
		let url="/api/v1/dataprocess/data/list/page?displayName=&offset=1&limit=1"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				var total = res.data.data.total
				let url="/api/v1/dataprocess/data/list/page?displayName=&offset=1&limit="+total
				Axios.get(url,"").then((res)=> {
					if(res.data.resultCode.code < 300){
						let list = res.data.data.list;
						var data = []
						for(let item in list){
							if(list[item].isCompleted === 1){
								var danwei = "KB"
								var capacity = list[item].capacity;
								if(capacity > 10240){
									var capacity = capacity/1024;
									danwei = "MB";
									if(capacity > 10240){
										var capacity = capacity/1024;
										danwei = "GB";
									}
								}
								
								var dataItem = {
									'key':list[item].dataId,
									'hdfsPath':list[item].hdfsPath,
									'dataName':list[item].dataName,
									'length':list[item].length,
									'incapacity':list[item].capacity,
									'capacity':capacity.toFixed(2)+" "+danwei,
									'importTime':list[item].importTime,
								}
								data.push(dataItem);
							}
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
		let url="/api/v1/dataprocess/data/list/page?displayName="+displayName+"&offset=1&limit="+this.state.total
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					if(list[item].isCompleted === 1){
						var danwei = "KB"
						var capacity = list[item].capacity;
						if(capacity > 10240){
							var capacity = capacity/1024;
							danwei = "MB";
						}
						if(capacity > 10240){
							var capacity = capacity/1024;
							danwei = "GB";
						}
						var dataItem = {
							'key':list[item].dataId,
							'hdfsPath':list[item].hdfsPath,
							'dataName':list[item].dataName,
							'length':list[item].length,
							'incapacity':list[item].capacity,
							'capacity':capacity.toFixed(2)+" "+danwei,
							'importTime':list[item].importTime,
						}
						data.push(dataItem);
					}
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
		 var hdfsPathList = []
		 var lengthCount = 0
		 var incapacity = 0
		 var capacity = 0
		 var danwei = "KB"
		 console.log(record)
		for(let i in record){
			hdfsPathList.push(record[i].hdfsPath)
			lengthCount = lengthCount + record[i].length
			incapacity = incapacity + record[i].incapacity
		}
		capacity = incapacity;
		if(capacity > 1024){
			capacity = capacity / 1024;
			danwei = "MB";
		}
		if(capacity > 1024){
			capacity = capacity / 1024;
			danwei = "GB";
		}
		
	    this.setState({ 
			selectedRowKeys:selectedRowKeys,
			hdfsPathList:hdfsPathList,
			lengthCount:lengthCount,
			incapacity:incapacity,
			capacity:capacity,
			danwei:danwei,
		});
	  };
	
	
	render(){
		
		const columns = [
			{
			  title: '名称',
			  dataIndex: 'dataName',
			  key: 'dataName',
			},
			{
			  title: '行数',
			  dataIndex: 'length',
			  key: 'length',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.length - b.length,
			},
			{
			  title: '容量',
			  dataIndex: 'capacity',
			  key: 'capacity',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => a.incapacity - b.incapacity,
			},
			{
			  title: '导入时间',
			  dataIndex: 'importTime',
			  key: 'importTime',
			  defaultSortOrder: 'descend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.importTime)
			  	let b_ts = new Date(b.importTime)
			  	a_ts = a_ts.getTime()
			  	b_ts = b_ts.getTime()
			  	return  a_ts - b_ts;
			  }
			}
		];
		const {  selectedRowKeys } = this.state;
		const rowSelection = {
		      selectedRowKeys,
		      onChange: this.onSelectChange,
		    };
		return (
			<div>
				<Search className="uploadinput" placeholder="按照名称查询" onSearch={this.onSearch} enterButton />
				<Table rowSelection={rowSelection} size="small" bordered 
				loading={this.state.status} columns={columns} dataSource={this.state.dataSource} />
				<div>
					<Row gutter={16}>
					      <Col span={8}>
					        <Card>
					          <Statistic
					            title="数据片数量"
					            value={this.state.hdfsPathList.length}
								valueStyle={{ color: '#91d5ff' }}
					          />
					        </Card>
					      </Col>
						  <Col span={8}>
						    <Card>
						      <Statistic
						        title="总数据行数"
						        value={this.state.lengthCount}
								suffix="条"
								valueStyle={{ color: '#6666CC' }}
						      />
						    </Card>
						  </Col>
						  <Col span={8}>
						    <Card>
						      <Statistic
						        title="总数据大小"
						        value={this.state.capacity}
								precision={2}
								valueStyle={{ color: '#66FF66' }}
								suffix={this.state.danwei}
						      />
						    </Card>
						  </Col>
					    </Row>
				</div>
			</div>
		)
	}
	
}