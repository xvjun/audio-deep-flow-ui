import React from 'react'
import { Table ,Tabs,Tag,Popconfirm} from 'antd';
import Axios from './../../../axios'
import JobTable from './JobTable'
import ModelTable from './ModelTable'
import './index.less'
const { TabPane } = Tabs;
export default class Models extends React.Component{
	
	constructor() {
	    super();
		this.state = {
		    
		};
	}
	
	componentWillMount(){
		
	}
	
	
	render(){
		
		
		return (
			<div className="model">
				<Tabs defaultActiveKey="1" onChange={this.callback}>
				    <TabPane tab="模型列表" key="1">
				      <ModelTable />
				    </TabPane>
				    <TabPane tab="任务列表" key="2">
				      <JobTable />
				    </TabPane>
				  </Tabs>
			</div>
		)
	}
	
}