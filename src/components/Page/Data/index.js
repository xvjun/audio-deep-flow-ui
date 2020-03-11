import React from 'react'
import {message,Checkbox,Layout, Menu, Breadcrumb, Icon,DatePicker,Button,Spin,Table,Tag,Statistic, Row, Col } from 'antd';

import './index.less'
import Axios from './../../../axios'

const CheckboxGroup = Checkbox.Group;
export default class Data extends React.Component{
	
	constructor() {
	    super();
		this.state = {
		    dataSource:[],
		};
	}
	
	componentWillMount(){
		
		
		let url="/api/v1/dataprocess/data/list/page?displayName=&offset=1&limit=20"
		Axios.get(url,"").then((res)=>{
			if(res.data.resultCode.code < 300){
				console.log(res.data.data.list)
				let list = res.data.data.list;
				var data = []
				for(let item in list){
					// console.log(list[item])
					if(list[item].isCompleted === 1){
						var isCompleted = "success";
					}else{
						var isCompleted = "failed";
					}
					var dataItem = {
						'key':list[item].dataId,
						'dataName':list[item].dataName,
						'length':list[item].length,
						'capacity':list[item].capacity,
						'importTime':list[item].importTime,
						'isCompleted':isCompleted,
					}
					data.push(dataItem);
				}
				this.setState({
					
					dataSource:data,
				})
			}
			
			
		})
		
		
	}
	
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
			  defaultSortOrder: 'ascend',
			  sorter: (a, b) => a.length - b.length,
			},
			{
			  title: '容量',
			  dataIndex: 'capacity',
			  key: 'capacity',
			  defaultSortOrder: 'ascend',
			  sorter: (a, b) => a.capacity - b.capacity,
			},
			
			{
			  title: '状态',
			  dataIndex: 'isCompleted',
			  key: 'isCompleted',
			  render: isCompleted => {
			  	let color = isCompleted === 'success' ? 'green' : 'red';
			  	return(
			  		<Tag color={color} >{isCompleted}</Tag>
			  	)
			  },
			  filters: [{ text: 'failed', value: 'failed'},{ text: 'success', value: 'success'}],
			  onFilter: (value, record) => record.isCompleted.includes(value)
			},
			{
			  title: '导入时间',
			  dataIndex: 'importTime',
			  key: 'importTime',
			  defaultSortOrder: 'ascend',
			  sorter: (a, b) => {
			  	let a_ts = new Date(a.importTime)
			  	let b_ts = new Date(b.importTime)
			  	a_ts = a_ts.getTime()
			  	b_ts = b_ts.getTime()
			  	return  a_ts - b_ts;
			  }
			},
			
		];
		
		return(
			<div>
				<Table columns={columns} dataSource={this.state.dataSource} />
			</div>
		)
	}
}